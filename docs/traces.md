# Traces — Key Product Decisions

## 2026-04-24

### Email Page — Two Core Problems

**Problem 1: Bulk Email Sending**
- Ryan needs to send 50+ emails at once but has no visibility into token quota, daily send caps, or spam-safety pacing
- **Solution**: Bulk send with token/quota meter, daily limit visibility, auto-pacing across the day
- **Feature**:
  - Multi-select with quick filters ("Select all from Sunscreen", "Select all High Priority")
  - Live token & quota meter above Send button (tokens left, daily cap, estimated finish time)
  - Auto-throttle: emails spaced 4-8 min apart, business hours only, randomized
  - Bulk Send confirmation modal with breakdown by list
  - Sent tab: batch grouping with delivery/open/reply status
  - Pause queue button to stop mid-send

**Problem 2: Campaign Per Product Segment**
- Outreach is fundamentally segmented (Sunscreen, Neck Cream, Vitamin C) but every page mixes them into one bucket
- Each segment needs different messaging, cadence, and tracking
- **Solution**: Each product segment becomes a self-contained campaign with its own emails, pipeline, replies, metrics, settings — viewable in isolation across all pages
- **Feature**:
  - **Campaign Switcher** at top of Email/Pipeline/Lists pages (filters all data to selected campaign)
  - **Persistent campaign context** across pages with breadcrumb (e.g. "Sunscreen Campaign → Pipeline → Sarah Chen")
  - **Campaign settings** per list: template, follow-up cadence (3d/7d/14d), daily cap, sending hours
  - **Email page**: Inbox/Review/Queue/Sent/Summary all scoped to campaign; campaign settings panel in sidebar
  - **Pipeline page**: Kanban + metrics scoped to campaign; All view shows campaign tag on each card
  - **Lists page**: List = campaign (single source of truth); add campaign settings + performance summary
  - **New Campaigns page**: meta view with status, performance comparison, pause/duplicate/archive

### Implementation Order
1. Campaign Switcher component (shared across pages)
2. Campaign context persistence (state across navigation)
3. Email page — bulk send + campaign filtering
4. Pipeline page — campaign filtering + tag display
5. Campaigns meta page — overview + management

---

## 2026-04-03

### Search Tab Structure
- **Decision**: Product | Brand | People 3개 탭
- **Rationale**: 3 Pillars (Product + Brand / Brand + People), Ryan(Global BD) 유저의 flow: 제품 찾기 → 브랜드 확인 → 사람 찾기

### Tab Grouping: Option B 채택
- **Decision**: `[Product]` | `[Brand]` | `[People]` (Brand + People 분리)
- **Rejected**: Product+Brand 합침 / Brand+People 합침
- **Rationale**: Product에서 체크 선택 후 People에서 해당 브랜드 담당자 필터링

### MVP Scope
- **Decision**: Lead Finding + Email Outreach까지만
- **Rationale**: Engineering resource 제한, 정확한 매출/월간 증가율 데이터 한계

### AI Search (Open Text)
- **Decision**: AI-powered 버튼 클릭 시 검색바를 오픈텍스트 textarea로 확장 (Julius/Lovable 스타일)
- **Rationale**: 자연어 검색 지원, ChatGPT 이후 유저들이 익숙한 open text input 패턴

### Lists Tab + Progress Tree
- **Decision**: Search 하위에 Lists 탭 추가 (Product | Brand | People | Lists)
- Listed Products / Listed Brands / Listed People 서브탭 (Apollo Workstreams 참고)
- 왼쪽 사이드바가 Lists 모드일 때 Progress 트리로 전환 (Claude UI 참고)
- **Rationale**: Ryan이 sunscreen/neck cream 등 여러 리스트를 만들어서 outreach pipeline 추적 필요

### Tasks Page (replaces Templates)
- **Decision**: Templates 네비게이션을 Tasks로 교체
- Kanban board view (Apollo Deals / Wrike 참고)
- Columns: Research → Listed → People Found → Outreach Sent → Replied → Closed
- 각 카드: 제목, Brand/Product/Person 연결, 날짜, 담당자, 우선순위
- Board view (기본) + Table view 토글
- **Search/Lists 연동**: 제품 체크 → Research 태스크 생성, Add to List → Listed, Reveal Email → People Found, 이메일 발송 → Outreach Sent
- **Rationale**: Ryan의 end-to-end 워크플로우를 한 곳에서 관리 (리서치 → 리스트업 → 아웃리치 → 딜 클로징)

### Reveal Email Token Flow
- **Decision**: Reveal 클릭 시 "1 token 차감" 확인 모달 표시
- Cancel을 primary (눈에 띄게), Use 1 Token을 secondary — dark pattern 방지
- 한번 reveal된 이메일은 재접근 시 토큰 불필요
- **Rationale**: 유저가 실수로 토큰을 사용하지 않도록 보호

### Person Profile Drawer
- **Decision**: People 탭에서 이름 클릭 시 오른쪽 슬라이드 drawer
- Verified Email: blur 처리 + hover 시 Reveal 버튼
- LinkedIn: Available + 외부 링크 바로가기
- Overview Notes: 2-3개 trending insights (재구매율, 바이럴, 매출 급상승 등)
- **Rationale**: 리드 정보를 한눈에 보고 outreach 결정 가능

### UI Reference
- **Apollo.io**: Search People UI, Workstreams 레이아웃
- **Ocean.io**: Search UI 패턴
- **Julius AI / Lovable**: Open text input 패턴
- **Claude UI**: Progress tree + Context sidebar

---

## 2026-04-01

### Product Direction
- Keepa API 기반 제품 검색 (product-centric)
- 정확한 매출/monthly 증가율은 알 수 없는 pain point
- Ryan (Global Business Development) — 최종 목적은 사람 찾기 (제품 검색이 entry point)
- Product listing delete = status change (not hard delete)
