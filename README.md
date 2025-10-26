# Offline Copilot

> A 100% offline AI coding assistant powered by local language models

**Created by IraitzZZ**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

## 🚀 Features

- **100% Offline** - No internet required after installation
- **Lightweight** - Total size < 300 MB
- **Cross-platform** - Works on Windows, Linux, and macOS
- **Smart Code Generation** - Generate code from simple comments
- **Safe** - Preview and confirm changes before applying
- **Fast** - Local inference with quantized models

## 📦 Installation

### From npm

\`\`\`bash
npm install -g offline-copilot
\`\`\`

### From source

\`\`\`bash
git clone https://github.com/IraitzZZ/offline-copilot.git
cd offline-copilot
npm install
npm run build
npm link
\`\`\`

## 🎯 Quick Start

1. **Initialize the tool** (downloads the model):

\`\`\`bash
offline-copilot init
\`\`\`

2. **Add @copilot comments to your code**:

\`\`\`javascript
// @copilot: create a function to validate email addresses

// @copilot: add error handling for network requests
\`\`\`

3. **Process the file**:

\`\`\`bash
offline-copilot process myfile.js
\`\`\`

4. **Review and confirm** the generated code!

## 📖 Usage

### Process a single file

\`\`\`bash
offline-copilot process <file>
\`\`\`

Options:
- `-y, --yes` - Skip confirmation prompts
- `-d, --dry-run` - Show changes without applying them

### Scan entire project

\`\`\`bash
offline-copilot scan [directory]
\`\`\`

Options:
- `-p, --pattern <pattern>` - File pattern to match (default: `**/*.{js,ts,py,java,cpp,c,go,rs}`)

### Initialize/Download model

\`\`\`bash
offline-copilot init
\`\`\`

## 🎨 CLI Design

The CLI features a minimalist design with:
- **Background**: Black
- **Text**: White
- **Accents**: Red (#cc0000) and Blue (#0066cc)
- **Clear messages** with no visual noise

\`\`\`
  ╔═══════════════════════════════════════╗
  ║  OFFLINE COPILOT                   ║
  ║  100% Local AI Coding Assistant    ║
  ╚═══════════════════════════════════╝
           Powered by IraitzZZ
\`\`\`

## 🔧 Supported Languages

- JavaScript/TypeScript (`.js`, `.ts`)
- Python (`.py`)
- Java (`.java`)
- C/C++ (`.c`, `.cpp`)
- Go (`.go`)
- Rust (`.rs`)

## 📝 Comment Syntax

Offline Copilot recognizes the following comment patterns:

\`\`\`javascript
// @copilot: your instruction here
\`\`\`

\`\`\`python
# @copilot: your instruction here
\`\`\`

\`\`\`java
/* @copilot: your instruction here */
\`\`\`

## 🏗️ Project Structure

\`\`\`
offline-copilot/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── commands/
│   │   ├── process.ts        # Process command
│   │   └── scan.ts           # Scan command
│   ├── ai/
│   │   └── generator.ts      # AI code generator
│   └── utils/
│       ├── branding.ts       # Logo and branding
│       ├── file-processor.ts # File processing utilities
│       └── model-manager.ts  # Model download and management
├── bin/
│   └── offline-copilot.js    # Executable entry point
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

**Created by IraitzZZ**

## 🔗 Links

- [GitHub Repository](https://github.com/IraitzZZ/offline-copilot)
- [npm Package](https://www.npmjs.com/package/offline-copilot)
- [Report Issues](https://github.com/IraitzZZ/offline-copilot/issues)

## 💡 Use Cases

Perfect for:
- Automating repetitive coding tasks
- Working in air-gapped environments
- Privacy-conscious development
- Learning and experimentation
- NAS management scripts
- Offline development tools

---

**Powered by IraitzZZ** | Made with ❤️ for developers who value privacy and offline capabilities
\`\`\`

```text file="LICENSE"
MIT License

Copyright (c) 2025 IraitzZZ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
Created by IraitzZZ
