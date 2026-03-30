# PRD Addendum — 3/16 Customer Feedback

> **Status:** Draft
> **Date:** 2026-03-16
> **Relates to:** PRD.md (root)

---

## Feature 1: Advanced Search Filters

### User Story
- "제품 리서처로서, Sales Rank 1,000 이하이면서 월 매출 $10K 이상인 제품만 필터링하고 싶다."

### Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| SF-1 | Sales Rank 범위 필터 (min–max) | P0 |
| SF-2 | Monthly Revenue 범위 필터 | P0 |
| SF-3 | Growth Value 필터 (%, 기간 선택) | P0 |
| SF-4 | 필터 조합 검색 (AND 조건) | P0 |

### Technical Notes
- Keepa API product entity에서 salesRank, monthlySold 추출
- Growth Value는 salesRank 히스토리 기반 자체 계산 필요

### Acceptance Criteria
- [ ] Sales Rank min–max 범위 필터가 정상 동작한다
- [ ] Monthly Revenue 범위 필터가 정상 동작한다
- [ ] Growth Value 필터에서 % 값과 기간을 선택할 수 있다
- [ ] 복수 필터 조합(AND) 시 결과가 올바르게 교차 필터링된다
- [ ] 필터 초기화 버튼이 모든 필터를 기본값으로 되돌린다

---

## Feature 2: Search Category Tabs

### Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| SC-1 | 카테고리 탭: All / Products / Brands / People / Companies | P0 |
| SC-2 | Brand 탭: product 데이터를 brand name으로 그루핑 | P0 |
| SC-3 | People/Company 탭: Apollo API 연동 | P1 |
| SC-4 | AI 자동 분류: Brand vs Product 판단 | P1 |
| SC-5 | NLP wrapping: 자연어 → Keepa 쿼리 변환 | P2 |

### Technical Notes
- Keepa response entity가 Product이므로 Brand 탭은 aggregation layer 필요
- Ocean.io UX 참고 (Company/People 탭 분리)

### Backend Design
- **Aggregation 함수:** `groupProductsByBrand(products)` — Keepa product 배열을 brand 단위로 그루핑
- **BrandGroup 데이터 모델:**
  ```ts
  type BrandGroup = {
    brandName: string;
    productCount: number;
    avgSalesRank: number;
    totalRevenue: number;
    products: Product[];
  }
  ```
- **AI 자동 분류 로직:**
  1. NLP 모델로 검색어 분석 (brand name vs product keyword 판별)
  2. Brand DB 매칭 — 기존 brand 목록과 유사도 비교
  3. 매칭 실패 시 Product 탭으로 fallback

### Acceptance Criteria
- [ ] All / Products / Brands / People / Companies 탭이 렌더링된다
- [ ] Brand 탭에서 product 데이터가 brand name 기준으로 올바르게 그루핑된다
- [ ] `groupProductsByBrand()` 함수가 BrandGroup 스키마를 반환한다
- [ ] AI 자동 분류가 brand 검색어와 product 검색어를 정확히 구분한다
- [ ] People/Company 탭에서 Apollo API 결과가 표시된다
- [ ] NLP wrapping이 자연어 쿼리를 Keepa 파라미터로 변환한다

---

## Feature 3: View Lead Flow + Token System

### User Flow (Detailed)

```
Step 1: "View Lead" 클릭                    [무료]
  → Email 존재 여부 (⭕/❌), LinkedIn 존재 여부 (⭕/❌) 표시

Step 2: "View Email" 클릭                   [유료 — 토큰 차감]
  → 토큰 차감 고지 모달: "이 작업에 N 토큰이 차감됩니다"
  → [취소] [확인] — 취소 버튼이 확인과 동등하거나 더 눈에 띄게 배치

Step 3: 확인 시 Apollo API 호출             [서버사이드]
  → first name + partial email 표시 ("Celine P•••@company.com")

Step 4: "Reveal Full Email" 클릭            [유료 — 추가 토큰 차감]
  → 토큰 차감 고지 모달 (동일 패턴)
  → 전체 이메일 공개

Step 5: Contact 정보 저장                   [무료]
  → 리스트에 자동 추가, 이후 재조회 시 추가 토큰 불필요
```

### Dark Pattern 방지 원칙
- 모든 유료 액션 실행 전 정확한 토큰 비용을 사전 고지한다
- 취소 버튼이 확인 버튼과 **동등하거나 더 눈에 띄게** 배치한다 (색상, 크기, 위치)
- "무료 체험 후 자동 과금" 패턴을 사용하지 않는다
- 토큰 잔액 부족 시 차감이 불가능하며, 충전 안내를 표시한다

### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tokens/balance` | 현재 토큰 잔액 조회 |
| `POST` | `/api/tokens/deduct` | 토큰 차감 (amount, action_type, lead_id) |
| `POST` | `/api/leads/reveal` | 리드 정보 공개 (reveal_level: partial \| full) |

### Apollo.io API 연동
- `POST /people/match` — 이름 + 회사명으로 특정 인물 매칭
- `POST /people/search` — 조건 기반 인물 검색 (title, company, location 등)

### Token 차감 안전성
- **Race condition 방지:** 토큰 차감은 반드시 서버사이드에서 atomic 처리
- DB transaction 또는 optimistic locking으로 동시 요청 시 중복 차감 방지
- 클라이언트에서 잔액 체크 후 차감하는 패턴 금지 (서버 권한만 인정)

### Token System

| ID | Requirement | Priority |
|----|-------------|----------|
| TK-1 | 2가지 옵션: 월정액 패키지 / 크레딧 충전 | P0 |
| TK-2 | 토큰 잔액 헤더 표시 | P0 |
| TK-3 | 매 사용 시 사전 고지 (Dark Pattern 방지) | P0 |
| TK-4 | 사용 히스토리 대시보드 | P1 |

### Acceptance Criteria
- [ ] "View Lead" 클릭 시 무료 정보(Email/LinkedIn 존재 여부)가 즉시 표시된다
- [ ] 유료 액션 전 토큰 차감 고지 모달이 정확한 비용과 함께 표시된다
- [ ] 취소 버튼이 확인 버튼과 동등하거나 더 눈에 띄게 렌더링된다
- [ ] Apollo API 연동으로 partial email이 정상 표시된다
- [ ] "Reveal Full Email" 후 전체 이메일이 공개된다
- [ ] 한 번 공개한 contact 재조회 시 추가 토큰이 차감되지 않는다
- [ ] `POST /api/tokens/deduct`가 atomic하게 처리되어 race condition이 발생하지 않는다
- [ ] 토큰 잔액 부족 시 차감이 거부되고 충전 안내가 표시된다
- [ ] `GET /api/tokens/balance`가 정확한 잔액을 반환한다

---

## Feature 4: Enriched Brand Data

| ID | Requirement | Priority |
|----|-------------|----------|
| EB-1 | 도매 vs 소매 구분 표시 | P1 |
| EB-2 | 브랜드별 전체 제품 라인업 | P1 |
| EB-3 | Sales Rank 추이 차트 | P1 |
| EB-4 | Monthly Revenue 추정치 | P1 |

### Acceptance Criteria
- [ ] 도매/소매 구분이 브랜드 상세 페이지에 표시된다
- [ ] 브랜드 클릭 시 전체 제품 라인업이 로드된다
- [ ] Sales Rank 추이 차트가 시계열로 렌더링된다
- [ ] Monthly Revenue 추정치가 표시된다

---

## Feature 5: Product List (Multi-tab)

| ID | Requirement | Priority |
|----|-------------|----------|
| PL-1 | "Add to List" 버튼 | P1 |
| PL-2 | 리스트 생성/삭제 | P1 |
| PL-3 | 탭 구조 (카테고리별) | P2 |
| PL-4 | Excel export | P1 |

### Data Model

```ts
type List = {
  id: string;
  name: string;
  tabs: Tab[];
}

type Tab = {
  id: string;
  name: string;
  items: ListItem[];
}

type ListItem = {
  id: string;
  productId: string;
  brandName: string;
  addedAt: Date;
}
```

### Excel Export
- 각 Tab이 Excel 시트(sheet)에 1:1 매핑된다
- 시트 이름 = Tab name
- 컬럼: Product Name, Brand, Sales Rank, Monthly Revenue, Added Date

### UI Reference: Apollo.io Lists

### Acceptance Criteria
- [ ] "Add to List" 버튼 클릭 시 리스트 선택 모달이 표시된다
- [ ] 리스트 생성/삭제가 정상 동작한다
- [ ] 리스트 내 탭 추가/전환이 가능하다
- [ ] Excel export 시 각 탭이 별도 시트로 매핑된다
- [ ] Export 파일에 올바른 컬럼 헤더와 데이터가 포함된다

---

## Appendix: API Dependencies

| API | 용도 |
|-----|------|
| Keepa | Product data, Sales Rank, Price history |
| Apollo.io | People/Company search, Email verification |
| Ocean.io (참고) | Company/People search UX |
| Zoom.info (선택) | 보조 contact enrichment |
