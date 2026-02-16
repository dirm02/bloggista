---
layout: project
name: Dani3l0 Honey
slug: dani3l0-honey
category: Let's try this- Personal prefere
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/dani3l0-honey/screenshot.jpg
repo_url: https://github.com/dani3l0/honey
indexed_content: "# honey _A sweet dashboard I use on my homeserver with some self-hosted
  stuff..._ honey is written in **pure** `HTML` `CSS` `JS` so dynamic backend or special
  webserver configuration is not required. It works out-of-the-box as all operations
  are done client-side. **[\U0001F4FA Live demo](https://honeyy.vercel.app/)** ##
  \U0001F680 Installation ### \U0001F578️ On existing webserver 1. Download latest
  prebuilt archive from **[Releases](https://github.com/dani3l0/honey/releases)**.
  2. Extract downloaded archive to your webserver root. 3. You're done! ### \U0001F40B
  via Docker ``` docker run -p 4173:4173 -v /path/to/config:/app/dist/config ghcr.io/dani3l0/honey:latest
  ``` - `-p 4173:4173` - exposes HTTP port to your machine - `-v /path/to/config:/app/dist/config`
  - mounts config directory to your local filesystem, missing config files will be
  created automatically If you have custom icons or background images, you can freely
  put them in `config` dir. Just remember to provide valid URLs (with `/config` prefix).
  _alternatively, use a `docker-compose.yml` file_ ## ⚙️ Configuration Configuration
  file is located at `config/config.json`. ### \U0001F4F1 Tweaking the user interface
  The following keys are available under `ui` section. Some of them are listed in
  _Settings_ page and can be customized by end-user. | Key name | Description | in
  Settings | |-----------------------|-----------------------------------------------------------------------------------------------------------|----------------|
  | `name` | Name shown at the main screen and the tab title. | ❌ | | `desc` | Short
  description shown under title at the main screen. | ❌ | | `icon` | Icon shown at
  the main screen and as site's favicon. | ❌ | | `wallpaper` | Background image visible
  when dark mode is disabled. | ❌ | | `wallpaper_dark` | Background image visible
  when dark mode is enabled. | ❌ | | `dark_mode` | Tells whether dark mode is enabled
  by default. (Available values: `Auto`,`Off`,`On`) | ✅ | | `open_new_tab` | Tells
  whether clicking on a service will open it in new tab by default. | ✅ | | `ping_dots`
  | Enables small dot before service name indicating whether is it available or not.
  | ✅ | | `blur` | Tells whether card background blur is enabled by default. | ✅ |
  | `animations` | Tells whether UI animations are enabled by default. | ✅ | | `trusted_domains`
  | Array of domains (or IP addresses) to no longer be considered as 3rd-parties.
  RegExp is fully supported. | ✅ | ### \U0001F517 Adding custom services `services`
  section is an array containing objects. Object's structure looks like this: | Key
  name | Description | |-------------------|-------------------------------------------------------------------------------|
  | `name` | Your service's name. | | `desc` | Short description shown under service's
  name. | | `href` | URL address of your service. It is directly passed to ` ` tag.
  | | `icon` | Path to an icon of your service. | Example: ``` ... { \"name\": \"CalDav\",
  \"desc\": \"Simple CalDav server for calendar sync between various devices.\", \"href\":
  \"caldav\", \"icon\": \"img/preview/caldav.png\" }, ... ``` ## \U0001F6E0️ Development
  honey is built on top of [Vite.js](https://vitejs.dev/). This tool allows faster
  development and offers various optimizations. How to prepare a development environment:
  ``` # Download the source code git clone https://github.com/dani3l0/honey && cd
  honey # Install required modules npm i ``` ### \U0001F5FC Live server **For coding.**
  This will spin up a HTTP server on **[localhost:5173](http://localhost:5173/)**.
  Each time source file is saved, UI will automatically hot-reload so there is no
  need for `ALT+TAB` and `F5`. ``` npm run dev ``` ### \U0001F3D7️ Build **Prepare
  project for production.** This command will link and optimize project assets to
  take less space and require less bandwith. Prebuilt assets will be stored in `dist`
  directory and are ready to be put in a webserver root. ``` npm run build ``` ##
  \U0001F91D Credits Of course, some third-party resources are used in this project.
  I kanged them for self-hosting, easier development and to avoid compatibility issues.
  - **[Material Icons](https://github.com/materialos/android-icon-pack/)**, for app
  icons at _Services_ page - **[Google Fonts](https://fonts.google.com/)**, for material
  icons on buttons and Quicksand font - **honey icon** - random icon found in DuckDuckGo
  Images - **Wallpapers** - very nice background images kanged from [wallhaven](https://wallhaven.cc/)"
---
{% raw %}
# honey

_A sweet dashboard I use on my homeserver with some self-hosted stuff..._

honey is written in **pure** `HTML` `CSS` `JS` so dynamic backend or special webserver configuration is not required.
It works out-of-the-box as all operations are done client-side.

<font size="4">**[📺 Live demo](https://honeyy.vercel.app/)**</font>

<img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/dani3l0-honey/screenshot.jpg" style="width: 720px">


## 🚀 Installation

### 🕸️ On existing webserver

1. Download latest prebuilt archive from **[Releases](https://github.com/dani3l0/honey/releases)**.

2. Extract downloaded archive to your webserver root.

3. You're done!


### 🐋 via Docker

```
docker run -p 4173:4173 -v /path/to/config:/app/dist/config ghcr.io/dani3l0/honey:latest
```

- `-p 4173:4173` - exposes HTTP port to your machine
- `-v /path/to/config:/app/dist/config` - mounts config directory to your local filesystem, missing config files will be created automatically

If you have custom icons or background images, you can freely put them in `config` dir.
Just remember to provide valid URLs (with `/config` prefix).

_alternatively, use a `docker-compose.yml` file_


## ⚙️ Configuration

Configuration file is located at `config/config.json`.


### 📱 Tweaking the user interface

The following keys are available under `ui` section.
Some of them are listed in _Settings_ page and can be customized by end-user.

| Key name				| Description																								| in Settings	 |
|-----------------------|-----------------------------------------------------------------------------------------------------------|----------------|
| `name`				| Name shown at the main screen and the tab title.															|		❌		|
| `desc`				| Short description shown under title at the main screen.													|		❌		|
| `icon`				| Icon shown at the main screen and as site's favicon.														|		❌		|
| `wallpaper`			| Background image visible when dark mode is disabled.														|		❌		|
| `wallpaper_dark`		| Background image visible when dark mode is enabled.														|		❌		|
| `dark_mode`			| Tells whether dark mode is enabled by default. (Available values: `Auto`,`Off`,`On`)						|		✅		|
| `open_new_tab`		| Tells whether clicking on a service will open it in new tab by default.									|		✅		|
| `ping_dots`			| Enables small dot before service name indicating whether is it available or not.							|		✅		|
| `blur`				| Tells whether card background blur is enabled by default.													|		✅		|
| `animations`			| Tells whether UI animations are enabled by default.														|		✅		|
| `trusted_domains`		| Array of domains (or IP addresses) to no longer be considered as 3rd-parties. RegExp is fully supported.	|		✅		|


### 🔗 Adding custom services

`services` section is an array containing objects. Object's structure looks like this:

| Key name			| Description																	|
|-------------------|-------------------------------------------------------------------------------|
| `name`			| Your service's name.															|
| `desc`			| Short description shown under service's name.									|
| `href`			| URL address of your service. It is directly passed to `<a>` tag.				|
| `icon`			| Path to an icon of your service.												|

Example:
```
...
{
	"name": "CalDav",
	"desc": "Simple CalDav server for calendar sync between various devices.",
	"href": "caldav",
	"icon": "img/preview/caldav.png"
},
...
```


## 🛠️ Development

honey is built on top of [Vite.js](https://vitejs.dev/). This tool allows faster development and offers various optimizations.

How to prepare a development environment:

```
# Download the source code
git clone https://github.com/dani3l0/honey && cd honey

# Install required modules
npm i
```


### 🗼 Live server

**For coding.** This will spin up a HTTP server on **[localhost:5173](http://localhost:5173/)**. Each time source file is saved, UI will automatically hot-reload so there is no need for `ALT+TAB` and `F5`.

```
npm run dev
```


### 🏗️ Build

**Prepare project for production.** This command will link and optimize project assets to take less space and require less bandwith. Prebuilt assets will be stored in `dist` directory and are ready to be put in a webserver root.

```
npm run build
```


## 🤝 Credits

Of course, some third-party resources are used in this project. I kanged them for self-hosting, easier development and to avoid compatibility issues.

- **[Material Icons](https://github.com/materialos/android-icon-pack/)**, for app icons at _Services_ page

- **[Google Fonts](https://fonts.google.com/)**, for material icons on buttons and Quicksand font

- **honey icon** - random icon found in DuckDuckGo Images

- **Wallpapers** - very nice background images kanged from [wallhaven](https://wallhaven.cc/)

{% endraw %}