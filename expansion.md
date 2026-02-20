# NewSaaS Platform Expansion Plan

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({ startOnLoad: true, theme: 'default', securityLevel: 'loose' });
</script>

A plan to expand the blog into a full SaaS platform with public marketing pages and a private authenticated Products area.

---

## Architecture Overview

```mermaid
flowchart TB
    subgraph Public [Public Pages - No Auth]
        Posts[Posts/Blog]
        About[About]
        Portfolio[Portfolio]
    end

    subgraph Private [Products Page - Auth Required]
        Products[Products Dashboard]
        AIChat[AI Chat Assistant]
        Billing[Billing]
        UserProfile[User Profile]
        RepoArchive[GitHub Archives]
    end

    subgraph Backend [Backend Services]
        Hanko[Hanko SSO]
        Parse[Parse Server]
        PocketFlow[PocketFlow AI]
        BillionMail[BillionMail SMTP]
        Flowglad[Flowglad Billing]
        Bucket[Object Bucket]
    end

    Posts --> Parse
    Portfolio --> Parse
    Products --> Hanko
    Products --> Parse
    AIChat --> PocketFlow
    PocketFlow --> Parse
    Billing --> Flowglad
    UserProfile --> Parse
    RepoArchive --> Bucket
    Parse --> BillionMail
    Parse --> Bucket
```

---

## Page Structure

| Page | Access | Purpose |
|------|--------|---------|
| **Posts** | Public | Blog articles, SEO content |
| **About** | Public | Company info, team, mission |
| **Portfolio** | Public | GitHub starred projects showcase |
| **Products** | Authenticated | Dashboard, billing, chat, profile |

---

## 1. Public Frontend (SEO and Attraction)

These pages remain **public** to attract visitors and improve SEO.

### Posts (Blog)
- Articles, tutorials, news
- SEO optimized
- No login required

### About
- Company information
- Team profiles
- Contact info

### Portfolio
- GitHub starred projects (from mystars)
- Categories, search, filters
- Project details and READMEs

```mermaid
flowchart LR
    Visitor[Visitor] --> Posts
    Visitor --> About
    Visitor --> Portfolio
    Posts --> SEO[Search Engines]
    Portfolio --> SEO
```

---

## 2. Private Products Area (Authenticated)

The **Products page** requires login and contains all premium features.

### Features behind auth:
- User dashboard
- AI Chat assistant (powered by PocketFlow)
- Billing and subscriptions
- Profile management
- GitHub repo archives (full downloads)

```mermaid
flowchart TB
    User[User] --> Login[Hanko Login]
    Login --> Products[Products Dashboard]
    Products --> AIChat[AI Chat Assistant]
    Products --> Billing[Billing]
    Products --> Profile[Profile]
    Products --> Archives[Repo Archives]
```

---

## 3. Backend Services

### 3.1 Parse Server

**Location:** `Backends/parse-server`

**Role:**
- Main API for data storage
- User data linked to Hanko
- Chat messages via LiveQuery
- File references to bucket

### 3.2 Hanko SSO

**Location:** `SSO/hanko`

**Role:**
- Single sign-on for Products page
- Passkeys, passwords, OAuth
- JWT for Parse Server validation

**Auth flow:**

```mermaid
flowchart LR
    User[User] --> Products[Products Page]
    Products --> Hanko[Hanko Auth]
    Hanko --> JWT[JWT Token]
    JWT --> Parse[Parse Server]
```

### 3.3 BillionMail SMTP

**Location:** `Mail/BillionMail`

**Role:**
- Welcome emails
- Password reset
- Chat notifications
- Newsletter for subscribers

### 3.4 Flowglad Billing

**Location:** `Payments/flowglad`

**Role:**
- Subscription management
- Usage meters and feature gates
- Stateless billing (no webhooks)

**Integration:**

```mermaid
flowchart LR
    User[User] --> Products[Products]
    Products --> Flowglad[Flowglad SDK]
    Flowglad --> Stripe[Stripe/Payment Provider]
    Flowglad --> Parse[Parse - Store Status]
```

### 3.5 TestPayment (Development)

**Location:** `Payments/testpayment`

**Role:**
- Mock payment gateway for testing
- Simulates payment flows
- OTP verification
- Webhook simulation

**Use:** Development and testing only, not production.

