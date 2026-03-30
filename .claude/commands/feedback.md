$ARGUMENTS 를 QA UX 피드백으로 기록하라.

## 입력 형식
자유 텍스트. case-id 없이 피드백 내용만 입력하면 된다.

예시: `/feedback Autopilot 빈도 선택 UI가 직관적이지 않음`

## 절차

1. `$ARGUMENTS`가 비어있으면 피드백 내용을 입력해달라고 요청하라.

2. `docs/FEEDBACK.md` 파일이 없으면 아래 헤더로 새로 생성:
```markdown
# QA Feedback

| Date | Feedback |
|------|----------|
```

3. `docs/FEEDBACK.md` 테이블 끝에 새 행 추가:
   - Date: 오늘 날짜 (YYYY-MM-DD)
   - Feedback: $ARGUMENTS 내용

4. **GitHub Issue 생성**: 피드백 내용으로 GitHub Issue도 함께 생성하라.
   - Title: `[QA-FEEDBACK] {case-id가 있으면 case-id: }{피드백 요약}`
   - Labels: `feedback`
   - Body에 피드백 내용 + "👇 아래 댓글에 스크린샷을 첨부해주세요." 안내 포함

5. 결과 보고: 추가된 내용과 **GitHub Issue URL**을 사용자에게 알려줘. 스크린샷을 올릴 수 있도록 이슈 링크를 반드시 보여줘라.
