---
layout: project
name: Undb Io Undb
slug: undb-io-undb
category: Uncategorized
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/intro.jpeg
repo_url: https://github.com/undb-io/undb
indexed_content: "undb The Open Source no code database / BaaS UNDB is a no-code platform
  that can also serve as a Backend as a Service (BaaS). It is based on SQLite and
  can be packaged into a binary file using Bun for backend service. Additionally,
  it can be deployed as a service via Docker, offering a UI for table management.
  Website | Documentation | Twitter / X | Discord | Roadmap ## Features - ⚡ No-code
  platform, easy to use - \U0001F5C4️ Based on SQLite, a lightweight database - \U0001F941
  Built-in playground mode, try it out without any setup - \U0001F510 Private and
  local first - \U0001F4E6 Can be packaged into a binary file using Bun - \U0001F4CA
  Support formula field like Excel/Airtable - \U0001F310 OpenAPI RESTful API support
  - \U0001FA9C Progressive deployment, from local in single file to cloud complicated
  stacks. - \U0001F433 Supports Docker deployment - \U0001F6E0️ Provides a UI for
  table management ## Screenshot ## Quick start - Try [undb cloud](https://app.undb.io)
  - Run with docker ```bash docker run -p 3721:3721 ghcr.io/undb-io/undb:latest ```
  - Run with docker with volume ```bash docker run -d \\ -p 3721:3721 \\ -v $(pwd)/undb:/usr/src/app/.undb
  \\ --name undb \\ ghcr.io/undb-io/undb:latest ``` ### Deploy on Render.com ## Development
  ### Local Development (Recommended) 1. **Install Bun** Refer to [Bun's official
  documentation](https://bun.sh/docs) for installation instructions. 2. **Clone the
  repository** ```bash git clone https://github.com/undb-io/undb.git cd undb ``` 3.
  **Install dependencies** ```bash bun install ``` 4. **Start the development server**
  ```bash bun run dev ``` ### Docker compose development ```bash docker compose up
  -d ``` then visit `http://localhost:3721` ## Build ### Packaging into a Binary File
  1. **Build** ```bash bun run build ``` ### Docker Deployment 1. **Build the Docker
  image** ```bash docker build -t undb . ``` 2. **Run the Docker container** ```bash
  docker run -d -p 3721:3721 undb ```"
---
{% raw %}
<h1 align="center" style="border-bottom: none">
    <div>
        <a href="https://undb.io">
            <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/logo.png" width="80" />
            <br>
            undb
        </a>
    </div>
    The Open Source no code database / BaaS <br>
</h1>

UNDB is a no-code platform that can also serve as a Backend as a Service (BaaS). It is based on SQLite and can be packaged into a binary file using Bun for backend service. Additionally, it can be deployed as a service via Docker, offering a UI for table management.

![undb](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/intro.jpeg)

<div align="center">
    <a href="https://app.undb.io">Website</a> |
    <a href="https://docs.undb.io">Documentation</a> |
    <a href="https://x.com/unified_undb">Twitter / X</a> |
    <a href="https://discord.gg/3rcNdU3y3U">Discord</a> |
    <a href="https://app.undb.io/s/v/shrd0q2m4dyijmh">Roadmap</a>
</div>

<br />

<div align="center">
    <a href="https://github.com/undb-io/undb/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/undb-io/undb" alt="License">
    </a>
    <a href="https://github.com/undb-io/undb/releases">
        <img src="https://img.shields.io/github/v/release/undb-io/undb" alt="Release">
    </a>
</div>

<br />

## Features

- ⚡ No-code platform, easy to use
- 🗄️ Based on SQLite, a lightweight database
- 🥁 Built-in playground mode, try it out without any setup
- 🔐 Private and local first
- 📦 Can be packaged into a binary file using Bun
- 📊 Support formula field like Excel/Airtable
- 🌐 OpenAPI RESTful API support
- 🪜 Progressive deployment, from local in single file to cloud complicated stacks.
- 🐳 Supports Docker deployment
- 🛠️ Provides a UI for table management

## Screenshot

![kanban](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/kanban.jpeg)
![gallery](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/gallery.jpeg)
![calendar](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/calendar.jpeg)
![pivot](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/pivot.jpeg)
![form](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/form.jpeg)
![openapi](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/undb-io-undb/docs/images/openapi.jpeg)

## Quick start

- Try [undb cloud](https://app.undb.io)

- Run with docker

```bash
docker run -p 3721:3721 ghcr.io/undb-io/undb:latest
```

- Run with docker with volume

```bash
docker run -d \
  -p 3721:3721 \
  -v $(pwd)/undb:/usr/src/app/.undb \
  --name undb \
  ghcr.io/undb-io/undb:latest
```

### Deploy on Render.com

<a href="https://render.com/deploy?repo=https://github.com/undb-io/undb">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

## Development

### Local Development (Recommended)

1. **Install Bun**

   Refer to [Bun's official documentation](https://bun.sh/docs) for installation instructions.

2. **Clone the repository**

   ```bash
   git clone https://github.com/undb-io/undb.git
   cd undb
   ```

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Start the development server**

   ```bash
   bun run dev
   ```

### Docker compose development

```bash
docker compose up -d
```

then visit `http://localhost:3721`

## Build

### Packaging into a Binary File

1. **Build**
   ```bash
   bun run build
   ```

### Docker Deployment

1. **Build the Docker image**

   ```bash
   docker build -t undb .
   ```

2. **Run the Docker container**

   ```bash
   docker run -d -p 3721:3721 undb
   ```

{% endraw %}