---
layout: project
name: Qnguyen3 Docpixie
slug: qnguyen3-docpixie
category: Future RAG ressources
image: https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/qnguyen3-docpixie/screenshot.png
repo_url: https://github.com/dirm02/mystars/tree/master/starred-readmes/qnguyen3-docpixie
indexed_content: "# DocPixie A lightweight multimodal RAG (Retrieval-Augmented Generation)
  library that uses vision AI instead of traditional embeddings or vector databases.
  DocPixie processes documents as images and uses vision language models for both
  document understanding and intelligent page selection. ## \U0001F31F Features -
  **Vision-First Approach**: Documents processed as images using PyMuPDF, preserving
  visual information and formatting - **No Vector Database Required**: Eliminates
  the complexity of embeddings and vector storage - **Adaptive RAG Agent**: Single
  intelligent agent that dynamically plans tasks and selects relevant pages - **Multi-Provider
  Support**: Works with OpenAI GPT-4V, Anthropic Claude, and OpenRouter - **Modern
  CLI Interface**: Beautiful terminal UI built with Textual - **Conversation Aware**:
  Maintains context across multiple queries - **Pluggable Storage**: Local filesystem
  or in-memory storage backends ## \U0001F680 Quick Start ### Installation ```bash
  # use uv (recommended) uv pip install docpixie # or pip pip install docpixie ```
  Try the CLI: ```bash docpixie ``` ### Basic Usage ```python import asyncio from
  docpixie import DocPixie async def main(): # Initialize with your API key docpixie
  = DocPixie() # Add a document document = await docpixie.add_document(\"path/to/your/document.pdf\")
  print(f\"Added document: {document.name}\") # Query the document result = await
  docpixie.query(\"What are the key findings?\") print(f\"Answer: {result.answer}\")
  print(f\"Pages used: {result.page_numbers}\") # Run the example asyncio.run(main())
  ``` ### Using the CLI Start the interactive terminal interface: ```bash docpixie
  ``` The CLI provides: - Interactive document chat - Document management - Conversation
  history - Model configuration - Command palette with shortcuts ## \U0001F6E0️ Configuration
  DocPixie uses environment variables for API key configuration: ```bash # For OpenAI
  (default) export OPENAI_API_KEY=\"your-openai-key\" # For Anthropic Claude export
  ANTHROPIC_API_KEY=\"your-anthropic-key\" # For OpenRouter (supports many models)
  export OPENROUTER_API_KEY=\"your-openrouter-key\" ``` You can also specify the provider:
  ```python from docpixie import DocPixie, DocPixieConfig config = DocPixieConfig(
  provider=\"anthropic\", # or \"openai\", \"openrouter\" model=\"claude-3-opus-20240229\",
  vision_model=\"claude-3-opus-20240229\" ) docpixie = DocPixie(config=config) ```
  ## \U0001F4DA Supported File Types - **PDF files** (.pdf) - Full multipage support
  - More file types coming soon ## \U0001F3D7️ Architecture DocPixie uses a clean,
  modular architecture: ``` \U0001F4C1 Core Components ├── \U0001F9E0 Adaptive RAG
  Agent - Dynamic task planning and execution ├── \U0001F441️ Vision Processing -
  Document-to-image conversion via PyMuPDF ├── \U0001F50C Provider System - Unified
  interface for AI providers ├── \U0001F4BE Storage Backends - Local filesystem or
  in-memory storage └── \U0001F5A5️ CLI Interface - Modern terminal UI with Textual
  \U0001F4C1 Processing Flow 1. Document → Images (PyMuPDF) 2. Vision-based summarization
  3. Adaptive query processing 4. Intelligent page selection 5. Response synthesis
  ``` ### Key Design Principles - **Provider-Agnostic**: Generic model configuration
  works across all providers - **Image-Based Processing**: All documents converted
  to images, preserving visual context - **Business Logic Separation**: Raw API operations
  separate from workflow logic - **Adaptive Intelligence**: Single agent mode that
  dynamically adjusts based on findings ## \U0001F3AF Use Cases - **Research & Analysis**:
  Query academic papers, reports, and research documents - **Document Q&A**: Interactive
  questioning of PDFs, contracts, and manuals - **Content Discovery**: Find specific
  information across large document collections - **Visual Document Processing**:
  Handle documents with charts, diagrams, and complex layouts ## \U0001F30D Environment
  Variables | Variable | Description | Default | |----------|-------------|---------|
  | `OPENAI_API_KEY` | OpenAI API key | None | | `ANTHROPIC_API_KEY` | Anthropic API
  key | None | | `OPENROUTER_API_KEY` | OpenRouter API key | None | | `DOCPIXIE_PROVIDER`
  | AI provider | `openai` | | `DOCPIXIE_STORAGE_PATH` | Storage directory | `./docpixie_data`
  | | `DOCPIXIE_JPEG_QUALITY` | Image quality (1-100) | `90` | ## \U0001F4D6 Documentation
  - [Getting Started Guide](docs/getting-started.md) - Detailed examples and tutorials
  - [CLI Tool Guide](docs/cli-tool.md) - Complete CLI documentation ## \U0001F91D
  Contributing 1. Fork the repository 2. Create a feature branch (`git checkout -b
  feature/amazing-feature`) 3. Commit your changes (`git commit -m 'Add amazing feature'`)
  4. Push to the branch (`git push origin feature/amazing-feature`) 5. Open a Pull
  Request ## \U0001F4C4 License This project is licensed under the MIT License - see
  the LICENSE file for details. ## \U0001F64F Acknowledgments - Built with [PyMuPDF](https://pymupdf.readthedocs.io/)
  for PDF processing - CLI powered by [Textual](https://textual.textualize.io/) -
  Supports OpenAI, Anthropic, and OpenRouter APIs ---"
---
{% raw %}
# DocPixie

A lightweight multimodal RAG (Retrieval-Augmented Generation) library that uses vision AI instead of traditional embeddings or vector databases. DocPixie processes documents as images and uses vision language models for both document understanding and intelligent page selection.

![DocPixie Demo](https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/qnguyen3-docpixie/screenshot.png)

## 🌟 Features

- **Vision-First Approach**: Documents processed as images using PyMuPDF, preserving visual information and formatting
- **No Vector Database Required**: Eliminates the complexity of embeddings and vector storage
- **Adaptive RAG Agent**: Single intelligent agent that dynamically plans tasks and selects relevant pages
- **Multi-Provider Support**: Works with OpenAI GPT-4V, Anthropic Claude, and OpenRouter
- **Modern CLI Interface**: Beautiful terminal UI built with Textual
- **Conversation Aware**: Maintains context across multiple queries
- **Pluggable Storage**: Local filesystem or in-memory storage backends

## 🚀 Quick Start

### Installation

```bash
# use uv (recommended)
uv pip install docpixie

# or pip
pip install docpixie
```

Try the CLI:
```bash
docpixie
```

### Basic Usage

```python
import asyncio
from docpixie import DocPixie

async def main():
    # Initialize with your API key
    docpixie = DocPixie()

    # Add a document
    document = await docpixie.add_document("path/to/your/document.pdf")
    print(f"Added document: {document.name}")

    # Query the document
    result = await docpixie.query("What are the key findings?")
    print(f"Answer: {result.answer}")
    print(f"Pages used: {result.page_numbers}")

# Run the example
asyncio.run(main())
```

### Using the CLI

Start the interactive terminal interface:

```bash
docpixie
```

The CLI provides:
- Interactive document chat
- Document management
- Conversation history
- Model configuration
- Command palette with shortcuts

## 🛠️ Configuration

DocPixie uses environment variables for API key configuration:

```bash
# For OpenAI (default)
export OPENAI_API_KEY="your-openai-key"

# For Anthropic Claude
export ANTHROPIC_API_KEY="your-anthropic-key"

# For OpenRouter (supports many models)
export OPENROUTER_API_KEY="your-openrouter-key"
```

You can also specify the provider:

```python
from docpixie import DocPixie, DocPixieConfig

config = DocPixieConfig(
    provider="anthropic",  # or "openai", "openrouter"
    model="claude-3-opus-20240229",
    vision_model="claude-3-opus-20240229"
)

docpixie = DocPixie(config=config)
```

## 📚 Supported File Types

- **PDF files** (.pdf) - Full multipage support
- More file types coming soon

## 🏗️ Architecture

DocPixie uses a clean, modular architecture:

```
📁 Core Components
├── 🧠 Adaptive RAG Agent - Dynamic task planning and execution
├── 👁️  Vision Processing - Document-to-image conversion via PyMuPDF
├── 🔌 Provider System - Unified interface for AI providers
├── 💾 Storage Backends - Local filesystem or in-memory storage
└── 🖥️  CLI Interface - Modern terminal UI with Textual

📁 Processing Flow
1. Document → Images (PyMuPDF)
2. Vision-based summarization
3. Adaptive query processing
4. Intelligent page selection
5. Response synthesis
```

### Key Design Principles

- **Provider-Agnostic**: Generic model configuration works across all providers
- **Image-Based Processing**: All documents converted to images, preserving visual context
- **Business Logic Separation**: Raw API operations separate from workflow logic
- **Adaptive Intelligence**: Single agent mode that dynamically adjusts based on findings

## 🎯 Use Cases

- **Research & Analysis**: Query academic papers, reports, and research documents
- **Document Q&A**: Interactive questioning of PDFs, contracts, and manuals
- **Content Discovery**: Find specific information across large document collections
- **Visual Document Processing**: Handle documents with charts, diagrams, and complex layouts

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | None |
| `ANTHROPIC_API_KEY` | Anthropic API key | None |
| `OPENROUTER_API_KEY` | OpenRouter API key | None |
| `DOCPIXIE_PROVIDER` | AI provider | `openai` |
| `DOCPIXIE_STORAGE_PATH` | Storage directory | `./docpixie_data` |
| `DOCPIXIE_JPEG_QUALITY` | Image quality (1-100) | `90` |

## 📖 Documentation

- [Getting Started Guide](docs/getting-started.md) - Detailed examples and tutorials
- [CLI Tool Guide](docs/cli-tool.md) - Complete CLI documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [PyMuPDF](https://pymupdf.readthedocs.io/) for PDF processing
- CLI powered by [Textual](https://textual.textualize.io/)
- Supports OpenAI, Anthropic, and OpenRouter APIs

---

{% endraw %}