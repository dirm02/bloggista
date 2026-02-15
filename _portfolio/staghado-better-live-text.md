---
layout: project
name: Staghado Better Live Text
slug: staghado-better-live-text
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/staghado-better-live-text/assets/demo.gif
repo_url: https://github.com/ggerganov/llama.cpp).
---
{% raw %}
# better-live-text

Reading a paper and want to grab that equation? Screenshot a table from a slide? Copy text from a scanned PDF?

⌘⇧O → select region → text in your clipboard.

<p align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/staghado-better-live-text/assets/demo.gif" width="600" />
</p>

Local OCR for macOS. Runs [LightOnOCR-2-1B](https://huggingface.co/lightonai/LightOnOCR-2-1B) via [llama.cpp](https://github.com/ggerganov/llama.cpp). Pure bash, nothing leaves your machine.

## Installation
```bash
curl -LsSf https://raw.githubusercontent.com/staghado/better-live-text/main/install.sh | sh
```

Then:
1. Grant Hammerspoon Accessibility access (System Settings → Privacy & Security → Accessibility)
2. Click Hammerspoon menu bar icon → Reload Config

## Usage

1. Press **Cmd+Shift+O**
2. Select a region
3. Wait for "✓ Copied"
4. Paste with **Cmd+V**

First run downloads the model (~1GB). Subsequent runs are fast depending on screenshot size.

## Configuration

Edit `MODEL` and `QUANT` at the top of [`src/better-live-text/run.sh`](src/better-live-text/run.sh). Kill the running server (`pkill llama-server`) to apply changes.

| Quant | GGUF | Size | Speed |
|---|---|---|---|
| `Q8_0` | [`Q8_0-GGUF`](https://huggingface.co/staghado/LightOnOCR-2-1B-Q8_0-GGUF) | ~1 GB | Slowest, best quality |
| `Q4_K_M` (default) | [`Q4_K_M-GGUF`](https://huggingface.co/staghado/LightOnOCR-2-1B-Q4_K_M-GGUF) | 846 MB | Faster |
| `Q4_K_S` | [`Q4_K_S-GGUF`](https://huggingface.co/staghado/LightOnOCR-2-1B-Q4_K_S-GGUF) | 833 MB | Fastest, lower quality |

## Features

- 🖥️ Fully local — no data leaves your machine
- ⚡ Fast — pure bash, no Python startup overhead
- 🎯 Simple — one hotkey (Cmd+Shift+O)
- 🧹 Clean — auto-deletes screenshots
- 🧮 Handles LaTeX equations, tables, and structured content from papers
- 📸 Works on anything on screen — scanned PDFs, slides, code, error messages, diagrams

## Uninstall
```bash
curl -LsSf https://raw.githubusercontent.com/staghado/better-live-text/main/uninstall.sh | sh
```

## Requirements

- macOS (Apple Silicon)
- [Homebrew](https://brew.sh)

The install script will also install:
- [llama.cpp](https://github.com/ggerganov/llama.cpp) — runs the OCR model
- [Hammerspoon](https://www.hammerspoon.org/) — hotkey binding
- [jq](https://jqlang.github.io/jq/) — JSON processing

## How it Works

1. Hammerspoon listens for Cmd+Shift+O
2. Triggers `screencapture -i` (interactive region selection)
3. Downscales image to fit model's native resolution
4. Sends to local LightOnOCR model via llama.cpp
5. Copies extracted text to clipboard
6. Deletes screenshot

## Credits

- [LightOnOCR-2-1B](https://huggingface.co/lightonai/LightOnOCR-2-1B)
- [llama.cpp](https://github.com/ggerganov/llama.cpp)
- [Hammerspoon](https://www.hammerspoon.org/)

## License

MIT

{% endraw %}