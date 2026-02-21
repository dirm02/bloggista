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
        AIChat[AI Chat Assistant]
    end

    subgraph Private [Products Page - Auth Required]
        Products[Products Dashboard]
        UserChat[User-to-User Chat]
        Billing[Billing]
        UserProfile[User Profile]
        RepoArchive[GitHub Archives]
    end

    subgraph Backend [Backend Services]
        PocketBase[PocketBase API]
        PocketFlow[PocketFlow AI]
        BillionMail[BillionMail SMTP]
        Flowglad[Flowglad Billing]
        Bucket[Object Bucket]
    end

    Posts --> PocketBase
    Portfolio --> PocketBase
    AIChat --> PocketFlow
    AIChat -.->|reads| Portfolio
    PocketFlow --> PocketBase
    Products --> PocketBase
    UserChat --> PocketBase
    Billing --> Flowglad
    UserProfile --> PocketBase
    RepoArchive --> Bucket
    PocketBase --> BillionMail
    PocketBase --> Bucket
```

---

## Page Structure

| Page | Access | Purpose |
|------|--------|---------|
| **Posts** | Public | Blog articles, SEO content |
| **About** | Public | Company info, team, mission |
| **Portfolio** | Public | GitHub starred projects showcase |
| **AI Chat** | Public (with guardrails) | AI assistant, reads Portfolio, converts guests to users |
| **Products** | Authenticated | Dashboard, billing, user chat, profile |

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

### AI Chat Assistant (Public with Guardrails)

The AI chat is **publicly available** to all visitors -- no login required. It serves as a **conversion funnel** to turn guests into registered users.

**How it works for guests:**
- Floating chat widget visible on all public pages
- AI reads through the Portfolio data (projects, categories, READMEs)
- Helps visitors find projects, suggest ideas, answer questions
- After a few exchanges, nudges the guest to register for full features
- Conversation is stored with a session ID (anonymous)

**Guardrail behavior by user state:**

| User State | AI Behavior |
|------------|-------------|
| **Guest (not logged in)** | Can browse Portfolio via AI, limited conversation depth, prompted to register |
| **Registered (logged in)** | Full conversation history, personalized suggestions, no signup prompts |

**Conversion flow:**

```mermaid
flowchart TB
    Guest[Guest Visitor] --> AIChat[AI Chat Widget]
    AIChat --> Portfolio[Reads Portfolio Data]
    Portfolio --> Response[AI Suggests Projects]
    Response --> CTA[Prompt: Register for More]
    CTA --> PocketBase[PocketBase Signup]
    PocketBase --> RegisteredUser[Registered User]
    RegisteredUser --> Products[Access Products]
```

```mermaid
flowchart LR
    Visitor[Visitor] --> Posts
    Visitor --> About
    Visitor --> Portfolio
    Visitor --> AIChat[AI Chat]
    Posts --> SEO[Search Engines]
    Portfolio --> SEO
    AIChat -.->|reads| Portfolio
```

---

## 2. Private Products Area (Authenticated)

The **Products page** requires login and contains all premium features.

### Features behind auth:
- User dashboard
- User-to-user chat (real-time messaging via PocketBase SSE subscriptions)
- AI Chat with full history (enhanced version, no signup prompts)
- Billing and subscriptions
- Profile management (General User or Service Provider)
- GitHub repo archives (full downloads from bucket)

```mermaid
flowchart TB
    User[User] --> Login[PocketBase Login]
    Login --> Products[Products Dashboard]
    Products --> UserChat[User-to-User Chat]
    Products --> Billing[Billing]
    Products --> Profile[Profile]
    Products --> Archives[Repo Archives]
