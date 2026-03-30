# Gallop AI — Mega PRD

> **Version:** 1.0
> **Last Updated:** 2026-03-30
> **Sources:** PRD.md, PRD-addendum-3-16.md, 03.23 Weekly Sync, Codebase Analysis

---

## 1. Product Overview

Gallop AI is a **B2B SaaS CRM for Amazon brand outreach**. It enables manufacturing businesses (e.g., contract beauty manufacturers) to discover fast-growing Amazon products and brands, identify decision makers, and automate personalized outreach — all from one platform.

### Problem Statement

Manufacturing companies (e.g., OEM cosmetics) manually search Amazon for growing brands to pitch partnership deals. Current workflow:
- Buy expensive brand/product data from third-party providers
- Hire junior staff to manually enter data into Excel spreadsheets
- Manage multiple Excel tabs per product category
- Manually find decision maker contacts and send outreach emails

Gallop AI automates this entire pipeline.

### Target User

**Sales reps at manufacturing companies** looking to find high-potential Amazon brands to partner with. They need to identify brands that are growing fast but haven't yet locked in manufacturing partners.

**Primary Persona:** Mike — Sales rep at a contract beauty manufacturer. Manages product research across Excel tabs, wants to discover under-the-radar brands (Sales Rank <100) with strong monthly sales, and reach their decision makers via personalized email campaigns.

---

## 2. Core User Flow

```
Search Products → AI Brand Enrichment → Save to Lists → Find Decision Makers → Reveal Contact → Review Emails → Send Outreach
```

| Step | Action | Token Cost |
|------|--------|-----------|
| 1. **Search** | Enter keyword (e.g., "sunscreen"), apply filters (Sales Rank, Revenue, Growth), select country/category | Free |
| 2. **Discover** | View AI-ranked product results by Partnership Score; AI determines if seller is a real brand | Free |
| 3. **Save** | Add products/brands to custom Lists (auto brand enrichment on add) | Free (enrichment cost absorbed by company) |
| 4. **Find** | Search for decision makers (People / Company split) | Free |
| 5. **Reveal** | View Lead (free: email/LinkedIn exists ✓/✗) → Reveal partial → Reveal full | Paid (credits) |
| 6. **Review** | Review AI-generated outreach emails with contact signals | Free |
| 7. **Send** | Approve and send personalized emails | Free |

---

## 3. Pages & Routes