### 3.6 Object Bucket

**Provider:** MinIO / S3 / R2

**Role:**
- Store full GitHub repo archives
- File storage for user uploads

### 3.7 PocketFlow AI Chat

**Location:** `Automation/PocketFlow`

**What is PocketFlow:**
- 100-line minimalist LLM framework
- Zero dependencies, zero vendor lock-in
- Supports Agents, Workflows, RAG, and more
- Python-based with FastAPI integration

**Role:**
- AI chat assistance for new users
- Real-time streaming responses via WebSocket
- Conversation memory and context
- Guardrails for topic restrictions (optional)

**Cookbook Examples:**

| Example | Description |
|---------|-------------|
| `pocketflow-chat` | Basic chatbot with history |
| `pocketflow-fastapi-websocket` | Real-time web chat with streaming |
| `pocketflow-chat-memory` | Long-term memory with embeddings |
| `pocketflow-chat-guardrail` | Topic-restricted chatbot |

**Architecture:**

```mermaid
flowchart TB
    User[User] --> WebSocket[WebSocket Connection]
    WebSocket --> FastAPI[FastAPI Endpoint]
    FastAPI --> PocketFlow[PocketFlow AsyncFlow]
    PocketFlow --> LLM[OpenAI / LLM API]
    PocketFlow --> Parse[Parse Server - Save Logs]
```

**Key Components:**

1. **FastAPI Server** - WebSocket endpoint at `/ws`
2. **StreamingChatNode** - AsyncNode for streaming LLM responses
3. **AsyncFlow** - Manages conversation flow
4. **LLM Integration** - OpenAI GPT-4 or other providers

**Integration with Products Page:**

```mermaid
flowchart LR
    Products[Products Page] --> ChatWidget[AI Chat Widget]
    ChatWidget --> WS[WebSocket]
    WS --> PocketFlow[PocketFlow Service]
    PocketFlow --> OpenAI[OpenAI API]
```

**Files from Cookbook (`pocketflow-fastapi-websocket`):**

```
pocketflow-fastapi-websocket/
├── main.py          # FastAPI + WebSocket endpoint
├── nodes.py         # StreamingChatNode definition
├── flow.py          # AsyncFlow creation
├── utils/
│   └── stream_llm.py  # OpenAI streaming utility
├── static/
│   └── index.html   # Chat UI
└── requirements.txt # Dependencies
```

**Dependencies:**
```
pocketflow
fastapi
uvicorn
openai
```

**Security:**
- Protect `/ws` endpoint with Hanko JWT validation
- Only authenticated users can access AI chat
- Rate limiting to control API costs

---

## 4. User Profiles

Two user types in the Products area:

| Type | Capabilities |
|------|--------------|
| **General User** | View products, chat, subscribe |
| **Service Provider** | All above + list services, analytics |

```mermaid
flowchart TB
    Hanko[Hanko Auth] --> Parse[Parse Server]
    Parse --> Profile[Profile Class]
    Profile --> General[General User]
    Profile --> Provider[Service Provider]
    Provider --> Services[Services List]
    Provider --> Analytics[Analytics]
```

---

## 5. Data Flow

```mermaid
flowchart TB
    subgraph PublicFlow [Public Flow]
        V1[Visitor] --> Blog[Posts]
        V1 --> Port[Portfolio]
        Blog --> Parse1[Parse API]
        Port --> Parse1
    end

    subgraph AuthFlow [Authenticated Flow]
        U1[User] --> Hanko[Hanko Login]
        Hanko --> JWT[JWT]
        JWT --> Prod[Products]
        Prod --> Parse2[Parse API]
        Prod --> Flow[Flowglad]
        Parse2 --> Bucket[Bucket]
        Parse2 --> Mail[BillionMail]
    end
```

---

## 6. Implementation Phases

```mermaid
flowchart TB
    P1[Phase 1: Infrastructure] --> P2[Phase 2: Auth]
    P2 --> P3[Phase 3: Features]
    P3 --> P4[Phase 4: Billing]
```

### Phase 1: Infrastructure

| Task | Component | Location |
|------|-----------|----------|
| Setup bucket | MinIO/S3/R2 | New |
| Configure Parse | Parse Server | `Backends/parse-server` |
| Deploy BillionMail | Email | `Mail/BillionMail` |

### Phase 2: Authentication

