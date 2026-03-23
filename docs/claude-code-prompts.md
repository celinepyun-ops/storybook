# Claude Code Prompts — Gallop AI Restructuring

> PRD.md "Needs Restructuring" 항목을 P0 → P1 → P2 순서로 구현하기 위한 프롬프트 8개.
> 각 프롬프트를 Claude Code에 복붙하면 바로 실행 가능합니다.

---

## P0 — Core Restructuring

### Prompt 1: Search 페이지 — Brand-centric → Product-centric 전환

```
Search 페이지를 brand-centric에서 product-centric으로 전환해줘.

현재 상태:
- src/App.jsx의 SearchContent 컴포넌트에 검색 UI가 하드코딩되어 있음
- src/services/keepaApi.js에 Keepa API 래퍼가 있음

변경 사항:
1. src/App.jsx에서 SearchContent를 별도 파일 src/stories/SearchPage.jsx로 분리
2. 검색 결과를 product 단위로 표시 (기존 brand 중심 → 개별 product 행)
3. 각 product 행에 표시할 컬럼: Product Name, Brand, Sales Rank, Monthly Revenue, Growth Value, Partnership Score (0-100), Brand Stage (Badge)
4. 기존 Table 컴포넌트(src/stories/Table.jsx) 재사용
5. 기존 Badge 컴포넌트로 Brand Stage 표시 (Early=gray, Sweet Spot=green, Established=blue, Enterprise=purple)
6. Partnership Score는 ProgressBar 컴포넌트로 시각화
7. mock 데이터로 10개 product 행 생성

기존 디자인 토큰(src/stories/tokens.css)과 컴포넌트 스타일 패턴을 따라줘.
SearchPage.stories.jsx 스토리도 함께 만들어줘.
```

### Prompt 2: Search 페이지 — Advanced Filters 추가

```
Search 페이지(src/stories/SearchPage.jsx)에 Advanced Filters를 추가해줘.

PRD 요구사항 (모두 P0):
- SF-1: Sales Rank 범위 필터 (min–max 숫자 입력)
- SF-2: Monthly Revenue 범위 필터 (min–max 숫자 입력)
- SF-3: Growth Value 필터 (% 슬라이더 + 기간 선택 드롭다운: 30일/60일/90일)
- SF-4: 필터 조합 검색 (AND 조건)

구현:
1. 검색바 아래에 접이식(collapsible) 필터 패널 추가
2. 기존 Input(src/stories/Input.jsx), Select(src/stories/Select.jsx) 컴포넌트 재사용
3. "필터 초기화" 버튼 — 모든 필터를 기본값으로 리셋
4. 필터 적용 시 mock 데이터를 클라이언트 사이드에서 AND 필터링
5. 활성 필터 개수를 필터 토글 버튼에 Badge로 표시

스타일은 기존 tokens.css 변수 사용. Storybook 스토리에 "With Filters Applied" variant 추가.
```

### Prompt 3: Search Category Tabs (Product / Brand 탭)

```
Search 페이지(src/stories/SearchPage.jsx)에 카테고리 탭을 추가해줘.

PRD 요구사항 (P0):
- SC-1: 탭 UI — All / Products / Brands / People / Companies
- SC-2: Brand 탭에서 product 데이터를 brand name으로 그루핑

구현:
1. 기존 Tabs 컴포넌트(src/stories/Tabs.jsx) 재사용
2. 검색바+필터 아래, 결과 테이블 위에 탭 배치
3. All 탭: 전체 product 목록 (기본)
4. Products 탭: All과 동일 (product 단위)
5. Brands 탭: groupProductsByBrand() 유틸 함수 구현
   - BrandGroup = { brandName, productCount, avgSalesRank, totalRevenue, products[] }
   - brand별로 카드 UI 표시 (Card 컴포넌트 재사용)
   - 카드 클릭 시 해당 brand의 product 목록 펼침
6. People / Companies 탭: "Coming Soon" EmptyState 컴포넌트 표시
7. groupProductsByBrand() 함수는 src/services/searchUtils.js에 분리

Storybook 스토리에 각 탭 상태별 variant 추가.
```

