$ARGUMENTS 를 파싱하여 QA 버그 리포트를 생성하라.

## 입력 형식
`<case-id> <env: staging|production> <title>`

예시: `QA-DASH-011 staging GEO score 초기화 버그`

- env가 생략되면 사용자에게 staging인지 production인지 물어봐라.
- title이 생략되었거나 "test" 같은 의미 없는 placeholder로 보이면, 이슈 제목을 입력하도록 물어봐라.
- **description은 항상 별도로 물어봐라.** title 파싱 후 "버그 상세 설명을 입력해주세요:" 라고 물어보고, 사용자가 입력할 때까지 이슈를 생성하지 마라.

## 절차

1. **파싱**: $ARGUMENTS에서 case-id (QA-로 시작), env (staging 또는 production), title 추출

2. **description 입력 요청**: 사용자에게 "버그 상세 설명을 입력해주세요:" 라고 물어봐라. 사용자가 description을 입력할 때까지 다음 단계로 진행하지 마라.

3. **테스트 케이스 확인**: `docs/QA_MANUAL_TESTING.md`에서 해당 case-id를 찾아 테스트 내용 확인. 못 찾으면 사용자에게 알려주고 그래도 진행할지 물어봐.

4. **GitHub Issue 생성**: `gh issue create` 실행
   - Title: `[QA-BUG] {case-id}: {title}`
   - Labels: `bug,{env}`
   - Body는 아래 템플릿으로 구성:

```
## Test Case
**Case ID**: {case-id}
**Original Test**: {QA 문서에서 찾은 테스트 설명}

## Bug Description
{description}

## Environment
- env: {env}
- URL: {env가 staging이면 heyzeva-staging.vercel.app, production이면 heyzeva.com}
- Tester: QA Intern
```

5. **QA 문서 업데이트**: `docs/QA_MANUAL_TESTING.md`에서 해당 case-id 줄을 찾아서:
   - `- [ ]` 를 `- [ ] ❌ FAIL` 로 변경
   - 줄 끝에 ` [#이슈번호](이슈URL)` 추가

6. **결과 보고**: 생성된 이슈 URL과 변경된 내용을 사용자에게 알려줘. **스크린샷을 올릴 수 있도록 이슈 링크를 반드시 보여줘라.**

## 주의
- `gh` CLI가 인증되지 않았으면 `gh auth login`을 안내해라
- Issue 생성이 실패해도 QA 문서는 수동으로 FAIL 마킹할 수 있도록 안내
- 스크린샷 경로가 대화에서 언급되면 이슈 body에 포함
