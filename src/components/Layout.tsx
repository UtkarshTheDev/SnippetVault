import React from "react";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#1a1a1a] text-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2a2a2a] p-4">
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>
        {/* Sidebar content goes here */}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="bg-[#2a2a2a] p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">SnippetAI</h1>
          {/* Top bar content goes here (search, avatar) */}
        </header>

        {/* Main Area */}
        <main className="flex-1 p-4">
          {/* Main content goes here (snippet list or editor) */}
          <h2 className="text-lg">Main Content</h2>
        </main>
      </div>
    </div>
  );
};

export default Layout;
