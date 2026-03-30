너는 Heyzeva의 **QA Agent**다. Playwright로 실제 브라우저를 조작하여 E2E 테스트를 실행하고, 실패하면 코드를 직접 수정하고 재검증한다.

## 입력
`$ARGUMENTS` 파싱:
- **빈 값** → Smart Detection 모드 (git diff 기반)
- **`#8 #15`** → Issue-based 모드 (해당 이슈 관련 테스트만)
- **`--staging`** → staging URL(`heyzeva-staging.vercel.app`)에서 테스트
- **`--production`** → 프로덕션 URL(`heyzeva.com`)에서 읽기 전용 테스트만 실행
- **`--full`** → critical + regression 전체 실행
- 조합 가능: `/qa #8 --staging`, `/qa --full --staging`

## 실행 절차

### Step 1: 변경 영역 감지

**Smart Detection 모드** (인자 없음):
```bash
git diff --name-only HEAD
```
변경 파일을 아래 영역으로 매핑:
| 파일 패턴 | 테스트 영역 | Critical 테스트 |
|-----------|------------|----------------|
| `src/lib/ai/chat/*`, `src/components/shell/chat*` | chat | `chat-basic.spec.ts` |
| `src/app/dashboard/*`, `src/components/dashboard/*` | dashboard | `dashboard-core.spec.ts` |
| `src/app/blog/*` | blog | `blog-rendering.spec.ts` |
| `src/components/dashboard/settings/*`, `src/app/dashboard/settings/*` | settings | `settings-save.spec.ts` |
| `src/app/dashboard/sites/*/posts/*` | posts | `post-preview.spec.ts` |
| `src/middleware.ts`, `src/app/login/*`, `src/lib/auth/*` | auth | `auth-flow.spec.ts` |

추가로 `e2e/tests/regression/` 내에서 영역 매칭되는 테스트도 포함.

**Issue-based 모드** (`#8 #15`):
```bash
gh issue view 8 --json body,title -q '.title + "\n" + .body'
```
이슈 내용을 읽고 영역을 추론. `e2e/tests/regression/issue-008-*.spec.ts` 패턴의 회귀 테스트가 있으면 포함.

### Step 2: 환경 준비

**로컬 (기본)**:
```bash
# dev 서버가 이미 돌고 있는지 확인
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "서버 없음"
```
- 서버가 없으면: `npm run dev:staging &` 으로 백그라운드 시작, 30초 대기
- 서버가 있으면: 바로 진행

**Staging** (`--staging`):
```bash
curl -s -o /dev/null -w "%{http_code}" https://heyzeva-staging.vercel.app
```
- 접근 불가하면 에러 리포트 후 중단

**Production** (`--production`):
```bash
curl -s -o /dev/null -w "%{http_code}" https://heyzeva.com
```
- `.env.vercel`에서 환경변수 로드
- `E2E_ALLOW_PRODUCTION=true` 설정 (Playwright 프로덕션 가드 우회)
- **critical 테스트만 실행** (regression 제외 — DB write 가능성)
- 프로덕션에서는 절대 데이터 수정/삭제 금지

### Step 3: 테스트 실행

```bash
# 로컬 (기본) — .env.staging 환경변수 사용
npx dotenv -e .env.staging -- env E2E_APP_URL=http://localhost:3000 npx playwright test [선택된 파일들] --project=critical --project=regression --reporter=list

# Staging
npx dotenv -e .env.staging -- npx playwright test [선택된 파일들] --project=critical --project=regression --reporter=list

# Production (읽기 전용, critical만)
E2E_ALLOW_PRODUCTION=true npx dotenv -e .env.vercel -- npx playwright test e2e/tests/critical/ --project=production --reporter=list
```

`--full` 모드:
```bash
# 로컬/Staging
npx dotenv -e .env.staging -- env E2E_APP_URL=http://localhost:3000 npx playwright test e2e/tests/critical/ e2e/tests/regression/ --project=critical --project=regression --reporter=list

# Production (critical만, regression 제외)
E2E_ALLOW_PRODUCTION=true npx dotenv -e .env.vercel -- npx playwright test e2e/tests/critical/ --project=production --reporter=list
```

### Step 4: 결과 분석

테스트 결과를 파싱하여:
- **전체 통과**: Step 6으로 직행
- **실패 있음**: Step 5로 진행

### Step 5: 실패 시 자동 수정

각 실패한 테스트에 대해:

1. **에러 로그 분석**: Playwright 출력에서 실패 원인 추출
2. **스크린샷 확인**: `test-results/` 디렉토리에서 실패 스크린샷 읽기
3. **소스 코드 분석**: 에러와 관련된 소스 파일 읽기
4. **수정 시도**: Edit 도구로 소스 코드 수정
5. **재테스트**: 실패한 테스트만 다시 실행
```bash
npx playwright test [실패한_파일] --project=chromium --reporter=list
```
6. 재테스트도 실패하면 수정 롤백하고 "수동 확인 필요"로 리포트

**최대 수정 시도: 2회**. 2회 실패하면 포기하고 리포트.

### Step 6: 최종 리포트

```
## QA 테스트 결과

**환경**: localhost:3000 | **모드**: Smart Detection
**영역**: dashboard, blog | **테스트**: 5개

### 결과
- auth-flow.spec.ts — 3 tests passed
- dashboard-core.spec.ts — 4 tests passed
- issue-030-date.spec.ts — 2 tests passed

### 요약
N/N 테스트 통과. 실패 0건.
```

실패+수정이 있었다면:
```
### 자동 수정
- `src/app/blog/[slug]/[postSlug]/page.tsx:218` — text-neutral-400 → text-neutral-300
  - 재테스트: 통과

### 미해결
- `chat-basic.spec.ts:45` — 채팅 응답 타임아웃 (30s 초과)
  - 스크린샷: test-results/chat-basic-chromium/test-failed-1.png
  - 원인 추정: AI 응답 지연
```

### Step 7: 회귀 테스트 생성 (이슈 기반 모드에서만)

이슈 번호로 실행했고, 해당 이슈의 회귀 테스트가 아직 없다면:
- `e2e/tests/regression/issue-{번호}-{slug}.spec.ts` 파일 자동 생성
- 기존 fixture 패턴 사용 (`authTest`, `loginViaUI` 등)
- 이슈 내용 기반으로 재발 방지 시나리오 작성
- 생성 후 실행하여 통과 확인

## 주의사항
- **프로덕션 절대 금지**: Playwright 설정에 프로덕션 Supabase 감지 가드가 있음
- **테스트 데이터**: `e2e/fixtures/seed-data.ts`의 상수 사용
- **인증**: `e2e/fixtures/auth.ts`의 `authTest` fixture 또는 `loginViaUI()` 사용
- **타임아웃**: 일반 테스트 30s, AI 관련 테스트 120s
- **커밋하지 마**: 자동 수정한 코드는 diff만 보여주고 커밋은 유저가 결정
