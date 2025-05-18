# SnippetVault

<div align="center">
  <img src="public/snippetvault-logo.svg" alt="SnippetVault Logo" width="120" height="120" />
  <h3>Your Personal Code Snippet Manager</h3>
</div>

SnippetVault is a modern, elegant code snippet manager built with React, TypeScript, and Vite. It allows developers to store, organize, and quickly access their frequently used code snippets with syntax highlighting for multiple programming languages.

- View At: https://snippet-vault-ten.vercel.app/

## ✨ Features

- **Code Snippet Management**: Create, edit, view, and delete code snippets
- **Syntax Highlighting**: Beautiful syntax highlighting for 20+ programming languages using Prism.js
- **Search & Filter**: Quickly find snippets by title, content, language, or tags
- **Favorites**: Mark your most-used snippets as favorites for quick access
- **Tags**: Organize snippets with custom tags
- **Dark Theme**: Modern dark theme UI with Catppuccin-inspired colors
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: All snippets are stored locally in your browser
- **Sample Snippets**: Comes with pre-loaded sample snippets to get you started

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UtkarshTheDev/SnippetVault.git
   cd snippetvault
   ```

2. Install dependencies:

   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [Lucide React](https://lucide.dev/) - Icon library
- [LocalForage](https://localforage.github.io/localForage/) - Client-side storage
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## 📋 Usage

### Creating a Snippet

1. Click the "+" button in the bottom right corner
2. Fill in the snippet details:
   - Title
   - Code content
   - Language
   - Description (optional)
   - Tags (optional)
3. Click "Save" to store your snippet

### Viewing Snippets

- All snippets are displayed in a card layout on the main screen
- Click on a snippet card to view the full code
- Use the search bar to find specific snippets
- Filter snippets by language, tags, or favorites

### Editing and Deleting Snippets

- Click the three-dot menu on a snippet card
- Select "Edit" to modify the snippet
- Select "Delete" to remove the snippet

## 🎨 Customization

SnippetVault uses Tailwind CSS for styling, making it easy to customize the appearance:

- Edit `tailwind.config.js` to modify the color scheme
- Modify `src/lib/prism-theme.css` to customize the code syntax highlighting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Catppuccin](https://github.com/catppuccin/catppuccin) for color scheme inspiration
- [T3 Chat](https://t3.gg/) for UI design inspiration

---

<div align="center">
  Made with ❤️ by Utkarsh
</div>
