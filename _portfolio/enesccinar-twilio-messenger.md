---
layout: project
name: Enesccinar Twilio Messenger
slug: enesccinar-twilio-messenger
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/enesccinar-twilio-messenger/assets/app_demo.png
repo_url: https://github.com/dirm02/mystars/tree/master/starred-readmes/enesccinar-twilio-messenger
---
{% raw %}
# Twilio Messenger

A simple messaging app built with Twilio, NestJS, and Next.js.

![App overview — centralized inbox, secure access, conversation view, and Twilio API flow](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/enesccinar-twilio-messenger/assets/app_demo.png)

## Features

- **Conversation list** — View SMS threads by contact with latest message and status
- **Send & receive** — Send and receive SMS via Twilio
- **Unread indicators** — Inbound messages marked unread until opened
- **New conversation** — Start a chat by entering a phone number
- **PWA** — Install as an app; offline caching and `standalone` display. An in-app “Install” banner is shown when the browser supports it; on iOS, a short “Add to Home Screen” hint is shown.

## Setup

```bash
pnpm install
```

Copy `.env.example` to `.env` in both `apps/api` and `apps/web`, then fill in your values.

**Push notifications (Firebase):**  
- In `apps/web`, set `NEXT_PUBLIC_FIREBASE_*` and `NEXT_PUBLIC_FIREBASE_VAPID_KEY` (see `.env.example`).  
- In `apps/api`, set **one** of:
  - **`GOOGLE_APPLICATION_CREDENTIALS`** = path to the Firebase service account JSON (Firebase Console → Project settings → Service accounts → Generate new private key), or  
  - **`FIREBASE_SERVICE_ACCOUNT_JSON`** = minified JSON string (one line), or  
  - **`FIREBASE_SERVICE_ACCOUNT_JSON_B64`** = base64 of the JSON (recommended for Docker: `base64 -w0 firebase-service-account.json`).  
- In Twilio, set the “A MESSAGE COMES IN” webhook to `https://<your-api-host>/inbound-text-message-hook` (POST).

## Run

```bash
pnpm dev:all
```

This starts the API and web app. The web app is at [http://localhost:3000](http://localhost:3000).

**PWA (install prompt):** The service worker (`sw.js`) is generated only when you run a production build. To see the Install banner in dev, run `pnpm --filter web build` once; `next dev` will then serve `public/sw.js` and the PWA will be installable.

### Testing push locally

1. **API** (`apps/api/.env`): set `GOOGLE_APPLICATION_CREDENTIALS` to the path to your Firebase service account JSON (e.g. `../../firebase-admin-sdk.json` if it’s at the repo root and the API runs from `apps/api`), or use `FIREBASE_SERVICE_ACCOUNT_JSON_B64`.
2. **Web** (`apps/web/.env`): set `NEXT_PUBLIC_FIREBASE_*` and `NEXT_PUBLIC_FIREBASE_VAPID_KEY`.
3. In [Firebase Console](https://console.firebase.google.com/) → Project settings → General, add `localhost` to **Authorized domains** if it’s not there.
4. Run `pnpm dev:all`, open [http://localhost:3000](http://localhost:3000), log in, and **allow notifications** when the browser asks.
5. Click the **bell icon** in the header (only when the API URL is `localhost`) to send a test notification to all registered devices. The `POST /push/test` endpoint is only available when `NODE_ENV !== 'production'`.

To test the **Twilio → push** flow locally, expose the API with [ngrok](https://ngrok.com/) (e.g. `ngrok http 3001`), set the Twilio “A MESSAGE COMES IN” webhook to `https://<ngrok-host>/inbound-text-message-hook`, and send an SMS to your Twilio number.

## Docker

Build and run with Docker Compose:

```bash
# Create apps/api/.env from apps/api/.env.example (required for API)
docker compose up --build
```

- **API** → [http://localhost:3001](http://localhost:3001)
- **Web** → [http://localhost:3000](http://localhost:3000)

Or build images manually (from repo root):

```bash
docker build -f apps/api/Dockerfile -t twilio-messenger-api .
docker build -f apps/web/Dockerfile -t twilio-messenger-web .
```

**Web runtime config:** API URL and Firebase config are read from `process.env` at runtime (`/fcm-config` route and `window.__FIREBASE_CONFIG__`). Set them in `env_file` (e.g. `apps/web/.env` or the compose `.env`).

### Production (both images from GHCR; one .env)

Both **API** and **web** images come from GHCR. One `.env` next to `docker-compose.prod.yml` supplies all variables (no build, no GitHub Variables). Copy the root `.env.prod.example` to `.env` in that directory, then set:

- `API_URL`, `NEXT_PUBLIC_API_URL` (can match `API_URL`)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD`
- `FIREBASE_SERVICE_ACCOUNT_JSON_B64` = base64 of the Firebase service account JSON (`base64 -w0 firebase-service-account.json`)
- `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_VAPID_KEY`

```bash
# For private images: docker login ghcr.io
docker compose -f docker-compose.prod.yml up -d
```

## GitHub Container Registry (GHCR)

Both images are built and pushed to GHCR on push to `main`. No GitHub Variables; API and web read config from `.env` at runtime.

| Image | Example |
|-------|---------|
| API | `ghcr.io/<owner>/twilio-messenger-api:latest` |
| Web | `ghcr.io/<owner>/twilio-messenger-web:latest` |

Replace `<owner>` with your GitHub user or org (e.g. `ghcr.io/enesccinar/twilio-messenger-api`).

To pull (after making the package public or when logged in):

```bash
docker pull ghcr.io/<owner>/twilio-messenger-api:latest
docker pull ghcr.io/<owner>/twilio-messenger-web:latest
```

{% endraw %}