### Prompt 4: View Lead — Token-gated Contact Reveal

```
View Lead 모달을 구현해줘. 검색 결과에서 사람을 클릭하면 token-gated contact reveal이 동작해야 해.

PRD User Flow:
- Step 1: "View Lead" 클릭 → 무료 정보 (Email ⭕/❌, LinkedIn ⭕/❌)
- Step 2: "View Email" → 토큰 차감 고지 모달 → 확인/취소
- Step 3: 확인 → first name + partial email ("Celine P•••@company.com")
- Step 4: "Reveal Full Email" → 추가 토큰 차감 → 전체 공개
- Step 5: 저장 완료 → 재조회 시 추가 토큰 불필요

구현:
1. src/stories/ViewLeadModal.jsx 생성
2. 기존 Modal(src/stories/Modal.jsx) 컴포넌트를 베이스로 사용
3. 기존 TokenReveal(src/stories/TokenReveal.jsx) 컴포넌트 확인 후 재사용/확장
4. 토큰 차감 확인 모달: "이 작업에 N 토큰이 차감됩니다" + [취소] [확인]
   - Dark Pattern 방지: 취소 버튼을 primary(눈에 띄는) 스타일, 확인을 secondary로
5. 단계별 상태 관리: free → partial → full (useState로 reveal level 관리)
6. mock 데이터로 3명의 lead 정보 생성
7. 이미 reveal한 contact는 "Revealed" Badge 표시, 재클릭 시 토큰 차감 없이 바로 표시

ViewLeadModal.stories.jsx에 각 단계별 스토리 추가:
- Default (무료 정보만), Partial Reveal, Full Reveal, Already Revealed, Insufficient Tokens
```

---

## P1 — Enhanced Features

### Prompt 5: Pricing 페이지 — Token Package 업데이트

```
Pricing 페이지(src/stories/PricingPage.jsx)를 token package 모델로 업데이트해줘.

현재 상태:
- PricingPage.jsx에 기존 pricing tier가 있음
- PricingPage.stories.jsx 스토리 존재

변경 사항:
1. 2가지 구매 옵션 표시:
   - 월정액 패키지: Starter (500 tokens/월, $29), Growth (2000 tokens/월, $79)
   - 크레딧 충전: 100 tokens ($9), 500 tokens ($39), 1000 tokens ($69)
2. 각 패키지에 포함 내역 체크리스트 (기존 체크 아이콘 스타일 유지)
3. Token 단가 비교 표시 (예: "$0.058/token → $0.040/token")
4. "Most Popular" Badge를 Growth 패키지에 표시
5. FAQ 섹션 추가: "토큰이 뭔가요?", "미사용 토큰은 이월되나요?", "환불 정책은?"
6. Dark Pattern 방지: 가격 표시 명확, 숨겨진 비용 없음

기존 Card, Badge, Button 컴포넌트 재사용. PricingPage.stories.jsx 업데이트.
```

### Prompt 6: Settings — Token Balance 표시 + 사용 히스토리

```
Settings 페이지(src/stories/Settings.jsx)에 토큰 관련 섹션을 추가해줘.

현재 상태:
- Settings.jsx에 Account, Preferences 섹션이 있음
- 토큰 잔액이 이미 일부 표시될 수 있음 (확인 필요)

변경 사항:
1. "Token Balance" 섹션 추가 (Account 섹션 바로 아래):
   - 현재 잔액 큰 숫자로 표시 + ProgressBar (사용량 비율)
   - 구독 플랜 이름 + 갱신일
   - "토큰 충전" 버튼 (→ Pricing 페이지 이동)
2. "사용 히스토리" 테이블 추가:
   - 컬럼: Date, Action (Email Reveal, LinkedIn Reveal 등), Lead Name, Tokens Used
   - 기존 Table 컴포넌트 재사용
   - 최근 20건 mock 데이터
3. Navbar(src/stories/Navbar.jsx)에 토큰 잔액 표시:
   - 아이콘 + 숫자 (예: 🪙 1,247)
   - 잔액 낮으면 warning 색상 (tokens.css의 --color-warning)

Settings.stories.jsx 업데이트. Navbar.stories.jsx에 "With Token Balance" variant 추가.
```

