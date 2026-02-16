---
layout: project
name: Voidauth Voidauth
slug: voidauth-voidauth
category: Very important!!!!
image: https://img.shields.io/github/actions/workflow/status/voidauth/voidauth/release.yml
repo_url: https://github.com/voidauth/voidauth
indexed_content: "Single Sign-On for Your Self-Hosted Universe Website | Source Code
  ## What is VoidAuth VoidAuth is an open-source SSO authentication and user management
  provider that stands guard in front of your self-hosted applications. It is easy-to-use
  for admins and end-users, supports nice-to-have features like passkeys, user invitation,
  self-registration, email support, and more! Features: - \U0001F310 OpenID Connect
  (OIDC) Provider - \U0001F504 Proxy ForwardAuth - \U0001F464 User and Groups Management
  - \U0001F4E8 User Self-Registration and Invitations - \U0001F3A8 Customizable (Logo,
  Title, Theme Color, Email Templates) - \U0001F511 Multi-factor Authentication, Passkeys,
  and Passkey-Only Accounts - \U0001F4E7 Secure Password Reset with Email Verification
  - \U0001F512 Encryption-At-Rest with Postgres or SQLite Database ### Admin Panel
  Administrators can access the Admin Panel in the sidebar menu, where they can manage
  users and settings. ## Quick Start Getting started with VoidAuth is straightforward,
  the recommended approach is to add VoidAuth to a `compose.yml` file: ``` yaml services:
  # --------------------------------- # Your reverse-proxy service here: # caddy,
  traefik, nginx, etc. # --------------------------------- voidauth: image: voidauth/voidauth:latest
  restart: unless-stopped volumes: - ./voidauth/config:/app/config environment: #
  Required environment variables # More environment variable options can be found
  # on the Getting Started page. APP_URL: # required, ex. https://auth.example.com
  STORAGE_KEY: # required DB_PASSWORD: # required, same as voidauth-db POSTGRES_PASSWORD
  DB_HOST: voidauth-db # required depends_on: voidauth-db: condition: service_healthy
  voidauth-db: image: postgres:18 restart: unless-stopped environment: POSTGRES_PASSWORD:
  # required, same as voidauth DB_PASSWORD volumes: - db:/var/lib/postgresql/18/docker
  healthcheck: test: \"pg_isready -U postgres -h localhost\" volumes: db: ``` After
  creating/updating the compose.yml file and filling in the required environment variables,
  run `docker compose up -d` and visit your `APP_URL` to get started. > [!IMPORTANT]
  > After VoidAuth starts for the first time, find the initial administrator username
  and password in the logs: `docker compose logs voidauth`. Use these credentials
  to log in and change the default username and password or create a separate user
  for yourself. > [!TIP] > Users are created by administrators on the Invitations
  page by creating a new Invitation, then sending the invitation link. Please see
  the [Getting Started](https://voidauth.app/#/Getting-Started) page for setup details
  and configuration options. ## Support Issues, Suggestions, and Feature Requests
  should be added as [Issues](https://github.com/voidauth/voidauth/issues) of the
  appropriate type. For Help and Support, Q&A, or anything else; open a [Discussion](https://github.com/orgs/voidauth/discussions).
  This project is actively monitored, I will likely respond quickly. ## Contributing
  Please read the CONTRIBUTING.md ## Disclaimer VoidAuth has not been audited and
  uses 3rd party packages for much of its functionality, use at your own risk. ##
  Credits This project would not be possible without the incredible work of others
  including but not limited to: [node-oidc-provider](https://github.com/panva/node-oidc-provider)
  Handles OIDC Provider functionality [SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn)
  Used for webauthn/passkey support [Angular](https://angular.dev) Frontend web framework
  [Knex](https://knexjs.org/) Database connection and query builder [zxcvbn-ts](https://zxcvbn-ts.github.io/zxcvbn/)
  Password strength calculator ## Sponsors [](https://github.com/GitTimeraider)"
---
{% raw %}
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/voidauth/voidauth/release.yml)
![GitHub License](https://img.shields.io/github/license/voidauth/voidauth)
![GitHub Release](https://img.shields.io/github/v/release/voidauth/voidauth?logo=github)
![GitHub Repo stars](https://img.shields.io/github/stars/voidauth/voidauth?style=flat&logo=github)


<br>
<p align="center">
  <a href='https://voidauth.app'>
    <img src="https://raw.githubusercontent.com/voidauth/voidauth/refs/heads/main/docs/logo_full_text.svg" width="180" title="VoidAuth" alt="VoidAuth logo"/>
  </a>
</p>

<p align="center">
  <strong>
    Single Sign-On for Your Self-Hosted Universe
  </strong>
</p>

<br>

<div align="center">
  <a href="https://voidauth.app">Website</a> |
  <a href="https://github.com/voidauth/voidauth">Source Code</a>
</div>

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/voidauth/voidauth/refs/heads/main/docs/public/screenshots/login_page.png" title="Login Portal" alt="Login Portal" width="280">
</p>

## What is VoidAuth

VoidAuth is an open-source SSO authentication and user management provider that stands guard in front of your self-hosted applications. It is easy-to-use for admins and end-users, supports nice-to-have features like passkeys, user invitation, self-registration, email support, and more!

Features:

- 🌐 OpenID Connect (OIDC) Provider
- 🔄 Proxy ForwardAuth
- 👤 User and Groups Management
- 📨 User Self-Registration and Invitations
- 🎨 Customizable (Logo, Title, Theme Color, Email Templates)
- 🔑 Multi-factor Authentication, Passkeys, and Passkey-Only Accounts
- 📧 Secure Password Reset with Email Verification
- 🔒 Encryption-At-Rest with Postgres or SQLite Database

### Admin Panel

Administrators can access the Admin Panel in the sidebar menu, where they can manage users and settings.

<p align="center">
  <img src="https://raw.githubusercontent.com/voidauth/voidauth/refs/heads/main/docs/public/screenshots/admin_panel.png" title="Admin Panel" alt="An Admin Page with the Admin Side Panel Open" width="600">
</p>

## Quick Start

Getting started with VoidAuth is straightforward, the recommended approach is to add VoidAuth to a `compose.yml` file:

``` yaml
services:
  # ---------------------------------
  # Your reverse-proxy service here:
  # caddy, traefik, nginx, etc.
  # ---------------------------------

  voidauth: 
    image: voidauth/voidauth:latest
    restart: unless-stopped
    volumes:
      - ./voidauth/config:/app/config
    environment:
      # Required environment variables
      # More environment variable options can be found 
      #   on the Getting Started page.
      APP_URL: # required, ex. https://auth.example.com
      STORAGE_KEY: # required
      DB_PASSWORD: # required, same as voidauth-db POSTGRES_PASSWORD
      DB_HOST: voidauth-db # required
    depends_on:
      voidauth-db:
        condition: service_healthy

  voidauth-db:
    image: postgres:18
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: # required, same as voidauth DB_PASSWORD
    volumes:
      - db:/var/lib/postgresql/18/docker
    healthcheck:
      test: "pg_isready -U postgres -h localhost"

volumes:
  db:
```

After creating/updating the compose.yml file and filling in the required environment variables, run `docker compose up -d` and visit your `APP_URL` to get started.

> [!IMPORTANT]
> After VoidAuth starts for the first time, find the initial administrator username and password in the logs: `docker compose logs voidauth`. Use these credentials to log in and change the default username and password or create a separate user for yourself.

> [!TIP]
> Users are created by administrators on the Invitations page by creating a new Invitation, then sending the invitation link.

Please see the [Getting Started](https://voidauth.app/#/Getting-Started) page for setup details and configuration options.

## Support

Issues, Suggestions, and Feature Requests should be added as [Issues](https://github.com/voidauth/voidauth/issues) of the appropriate type. For Help and Support, Q&A, or anything else; open a [Discussion](https://github.com/orgs/voidauth/discussions). This project is actively monitored, I will likely respond quickly.

## Contributing

Please read the CONTRIBUTING.md

## Disclaimer

VoidAuth has not been audited and uses 3rd party packages for much of its functionality, use at your own risk.

## Credits

This project would not be possible without the incredible work of others including but not limited to:

[node-oidc-provider](https://github.com/panva/node-oidc-provider) Handles OIDC Provider functionality

[SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn) Used for webauthn/passkey support

[Angular](https://angular.dev) Frontend web framework

[Knex](https://knexjs.org/) Database connection and query builder

[zxcvbn-ts](https://zxcvbn-ts.github.io/zxcvbn/) Password strength calculator

## Sponsors

[![](https://github.com/GitTimeraider.png?size=50)](https://github.com/GitTimeraider)

{% endraw %}