```

---

## 3. Backend Services

### 3.1 PocketBase

**Location:** `Backends/pocketbase`

**Role:**
- Main API for all app data (REST at `/api/*`)
- Built-in users/auth with OAuth2 (Google, GitHub)
- User-to-user chat messages via SSE subscriptions (realtime)
- AI chat conversation logs
- File storage (local or S3)
- Embedded SQLite database (no separate DB service)
- Admin UI at `/_/`
- JS migrations and hooks for business logic

**User-to-User Chat via PocketBase:**

```mermaid
flowchart LR
    UserA[User A] --> REST[PocketBase REST API]
    REST --> Messages[(messages collection)]
    Messages --> SSE[PocketBase SSE]
    SSE --> UserB[User B]
```

PocketBase provides real-time push via Server-Sent Events. When User A sends a message, User B receives it instantly through subscriptions.

**Data Models for Chat (PocketBase collections):**

```
messages:
  - sender: relation(users)
  - recipient: relation(users)
  - content: text
  - readAt: date (nullable)
  - created: datetime

conversations:
  - participants: json (array of user ids)
  - lastMessage: text
  - updated: datetime
```

### 3.2 BillionMail SMTP

**Location:** `Mail/BillionMail`

**Role:**
- Welcome emails on signup
- Password reset
- Chat notifications (new message alerts)
- Newsletter for blog subscribers

### 3.3 Flowglad Billing

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
    Flowglad --> PocketBase[PocketBase - Store Status]
```

### 3.4 TestPayment (Development Only)

**Location:** `Payments/testpayment`

**Role:**
- Mock payment gateway for testing
- Simulates payment flows and OTP verification
- Webhook simulation
- Test card: `4444 4444 4444 4444`

**Use:** Development and testing only, never production.

### 3.5 Object Bucket

**Provider:** MinIO / S3 / R2

**Role:**
- Store full GitHub repo archives (tarballs)
- File storage for user uploads
- Chat file attachments (future)

### 3.6 PocketFlow AI Chat (Public Service)

**Location:** `Automation/PocketFlow`

**What is PocketFlow:**
- 100-line minimalist LLM framework
- Zero dependencies, zero vendor lock-in
- Supports Agents, Workflows, RAG, and more
- Python-based with FastAPI integration

**Role:**
- **Public AI assistant** -- available to everyone, no login required
- Reads Portfolio data to help visitors find projects and ideas
- Conversion funnel: guides guests toward registration
- Real-time streaming responses via WebSocket
- Guardrails adjust behavior based on guest vs registered user

**Guardrail Logic:**

```mermaid
flowchart TB
    WS[WebSocket Connection] --> CheckJWT{JWT Present?}
    CheckJWT -->|Yes| Registered[Registered Mode]
    CheckJWT -->|No| Guest[Guest Mode]

    Guest --> GuestRules[Guardrails: Limited depth]
    GuestRules --> Portfolio[Read Portfolio Data]
    Portfolio --> Suggest[Suggest Projects]
    Suggest --> CTA[Nudge: Register for More]

    Registered --> FullAccess[Full conversation]
    FullAccess --> History[Saved history]
    FullAccess --> Personalized[Personalized suggestions]
```

| Mode | Conversation Depth | History | Portfolio Access | Signup Prompts |
|------|-------------------|---------|-----------------|----------------|
| **Guest** | Limited (e.g. 10 messages per session) | Session only (anonymous) | Yes (read-only) | Yes, after a few exchanges |
| **Registered** | Unlimited | Persistent (PocketBase) | Yes + personalized | No |

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
    Guest[Guest / User] --> WebSocket[WebSocket Connection]
    WebSocket --> FastAPI[FastAPI Endpoint]
    FastAPI --> Guardrail{Guest or Registered?}
    Guardrail --> GuestFlow[Guest Flow - Limited + CTA]
    Guardrail --> RegFlow[Registered Flow - Full Access]
    GuestFlow --> PocketFlow[PocketFlow AsyncFlow]
    RegFlow --> PocketFlow
    PocketFlow --> LLM[OpenAI / LLM API]
    PocketFlow --> PocketBase[PocketBase - Save Logs]
    PocketFlow --> PortfolioData[Portfolio Data - Projects]
```

**Key Components:**

1. **FastAPI Server** - WebSocket endpoint at `/ws` (public, no auth required)
2. **GuardrailNode** - Checks JWT presence, sets guest vs registered mode
3. **StreamingChatNode** - AsyncNode for streaming LLM responses
4. **PortfolioReaderNode** - Loads portfolio project data for AI context
5. **AsyncFlow** - Manages conversation flow with mode-aware branching
6. **LLM Integration** - OpenAI GPT-4 or other providers

**Files from Cookbook (`pocketflow-fastapi-websocket`):**

```
pocketflow-fastapi-websocket/
├── main.py          # FastAPI + WebSocket endpoint
├── nodes.py         # StreamingChatNode + GuardrailNode
├── flow.py          # AsyncFlow with branching
├── utils/
│   ├── stream_llm.py    # OpenAI streaming utility
│   └── portfolio.py     # Portfolio data loader
├── static/
│   └── index.html       # Chat widget UI
└── requirements.txt     # Dependencies
```

**Dependencies:**
```
pocketflow
fastapi
uvicorn
openai
```

**Security and Cost Control:**
- `/ws` endpoint is **public** -- no JWT required to connect
- If JWT is present, PocketFlow detects it and switches to registered mode
- Guest sessions: rate limit by IP (e.g. 10 messages/session, 50/day)
- Registered sessions: rate limit by user ID (higher budget)
- All conversations logged in PocketBase for analytics

---

## 4. Chat: Two Separate Systems

The platform has **two distinct chat systems** with different access levels and purposes.

| Feature | User-to-User Chat | AI Chat Assistant |
|---------|-------------------|-------------------|
| **Access** | Authenticated only (Products) | **Public** (all pages) |
| **Purpose** | Messaging between users | AI help, project discovery, conversion |
| **Backend** | PocketBase + SSE subscriptions | PocketFlow + FastAPI |
| **Protocol** | PocketBase SSE | FastAPI WebSocket |
| **Storage** | PocketBase messages collection | PocketBase ai_conversations collection |
| **Real-time** | Yes (LiveQuery push) | Yes (streaming tokens) |
| **Cost** | Free (self-hosted) | Per token (LLM API) |
| **Rate limit** | ACLs (participants only) | IP-based (guest) / user-based (registered) |
| **Portfolio aware** | No | Yes -- reads Portfolio data |

```mermaid
flowchart TB
    Guest[Guest Visitor] --> AIChat[AI Chat Widget]
    RegUser[Registered User] --> AIChat
    RegUser --> UserChat[User-to-User Chat]

    AIChat --> PocketFlow[PocketFlow Service]
    PocketFlow --> LLM[OpenAI API]
    PocketFlow --> PortData[Portfolio Data]
    PocketFlow --> PBLog[PocketBase - Save Logs]

    UserChat --> PocketBase[PocketBase API]
    PocketBase --> SSE[SSE Subscriptions]
    SSE --> OtherUser[Other User]
```

---

## 5. User Profiles

Two user types in the Products area:

| Type | Capabilities |
|------|--------------|
| **Guest (no account)** | AI Chat (limited), browse Portfolio via AI, prompted to register |
| **General User** | AI Chat (full), user-to-user chat, view products, subscribe |
| **Service Provider** | All above + list services, analytics, manage clients |

```mermaid
flowchart TB
    PocketBase[PocketBase Auth] --> Profile[profiles collection]
    Profile --> General[General User]
    Profile --> Provider[Service Provider]
    Provider --> Services[Services List]
    Provider --> Analytics[Analytics]
```

---

## 6. Data Flow

```mermaid
flowchart TB
    subgraph PublicFlow [Public Flow - No Auth]
        V1[Visitor] --> Blog[Posts]
        V1 --> Port[Portfolio]
        V1 --> AIChat[AI Chat Widget]
        Blog --> PB1[PocketBase API]
        Port --> PB1
        AIChat --> PFlow[PocketFlow]
        PFlow --> LLM[LLM API]
        PFlow -.->|reads| Port
    end

    subgraph AuthFlow [Authenticated Flow]
        U1[User] --> PB[PocketBase Auth]
        PB --> Prod[Products]
        Prod --> PB2[PocketBase API]
        Prod --> UChat[User-to-User Chat]
        Prod --> FGlad[Flowglad]
        UChat --> PB2
        PB2 --> Bucket[Bucket]
        PB2 --> Mail[BillionMail]
    end
```

---

## 7. Implementation Phases

```mermaid
flowchart TB
    P1[Phase 1 - Infrastructure] --> P2[Phase 2 - Auth and Profiles]
    P2 --> P3[Phase 3 - Public AI Chat]
    P3 --> P4[Phase 4 - User-to-User Chat]
    P4 --> P5[Phase 5 - Billing]
    P5 --> P6[Phase 6 - GitHub Pipeline]
```

### Phase 1: Infrastructure (Weeks 1-2)

| Task | Component | Location |
|------|-----------|----------|
| Setup object bucket | MinIO/S3/R2 | New |
| Configure PocketBase | Backend API | `Backends/pocketbase` |
| Deploy BillionMail | Email server | `Mail/BillionMail` |

### Phase 2: Authentication and Profiles (Weeks 3-4)

| Task | Component | Location |
|------|-----------|----------|
| Configure PocketBase OAuth2 | Auth | PocketBase Admin UI |
| Create profiles collection | Data model | PocketBase |
| Protect Products page | Frontend auth | Blog (PocketBase SDK) |
| Welcome email on signup | Email | BillionMail |

### Phase 3: AI Chat - Public (Weeks 5-6)

| Task | Component | Location |
|------|-----------|----------|
| Deploy PocketFlow FastAPI service | AI backend | `Automation/PocketFlow` |
| Build portfolio data loader for AI context | AI context | PocketFlow |
| Implement guardrail logic (guest vs registered) | Guardrails | PocketFlow |
| Build floating AI chat widget (all public pages) | Frontend | Blog layout |
| Guest rate limiting by IP | Security | PocketFlow |
| Conversion CTA prompts in guest mode | UX | PocketFlow |

### Phase 4: User-to-User Chat - Authenticated (Weeks 7-8)

| Task | Component | Location |
|------|-----------|----------|
| Create messages and conversations collections | Data model | PocketBase |
| Subscribe to collection via PocketBase SSE | Real-time | Frontend SDK |
| Build user-to-user chat UI | Frontend | Products page |
| Chat notification emails | Email | BillionMail |

### Phase 5: Billing (Weeks 9-10)

| Task | Component | Location |
|------|-----------|----------|
| Integrate Flowglad SDK | Billing | `Payments/flowglad` |
| Setup TestPayment for dev | Testing | `Payments/testpayment` |
| Create subscription plans | Products | Frontend + Flowglad |
| Usage tracking and feature gates | Metering | Flowglad |

### Phase 6: GitHub Archive Pipeline (Weeks 11-12)

| Task | Component | Location |
|------|-----------|----------|
| Repo download service | Pipeline | New service |
| Upload archives to bucket | Storage | Bucket |
| Index repos in PocketBase | Metadata | PocketBase |
| Evolve mystars or separate job | Sync | `mystars/` |
| Repo browser in Products page | Frontend | Products page |

---

## 8. Component Summary

| Component | Location | Purpose |
|-----------|----------|---------|
| **PocketBase** | `Backends/pocketbase` | Main API, SQLite, auth, user chat (SSE), file storage |
| **PocketFlow** | `Automation/PocketFlow` | Public AI chat (guest + registered, with guardrails) |
| **BillionMail** | `Mail/BillionMail` | Email delivery |
| **Flowglad** | `Payments/flowglad` | Billing SDK |
| **TestPayment** | `Payments/testpayment` | Payment testing (dev only) |
| **Object Bucket** | MinIO/S3/R2 | File and repo archive storage |
| **mystars** | `mystars/` | GitHub repo sync |

---

## 9. Security Model

```mermaid
flowchart LR
    subgraph PublicAccess [No Auth Required]
        Posts[Posts]
        About[About]
        Portfolio[Portfolio]
        AIChat[AI Chat]
    end

    subgraph ProtectedAccess [Auth Required]
        Products[Products]
        UserChat[User Chat]
        Billing[Billing]
        Profile[Profile]
    end

    PocketBase[PocketBase Auth] --> ProtectedAccess
    AIChat -.->|optional token| PocketBase
```

**Rules:**
- Posts, About, Portfolio, AI Chat = **No authentication required**
- Products, User Chat, Billing, Profile = **PocketBase auth required**
- PocketBase API enforces auth for protected collections
- User-to-user chat ACLs: only participants can read/write messages
- AI Chat (guest): rate limited by IP, limited depth, signup prompts
- AI Chat (registered): JWT detected automatically, full access, saved history
- Billing operations: require valid subscription

---

## 10. Technology Stack

| Layer | Technology | Access |
|-------|------------|--------|
| Frontend | Jekyll (brutalist-blog) | Public |
| AI Chat | PocketFlow (Python/FastAPI) | Public (with guardrails) |
| Auth | PocketBase (email + OAuth2) | Products gate |
| Backend API | PocketBase (Go) | Mixed |
| User Chat | PocketBase SSE subscriptions | Authenticated |
| Database | SQLite (embedded in PocketBase) | Backend |
| Storage | MinIO / S3 / R2 | Backend |
| Email | BillionMail (Postfix, Dovecot) | Backend |
| Billing | Flowglad (TypeScript SDK) | Authenticated |
| Testing | TestPayment (Python/FastAPI) | Dev only |

---

## 11. Directory Structure

```
NewSaaS/
├── blog/
│   └── brutalist-blog/      # Jekyll site (frontend)
│       ├── _posts/          # Blog posts (public)
│       ├── about.md         # About page (public)
│       ├── portfolio.md     # Portfolio (public)
│       └── products.md      # Products (auth required)
├── Backends/
│   └── pocketbase/          # Main API + auth + user chat
├── Automation/
│   └── PocketFlow/          # AI chat framework
│       └── cookbook/         # Example implementations
├── Mail/
│   └── BillionMail/         # Email server
├── Payments/
│   ├── flowglad/            # Billing SDK
│   └── testpayment/         # Mock gateway (dev only)
├── mystars/                 # GitHub repo sync
└── infrastructure/
    ├── docker-compose.yml
    └── bucket/              # MinIO config
```

---

## 12. Next Actions

1. **Setup infrastructure** - Bucket, PocketBase, BillionMail
2. **Configure PocketBase OAuth2** - Google, GitHub in Admin UI
3. **Create profiles collection** - General User, Service Provider
4. **Protect Products page** - PocketBase SDK login on frontend
5. **Deploy PocketFlow AI Chat** - Public FastAPI WebSocket service
6. **Build AI chat widget** - Floating widget on all public pages
7. **Implement guardrails** - Guest vs registered mode, portfolio reader, conversion CTAs
8. **Build user-to-user chat** - messages/conversations collections, SSE, chat UI in Products
9. **Chat notification emails** - BillionMail alerts for new messages
10. **Integrate Flowglad** - Billing SDK, subscription plans
11. **Test with TestPayment** - Mock payment flows
12. **Build GitHub archive pipeline** - Download repos to bucket
13. **Index repos in PocketBase** - Metadata and search

---

*Document version: 5.0 | Last updated: 2026-02-16*