### 3.1 Marketing (Public)

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` `/landing` | Hero with value prop, 6 feature cards (Discovery, AI Recommendations, Campaigns, Analytics, Contacts, Templates), network lines visualization, CTAs |
| **Product** | `/product` | Features and benefits overview with icons |
| **Pricing** | `/pricing` | Credit package pricing tiers (Free, Pro, Enterprise) |

### 3.2 Auth

| Page | Route | Description |
|------|-------|-------------|
| **Login** | `/login` | Email + password, forgot password link |
| **Sign Up** | `/signup` | Name, email, password registration |

### 3.3 App (Authenticated)

| Page | Route | Description |
|------|-------|-------------|
| **Dashboard** | `/dashboard` | 4 StatsCards (Total Outreach, Response Rate, Active Campaigns, Products Contacted), prospect table with status tabs (All/Active/Pending/Archived), sortable columns |
| **Search** | `/search` | Product-first search with AI brand enrichment. Category tabs, advanced filters, NLP search bar. **Primary workspace.** |
| **Lists** | `/lists` | Custom prospect lists for organizing saved products/brands. Multi-tab structure, Excel export. (Inspired by Apollo.io) |
| **People** | `/people` | Find decision makers. Dual tab: People search + Company search. Job title autocomplete, contact cards with confidence badges. (Inspired by Ocean.io) |
| **Emails** | `/emails` | Dual-pane: email queue (left) + contact signals sidebar (right). AI-generated email bodies for review. |
| **Templates** | `/templates` | Email template library with CRUD, AI-optimized templates |
| **Settings** | `/settings` | Tabs: Account, Credit Balance, Subscription, Preferences (dark mode). Logout. |

### 3.4 Error

| Page | Route | Description |
|------|-------|-------------|
| **404** | `/404` | Not found page with back navigation |

**Routing:** Client-side SPA via `AppMain.jsx` with imperative state-based navigation (`setPage()`). No React Router.

---

## 4. Feature Specifications

### 4.1 Search (Product-First)

> **Decision (3/23):** Product-based search is the main tab, replacing brand search. Brand search moves to a secondary tab.

#### Search Interface

| Element | Description |
|---------|-------------|
| **Keyword Input** | NLP-enabled search bar — natural language auto-maps to Keepa filters. User can adjust filters manually after. |
| **Category Tabs** | All / Products / Brands / People / Companies |
| **Country Selector** | Auto / US / UK / DE / JP (maps to Keepa domain IDs) |
| **Category Filter** | All / Beauty / Health / Home / Sports / Electronics / Grocery |
| **Min Rating Filter** | Any / 4.5+ / 4.0+ / 3.5+ / 3.0+ |
| **AI Recommendations** | Toggle (disabled by default) |

#### Advanced Search Filters

| ID | Filter | Type | Priority |
|----|--------|------|----------|
| SF-1 | Sales Rank | Range (min–max) | P0 |
| SF-2 | Monthly Revenue | Range (min–max) | P0 |
| SF-3 | Growth Value | % + period selector | P0 |
| SF-4 | Combined filters | AND logic | P0 |

> **Decision (3/23):** Simplify search results — remove ranking scores and unnecessary data. Show only essentials: product name, price, Amazon link. Sorting/filtering replaces score display.

#### Search Results (Product Tab)

| Column | Source |
|--------|--------|
| Product Name | Keepa `title` |
| Brand | Keepa `brand` |
| Price | Keepa `price` |
| Sales Rank | Keepa `salesRank` |
| Monthly Revenue | Estimated from `monthlySold` |
| Amazon Link | Constructed from `asin` |

#### Brand Tab — Aggregation Layer

Keepa returns product-level data. Brand tab requires an aggregation layer:

```ts
type BrandGroup = {
  brandName: string;
  productCount: number;
  avgSalesRank: number;
  totalRevenue: number;
  products: Product[];
}
```

**Function:** `groupProductsByBrand(products)` — groups Keepa product array by brand name.

#### AI Auto-Classification

1. NLP model analyzes search query (brand name vs product keyword)
2. Brand DB matching — similarity comparison with existing brand list
3. Fallback to Product tab on no match

#### NLP Search Wrapping (P2)

Natural language → Keepa query parameter conversion. Users type prompts, system maps to structured filters.

#### Acceptance Criteria

- [ ] Product tab is the default/primary search tab
- [ ] All / Products / Brands / People / Companies tabs render and switch correctly
- [ ] Sales Rank, Monthly Revenue, Growth Value range filters work independently and combined (AND)
- [ ] Filter reset button restores all defaults
- [ ] Brand tab correctly groups products by brand name
- [ ] `groupProductsByBrand()` returns valid BrandGroup schema
- [ ] AI auto-classification distinguishes brand vs product queries
- [ ] People/Company tabs show Apollo API results
- [ ] NLP wrapping converts natural language to Keepa parameters
- [ ] Search results show simplified view (name, price, Amazon link)

---

### 4.2 Lists (Prospect Management)

> **Decision (3/23):** Introduce "List" in the left sidebar. Users filter/sort products, select them, and save to named lists. Similar to Apollo CRM UX.

#### Data Model

```ts
type List = {
  id: string;
  name: string;
  tabs: Tab[];
  createdAt: Date;
  updatedAt: Date;
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

#### Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| PL-1 | "Add to List" button on search results | P1 |
| PL-2 | List CRUD (create, rename, delete) | P1 |
| PL-3 | Multi-tab structure within each list (by category) | P2 |
| PL-4 | Excel export (each tab = Excel sheet) | P1 |
| PL-5 | Auto brand enrichment when items added to list | P1 |

#### Excel Export Spec

- Each Tab maps 1:1 to an Excel sheet
- Sheet name = Tab name
- Columns: Product Name, Brand, Sales Rank, Monthly Revenue, Added Date

> **Decision (3/23):** When a user adds items to a list, brand + people enrichment happens automatically (no per-item opt-in). Accept the token cost for now and collect early user feedback.

#### Acceptance Criteria

- [ ] "Add to List" button opens list selection modal
- [ ] List create/rename/delete works
- [ ] Tab add/switch within lists works
- [ ] Excel export maps each tab to a separate sheet
- [ ] Export file contains correct column headers and data
- [ ] Brand enrichment triggers automatically on list add

---

### 4.3 People & Company Search

> **Reference:** Ocean.io (company → people search → "find similar contact")

#### People Tab

| Element | Description |
|---------|-------------|
| Search Input | Name, company, or keyword |
| Job Title Autocomplete | CEO, COO, VP Operations, Head of Partnerships, etc. |
| Results | Contact cards: name, role, email availability (✓/✗), LinkedIn availability (✓/✗) |
| Confidence Badge | High / Medium |
| Suggested Roles | Grouped by category |

#### Company Tab

| Element | Description |
|---------|-------------|
| Search Input | Company name or domain |
| Results | Company cards with employee directory |
| Action | Drill into company → find people |

#### Inline Lead Drawer

When a contact is selected, an inline drawer shows:
- Name, role, company
- Email reveal button (with token cost)
- LinkedIn reveal button (with token cost)

---

### 4.4 Contact Reveal (Token-Gated)

#### User Flow

```
Step 1: "View Lead" click                     [Free]
  → Email exists (✓/✗), LinkedIn exists (✓/✗) displayed

Step 2: "View Email" click                    [Paid — credits deducted]
  → Credit deduction confirmation modal: "This action costs N credits"
  → [Cancel] [Confirm] — Cancel button equally or more prominent than Confirm

Step 3: On confirm → Apollo API call          [Server-side]
  → First name + partial email displayed ("Celine P•••@company.com")

Step 4: "Reveal Full Email" click             [Paid — additional credits]
  → Credit deduction confirmation modal (same pattern)
  → Full email revealed

Step 5: Contact info saved                    [Free]
  → Auto-added to list, no additional credits on re-view
```

#### Dark Pattern Prevention Principles

- All paid actions show exact credit cost **before** execution
- Cancel button is **equally or more prominent** than Confirm (color, size, position)
- No "free trial → auto-charge" patterns
- Insufficient balance → deduction blocked + top-up prompt shown

#### Token-Gated Actions

| Action | Credit Cost | What's Revealed |
|--------|-----------|-----------------|
| View Lead | Free | Email/LinkedIn existence (✓/✗) |
| Name reveal | Low | First name of contact |
| Email reveal (partial) | Medium | First name + masked email |
| Email reveal (full) | Medium | Full verified email address |
| LinkedIn reveal | Medium | LinkedIn profile URL |
| Bulk export | Variable | CSV of saved contacts |

#### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tokens/balance` | Current credit balance |
| `POST` | `/api/tokens/deduct` | Credit deduction (amount, action_type, lead_id) |
| `POST` | `/api/leads/reveal` | Reveal lead info (reveal_level: partial \| full) |

#### Apollo.io API Integration

- `POST /people/match` — Match person by name + company
- `POST /people/search` — Search by criteria (title, company, location, etc.)

#### Credit Deduction Safety

- **Race condition prevention:** All deductions are atomic on server-side
- DB transaction or optimistic locking for concurrent request protection
- Client-side balance checks are NOT authoritative (server only)

#### Acceptance Criteria

- [ ] "View Lead" shows free info (email/LinkedIn existence) immediately
- [ ] Paid actions show credit cost modal before execution
- [ ] Cancel button renders equally or more prominently than Confirm
- [ ] Apollo API integration returns partial email correctly
- [ ] "Reveal Full Email" exposes complete email
- [ ] Re-viewing a previously revealed contact costs no additional credits
- [ ] `POST /api/tokens/deduct` is atomic — no race conditions
- [ ] Insufficient balance blocks deduction and shows top-up prompt
- [ ] `GET /api/tokens/balance` returns accurate balance

---

### 4.5 Enriched Brand Data

| ID | Requirement | Priority |
|----|-------------|----------|
| EB-1 | Wholesale vs retail distinction display | P1 |
| EB-2 | Full product lineup per brand | P1 |
| EB-3 | Sales Rank trend chart (time series) | P1 |
| EB-4 | Monthly Revenue estimate | P1 |

> **Customer Need (3/23):** User wants to see brands with Sales Rank <100 that have strong monthly sales (e.g., 20,000–24,000 units/month). These are under-the-radar brands they want to reach out to for manufacturing partnerships.

#### Acceptance Criteria

- [ ] Wholesale/retail distinction shown on brand detail page
- [ ] Brand click loads full product lineup
- [ ] Sales Rank trend chart renders as time series
- [ ] Monthly Revenue estimate is displayed

---

### 4.6 Emails & Outreach

#### Email Review Queue (`/emails`)

- **Left pane:** Email list with status filters
- **Right pane:** Contact signals sidebar (lead card, token-gated reveal)
- AI-generated email body based on:
  - Brand's top-selling product
  - Product category context
  - Contact role/seniority

> **Customer Insight (3/23):** Users want to mention specific products when reaching out to brands. E.g., "Your sunscreen product is ranking #47 with 24K monthly sales — we can manufacture at better cost."

#### Templates (`/templates`)

- Template library with CRUD operations
- AI-optimized templates for different outreach scenarios
- Template preview before sending

---

### 4.7 Settings

| Tab | Contents |
|-----|----------|
| **Account** | Profile photo, first name, last name, email |
| **Credit Balance** | Current balance, upgrade option |
| **Subscription** | Plan management (Basic/Pro/Enterprise) |
| **Preferences** | Dark mode toggle, notification settings |

> **Decision (3/23):** Replace "token balance" wording with "credits" or similar user-friendly language.

---

## 5. Pricing & Monetization

### MVP Pricing Model

> **Decision (3/23):** MVP uses plan upgrades only (no a la carte token/credit purchases yet). Brand enrichment cost is absorbed by the company.

| Plan | Lead Limit | Price |
|------|-----------|-------|
| **Free** | Limited search, no reveals | $0 |
| **Basic** | 100 leads | TBD |
| **Pro** | 500 leads | TBD |
| **Enterprise** | Custom | TBD |

### Free Tier Includes

- Unlimited product search and result viewing
- See if email/LinkedIn exists for a contact (✓/✗)
- Basic list management

### Paid Actions (Credit-Gated)

- Contact name reveal
- Email reveal (partial → full)
- LinkedIn reveal
- Bulk export

### Future Considerations

- If user base exceeds ~50, require users to connect their own Apollo API key (due to API reselling constraints)
- A la carte credit purchases may be added post-MVP based on user feedback

---

## 6. Key Metrics & Scoring

### Partnership Score (0–100)

AI-ranked composite score. **Note:** Score is used for internal ranking/sorting, not displayed directly in search results (per 3/23 decision to simplify).

**Scoring Logic:**
- Baseline: 50
- Revenue Growth >30%: +20 | >10%: +10 | <-10%: -15
- Sales Rank 5K–50K (sweet spot): +15
- Sales Rank >50K: -10 | <1K: -10
- Price stability (stable): +5
- Review velocity >10%: +10

**Components:**
- Revenue Growth % (recent trend)
- Sales Rank position (sweet spot: 5K–50K)
- Monthly Revenue estimate
- Price Stability (low volatility = good)
- Review Velocity (momentum indicator)

### Brand Stage Classification

| Stage | Sales Rank | Fit |
|-------|-----------|-----|
| Early | >50K | Too small, not yet proven |
| Sweet Spot | 5K–50K | Ideal partnership target |
| Established | 1K–5K | Competitive, harder to win |
| Enterprise | <1K | Too large, already has partners |

### Monthly Sales Estimation

BSR (Best Sellers Rank) → estimated monthly units using `estimateMonthlySales(salesRank)`.

---

## 7. Data Sources & APIs

| Source | Purpose | Status | Notes |
|--------|---------|--------|-------|
| **Keepa API** | Product data, sales rank, pricing, revenue estimates | Service layer built (`keepaApi.js`), using mock data | Domains: US/UK/DE/FR/JP/CA/IT/ES/IN/MX |
| **Apollo.io API** | People/company search, email verification | Not started | `POST /people/match`, `POST /people/search` |
| **NLP Layer** | Natural language → Keepa query conversion | Not started | P2 priority |
| **Ocean.io** | UX reference only (company/people search) | Reference | Not an integration |
| **ZoomInfo** | Optional supplementary contact enrichment | Optional | Backup data source |

### Keepa API Functions (Implemented)

| Function | Purpose | Token Cost |
|----------|---------|-----------|
| `searchProducts(term, domain, options)` | Search by keyword | 10/page |
| `getProducts(asins, domain, options)` | Fetch product details | 1+extras |
| `searchCategories(term, domain)` | Category name search | 1 |
| `findProducts(filters, domain)` | Product Finder with criteria | 5 |
| `getBestSellers(categoryId, domain)` | Top sellers by category | Varies |
| `calculateGrowthMetrics(product)` | AI scoring & enrichment | Local (no API) |
| `searchAndAnalyze(keyword, domain, filters)` | Full pipeline: search → enrich → score | 10 + metrics |
| `estimateMonthlySales(salesRank)` | BSR → monthly sales estimate | Local (no API) |

---

## 8. Data Models

### Product (from Keepa)

```ts
type Product = {
  asin: string;
  title: string;
  brand: string;
  seller: string;
  isBrand: boolean;
  price: number;
  rating: number;
  reviews: number;
  salesRank: number;
  monthlyRevenue: number;
  imageUrl: string;
  stats: {
    current: number[];  // [amazonPrice, listPrice, ..., salesRank, ..., reviews, rating]
    avg30: number[];
    avg90: number[];
    min: number[];
    max: number[];
  };
}
```

### Growth Metrics (Calculated)

```ts
type GrowthMetrics = {
  revenueGrowth: number;        // % change in estimated sales (90→30 days)
  salesRankTrend: number;       // % change vs 90-day average
  reviewVelocity: number;       // % increase in review count
  priceStability: 'stable' | 'moderate' | 'volatile';
  partnershipScore: number;     // 0–100
  brandStage: 'early' | 'sweet-spot' | 'established' | 'enterprise';
  estimatedMonthlySales: number;
}
```

### Lead / Person

```ts
type Lead = {
  id: string;
  name: string;
  role: string;
  company: string;
  hasEmail: boolean;
  hasLinkedin: boolean;
  emailRevealed: boolean;
  linkedinRevealed: boolean;
  email?: string;
  linkedin?: string;
  confidence: 'high' | 'medium';
}
```

### List

```ts
type List = {
  id: string;
  name: string;
  tabs: Tab[];
  createdAt: Date;
  updatedAt: Date;
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

### Brand Group (Aggregation)

```ts
type BrandGroup = {
  brandName: string;
  productCount: number;
  avgSalesRank: number;
  totalRevenue: number;
  products: Product[];
}
```

### Credit Package

```ts
type CreditPackage = {
  tier: 'free' | 'basic' | 'pro' | 'enterprise';
  leadLimit: number;
  balance: number;
  costs: {
    nameReveal: number;
    emailReveal: number;
    linkedinReveal: number;
    bulkExport: number;
  };
}
```

---

## 9. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | CSS + BEM naming (`oai-` prefix) + CSS custom properties |
| Component Library | Storybook 10 (39 stories) |
| Testing | Vitest 4 + Playwright (E2E) |
| Visual Regression | Chromatic CI |
| Deployment | Vercel (gallopai.vercel.app) |
| Fonts | Test Tiempos Text (serif), Geist (sans), SF Mono (mono) |
| State Management | React hooks (useState) — page-level, no Redux/Context |
| Routing | Imperative state machine in AppMain.jsx (no React Router) |

---

## 10. Design System Summary

| Token | Value |
|-------|-------|
| Primary (Brand Green) | `#006400` |
| Secondary (Amber) | `#C2410C` |
| Background | `#FAFAF7` (light), dark mode via `[data-theme="dark"]` |
| Heading Font | Test Tiempos Text (serif, 400) |
| Body Font | Geist (sans, 400–600) |
| Code Font | SF Mono / Fira Code |
| Spacing Base | 4px (`--space-1` through `--space-16`) |
| BEM Prefix | `.oai-` |
| Sidebar Width | 256px (64px collapsed) |
| Navbar Height | 56px |

### Component Library (40+)

**Form:** Button, Input, Select, Search
**Data Display:** Table, Badge, Avatar, StatsCard, Card, Pagination
**Navigation:** Sidebar, Navbar, Breadcrumbs, Tabs, Dropdown
**Feedback:** Modal, Toast, Alert, Spinner, LoadingSkeleton, Tooltip, EmptyState, ProgressBar
**Layout:** PageLayout, MarketingNavbar
**Token/Contact:** TokenBadge, TokenBalance, ContactField, LeadContactCard, RevealConfirm
**Auth/Marketing:** Login, SignUp, LandingPage, ProductPage, PricingPage

---

## 11. Competitive References

| Tool | What to Learn | Status |
|------|---------------|--------|
| **Apollo.io** | Credit system, lists UX, people/company search | Primary UX reference |
| **ZoomInfo** | Contact database model, data enrichment | Secondary reference |
| **Ocean.io** | Company → people search flow, "find similar" | UX pattern reference |

---

## 12. Current Status

### Built (Frontend) ✅

- 12 pages with full UI
- 40+ component design system with Storybook stories (39 total)
- Dark mode support (toggle in sidebar)
- WCAG AA accessibility compliance
- Chromatic visual regression CI
- Vercel SPA deployment (gallopai.vercel.app)
- Keepa API service layer (`keepaApi.js`) — architecture only, mock data
- Token-gated contact reveal UI (TokenBadge, ContactField, LeadContactCard, RevealConfirm)
- Product-first search with category tabs (All/Products/Brands/People/Companies)
- People search with People/Company tab split
- Lists page (basic UI)
- Settings with Account/Credit Balance/Subscription/Preferences tabs
- Email review queue with dual-pane layout

### Restructured per Feedback ✅

- Search: brand-centric → product-centric (Product as primary tab)
- People: added People/Company split
- Pricing: updated with credit packages (Free/Pro/Enterprise)
- Settings: added token/credit balance display
- Search category tabs implemented

### Not Yet Built (Backend) ⏳

- [ ] Database & auth service (JWT-based)
- [ ] Keepa API live integration (currently mock data)
- [ ] Apollo API integration (email verification, contact enrichment)
- [ ] NLP search layer (natural language → Keepa query)
- [ ] Credit/token system backend (atomic deduction, balance tracking)
- [ ] Email provider integration (Gmail, Outlook)
- [ ] Template editor backend
- [ ] List management backend (CRUD, Excel export)
- [ ] Brand aggregation backend (`groupProductsByBrand`)

---

## 13. Backend API Spec (Planned)

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Email + password login |
| `POST` | `/api/auth/signup` | Account creation |
| `POST` | `/api/auth/logout` | Session termination |

### Credits

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tokens/balance` | Current credit balance |
| `POST` | `/api/tokens/deduct` | Atomic credit deduction |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/leads/reveal` | Reveal lead (partial \| full) |
| `GET` | `/api/leads/:id` | Get lead details |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search/products` | Product search via Keepa |
| `GET` | `/api/search/brands` | Brand aggregation search |
| `GET` | `/api/search/people` | People search via Apollo |
| `GET` | `/api/search/companies` | Company search via Apollo |

### Lists

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/lists` | Get all lists |
| `POST` | `/api/lists` | Create list |
| `PUT` | `/api/lists/:id` | Update list |
| `DELETE` | `/api/lists/:id` | Delete list |
| `POST` | `/api/lists/:id/items` | Add item to list |
| `GET` | `/api/lists/:id/export` | Excel export |

---

## 14. Key Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 3/16 | Product-first search (not brand-first) | Keepa API returns product-level data |
| 3/16 | Token-gated contact reveal with dark pattern prevention | Transparency required for paid actions |
| 3/16 | Apollo API for email verification | Backend contact enrichment |
| 3/23 | Product tab = primary, Brand tab = secondary | Simplify main search experience |
| 3/23 | Auto brand enrichment on list add (no opt-in) | Accept cost, collect early feedback |
| 3/23 | Simplified search results (name, price, link only) | Reduce user cognitive load |
| 3/23 | NLP search bar (prompt → filter mapping) | Inspired by Apollo UX |
| 3/23 | Plan-based pricing for MVP (not a la carte credits) | Basic=100 leads, Pro=500 leads |
| 3/23 | Company absorbs brand enrichment cost | User pays only for lead reveals |
| 3/23 | "Credits" wording (not "tokens") | User-friendly language |
| 3/23 | Apollo API key self-connect if >50 users | API reselling compliance |
| 3/23 | PRD moved to git as .md files | Single source of truth |
| 3/23 | HANDOFF process removed | Traces system covers handoff |

---

## Appendix A: Product Categories (Keepa)

| Category | Subcategories |
|----------|---------------|
| Cosmetics & Beauty | Sun Protection, Skin Care, Hair Care, Makeup, ... |
| Electronics | Smart Home, Audio, Phone Accessories, ... |
| Supplements & Health | Vitamins, Protein, Probiotics, ... |
| Home & Kitchen | — |
| Sports & Outdoors | — |
| Baby & Kids | — |
| Pet Supplies | — |

## Appendix B: Keepa Domain Mapping

| Domain | ID | Country |
|--------|-----|---------|
| US | 1 | United States |
| UK | 2 | United Kingdom |
| DE | 3 | Germany |
| FR | 4 | France |
| JP | 5 | Japan |
| CA | 6 | Canada |
| IT | 8 | Italy |
| ES | 9 | Spain |
| IN | 10 | India |
| MX | 11 | Mexico |