| Task | Component | Location |
|------|-----------|----------|
| Deploy Hanko | SSO | `SSO/hanko` |
| Integrate Hanko with Parse | Auth adapter | Parse config |
| Protect Products page | Frontend | Blog |
| User profile classes | Data model | Parse |

### Phase 3: Features

| Task | Component | Location |
|------|-----------|----------|
| AI Chat assistant | PocketFlow | `Automation/PocketFlow` |
| Deploy FastAPI WebSocket | Chat backend | New service |
| GitHub repo sync to bucket | Pipeline | `mystars` evolution |
| Email notifications | SMTP | BillionMail |

### Phase 4: Billing

| Task | Component | Location |
|------|-----------|----------|
| Integrate Flowglad SDK | Billing | `Payments/flowglad` |
| Setup test environment | Testing | `Payments/testpayment` |
| Subscription plans | Products | Frontend + Flowglad |
| Usage tracking | Metering | Flowglad |

---

## 7. Component Summary

| Component | Location | Purpose |
|-----------|----------|---------|
| **Parse Server** | `Backends/parse-server` | Main API, data, realtime |
| **Hanko** | `SSO/hanko` | Authentication, SSO |
| **PocketFlow** | `Automation/PocketFlow` | AI chat assistant |
| **BillionMail** | `Mail/BillionMail` | Email delivery |
| **Flowglad** | `Payments/flowglad` | Billing SDK |
| **TestPayment** | `Payments/testpayment` | Payment testing |
| **Object Bucket** | MinIO/S3/R2 | File storage |
| **mystars** | `mystars/` | GitHub repo sync |

---

## 8. Security Model

```mermaid
flowchart LR
    subgraph PublicAccess [No Auth Required]
        Posts[Posts]
        About[About]
        Portfolio[Portfolio]
    end

    subgraph ProtectedAccess [Auth Required]
        Products[Products]
        AIChat[AI Chat]
        Billing[Billing]
        Profile[Profile]
    end

    Hanko[Hanko SSO] --> ProtectedAccess
```

**Rules:**
- Posts, About, Portfolio = **No authentication**
- Products and all sub-features = **Hanko JWT required**
- Parse API checks JWT for protected endpoints
- PocketFlow WebSocket requires JWT validation
- Billing operations require valid subscription
- AI Chat rate limited to control LLM API costs

---

## 9. Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Jekyll (brutalist-blog) |
| Auth | Hanko (passkeys, OAuth) |
| Backend | Parse Server (Node.js) |
| AI Chat | PocketFlow (Python/FastAPI) |
| Database | MongoDB |
| Storage | MinIO / S3 / R2 |
| Email | BillionMail (Postfix, Dovecot) |
| Billing | Flowglad (TypeScript SDK) |
| Testing | TestPayment (Python/FastAPI) |

---

## 10. Directory Structure

```
NewSaaS/
├── blog/
│   └── brutalist-blog/      # Jekyll site
│       ├── _posts/          # Blog posts (public)
│       ├── about.md         # About page (public)
│       ├── portfolio.md     # Portfolio (public)
│       └── products.md      # Products (auth required)
├── Backends/
│   └── parse-server/        # Main API
├── SSO/
│   └── hanko/               # Authentication
├── Automation/
│   └── PocketFlow/          # AI chat framework
│       └── cookbook/        # Example implementations
├── Mail/
│   └── BillionMail/         # Email server
├── Payments/
│   ├── flowglad/            # Billing SDK
│   └── testpayment/         # Mock gateway
├── mystars/                 # GitHub sync
└── infrastructure/
    ├── docker-compose.yml
    └── bucket/              # MinIO config
```

---

## 11. Next Actions

1. **Setup infrastructure** - Bucket, Parse, BillionMail
2. **Deploy Hanko** - Configure OAuth providers
3. **Integrate Hanko with Parse** - JWT validation
4. **Create Products page** - Protected route with auth
5. **Deploy PocketFlow AI Chat** - FastAPI WebSocket service
6. **Add AI chat widget** - Connect to PocketFlow from Products page
7. **Integrate Flowglad** - Billing SDK in Products
8. **Test with TestPayment** - Mock payment flows
9. **Sync GitHub repos** - Full archives to bucket

---

*Document version: 2.1 | Last updated: 2026-02-16*