### Prompt 7: Lists 페이지 — Multi-tab 리스트 관리

```
Lists 페이지를 구현해줘. Apollo.io의 Lists UX를 참고한 multi-tab 리스트 관리.

현재 상태:
- src/stories/Lists.stories.jsx에 스토리만 존재 (인라인 구현)
- 실제 Lists.jsx 페이지 컴포넌트는 없음

구현:
1. src/stories/ListsPage.jsx 생성
2. 좌측: 리스트 목록 사이드패널
   - 리스트 생성 (+ 버튼 → 이름 입력 모달)
   - 리스트 삭제 (우클릭 메뉴 또는 ... 드롭다운)
   - 리스트 선택 시 우측 콘텐츠 변경
3. 우측: 선택된 리스트의 콘텐츠
   - 탭 구조 (카테고리별 — Tabs 컴포넌트 재사용)
   - 각 탭 안에 product/brand 테이블 (Table 컴포넌트)
4. "Add to List" 기능은 Search 페이지에서 호출 가능하도록 AddToListModal.jsx도 생성
5. Excel export 버튼 — 클릭 시 Toast로 "Export started" 표시 (실제 export는 미구현, UI만)
6. 데이터 모델:
   - List { id, name, tabs: Tab[] }
   - Tab { id, name, items: ListItem[] }
   - ListItem { id, productId, brandName, addedAt }
7. mock 데이터: 3개 리스트, 각 2개 탭, 탭당 5개 아이템
8. src/App.jsx 라우팅에 'lists' 페이지 추가

ListsPage.stories.jsx + AddToListModal.stories.jsx 생성.
```

---

## P2 — Advanced / Future

### Prompt 8: NLP Search Input + AI 자동 분류

```
Search 페이지의 검색 입력을 NLP 스마트 검색으로 업그레이드해줘.

PRD 요구사항 (P2):
- SC-5: NLP wrapping — 자연어 → Keepa 쿼리 파라미터 변환
- SC-4: AI 자동 분류 — 검색어가 brand인지 product인지 판단

구현:
1. src/stories/NLPSearchInput.jsx 생성
   - 기존 Search 컴포넌트(src/stories/Search.jsx) 확장
   - 자연어 입력 예시 placeholder: "Try: sunscreen under rank 5000 with 20% growth"
   - 입력 아래 파싱 결과 미리보기 태그 표시:
     keyword: "sunscreen" | rank: <5000 | growth: >20%
2. src/services/nlpParser.js 생성
   - parseSearchQuery(text) → { keyword, filters: { salesRank, revenue, growth }, type: 'product' | 'brand' }
   - 규칙 기반 파서 (정규식): "under rank N", "above $N revenue", "N% growth" 등 패턴 매칭
   - brand vs product 판단: 대문자로 시작하는 고유명사 → brand 후보, 일반 명사 → product
3. 파싱 결과를 기존 Advanced Filters에 자동 반영
4. 파싱 실패 시 일반 keyword 검색으로 fallback
5. 검색어 추천 드롭다운: 최근 검색 3개 + 추천 검색어 3개 (mock)

NLPSearchInput.stories.jsx에 다양한 입력 예시별 스토리 추가:
- Product Query ("sunscreen SPF 50")
- Brand Query ("CeraVe")
- Natural Language ("skincare brands growing over 30% under rank 10000")
- Empty State
```
