import React, { useState } from "react";
import SnippetList from "./SnippetList";
import SnippetEditor from "./SnippetEditor";

const Layout: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateSnippetClick = () => {
    setIsEditing(true);
  };

  const handleSaveSnippet = () => {
    setIsEditing(false);
    // Consider refreshing snippet list here later
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex w-screen h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar p-4">
        <h2 className="text-lg font-bold mb-4 font-sans">Sidebar</h2>
        {/* Sidebar content goes here */}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="bg-sidebar p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold font-sans">SnippetAI</h1>
          {/* Top bar content goes here (search, avatar) */}
        </header>

        {/* Main Area */}
        <main className="flex-1 relative overflow-y-auto flex items-center justify-center">
          {/* Main content goes here (snippet list or editor) */}
          {isEditing ? (
            <SnippetEditor
              onSave={handleSaveSnippet}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <SnippetList />
            </div>
          )}

          {/* Floating Action Button */}
          {!isEditing && (
            <button
              className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/80 transition-colors"
              onClick={handleCreateSnippetClick}
              aria-label="Create new snippet"
            >
              +
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
