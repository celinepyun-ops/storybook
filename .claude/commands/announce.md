팀원들에게 공유할 공지사항을 `.traces/announcements/`에 저장하라.

## 절차

1. 사용자에게 무엇을 공유하고 싶은지 물어봐 (이미 인자로 받았으면 그걸 사용)

2. 현재 사용자 파악:
   - git config user.name으로 이름 확인
   - "robin" 또는 "celine"으로 매핑 (모르겠으면 물어봐)

3. `.traces/announcements/` 폴더에 파일 생성:
   - 파일명: `YYYY-MM-DD-작성자-간단설명.md`
   - 예: `2026-03-15-robin-onboarding-flow-changed.md`

4. 파일 형식:

```markdown
---
from: [이름]
date: [오늘 날짜]
branch: [현재 브랜치]
priority: [info | action-needed]
---

## [제목]

[내용 — 짧고 명확하게]

### 해야 할 것 (있다면)
- (상대방이 해야 할 액션)
```

5. 저장 후 GitHub 원격 레포에 자동 커밋 (`staging` 브랜치):
   - Bash tool로 아래 curl 명령을 실행하여 GitHub Contents API로 직접 커밋
   - 환경변수: `.env.local`에서 `GITHUB_TOKEN`, `GITHUB_REPO` 읽기 (source .env.local)
   - branch는 `staging` 고정
   - 커밋 메시지: `announce: [작성자] - [간단설명]`
   - 이미 같은 파일이 원격에 있으면 스킵 (409 응답)
   - **실패해도 로컬 저장은 완료된 상태이므로 에러만 알려주고 넘어갈 것**

   ```bash
   # .env.local에서 환경변수 로드 후 GitHub API로 커밋
   source .env.local && \
   CONTENT=$(base64 -i .traces/announcements/파일명.md) && \
   curl -s -X PUT \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     "https://api.github.com/repos/$GITHUB_REPO/contents/.traces/announcements/파일명.md" \
     -d "{\"message\":\"announce: [작성자] - [설명]\",\"content\":\"$CONTENT\",\"branch\":\"staging\"}"
   ```

6. 저장 후 사용자에게 파일 경로와 요약을 알려줘. GitHub 커밋 성공 여부도 알려줘.

## priority 기준
- **info**: "알아두세요" (예: 컴포넌트 구조 바꿨어요)
- **action-needed**: "이것 좀 해주세요" (예: 피그마 업데이트 필요)

## 주의
- 한 공지에 한 주제만
- 3문장 이내로. 장문 금지
- 코드 설명 X, "뭐가 바뀌었고 왜"만
