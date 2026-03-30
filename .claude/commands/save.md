이번 세션의 작업 내용을 trace 파일로 저장하라.

## 절차

1. 현재 사용자 파악:
   - git config user.name으로 이름 확인
   - "robin" 또는 "celine"으로 매핑 (모르겠으면 물어봐)

2. 이번 세션에서 한 작업 파악:
   - git diff --stat, git log --oneline -10 확인
   - 대화 내용에서 주요 작업, 고민, 결론 추출

3. `traces/[이름]/` 폴더에 trace 파일 생성:
   - 파일명: `YYYY-MM-DD-간단한설명.md` (예: 2026-03-15-dashboard-redesign.md)
   - 같은 날짜에 이미 파일이 있으면 숫자 접미사 추가 (예: -2.md)

4. 파일 형식:

```markdown
---
author: [이름]
date: [오늘 날짜]
branch: [현재 브랜치]
type: [feature | design | bugfix | research | refactor]
---

## 이번 세션에서 한 일
- (구체적으로, 어떤 파일/컴포넌트를 어떻게 바꿨는지)

## 고민했던 점 / 의사결정
- (A vs B 선택지가 있었다면, 뭘 선택했고 왜)
- (삽질했다면, 뭘 시도하다 안 됐고 결국 어떻게 해결했는지)

## 팀원한테 공유할 것
- (상대방이 알아야 할 변경사항, 주의점, 요청사항)
- (예: "로빈: 카드 컴포넌트 구조 바꿨으니 확인 필요")
- (예: "Celine: 온보딩 2단계로 줄였으니 피그마 업데이트 필요")

## 다음에 이어서 할 것
- (이번에 못 끝낸 것, 다음 세션에서 할 것)
```

5. 저장 후 GitHub 원격 레포에 자동 커밋 (`staging` 브랜치):
   - Bash tool로 아래 curl 명령을 실행하여 GitHub Contents API로 직접 커밋
   - 환경변수: `.env.local`에서 `GITHUB_TOKEN`, `GITHUB_REPO` 읽기 (source .env.local)
   - branch는 `staging` 고정
   - 커밋 메시지: `trace: [이름] - [간단한설명]`
   - 이미 같은 파일이 원격에 있으면 스킵 (409 응답)
   - **실패해도 로컬 저장은 완료된 상태이므로 에러만 알려주고 넘어갈 것**

   ```bash
   # .env.local에서 환경변수 로드 후 GitHub API로 커밋
   source .env.local && \
   CONTENT=$(base64 -i traces/[이름]/파일명.md) && \
   curl -s -X PUT \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     "https://api.github.com/repos/$GITHUB_REPO/contents/traces/[이름]/파일명.md" \
     -d "{\"message\":\"trace: [이름] - [설명]\",\"content\":\"$CONTENT\",\"branch\":\"staging\"}"
   ```

6. 저장 후 사용자에게 파일 경로와 요약을 알려줘. GitHub 커밋 성공 여부도 알려줘.

## 주의
- 코드 내용을 그대로 복사하지 말 것 (git diff로 볼 수 있으니까)
- "왜" 그렇게 했는지, "고민"이 뭐였는지에 집중
- 짧고 핵심만. 소설 쓰지 말 것
