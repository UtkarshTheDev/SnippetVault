import React, { useState } from "react";
import { loadSnippets, saveSnippets } from "../lib/snippetStorage";
import { v4 as uuidv4 } from "uuid";

interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  tags: string[];
  liked: boolean;
  description: string;
  mediaUrl?: string;
}

interface SnippetEditorProps {
  onSave: () => void;
  onCancel: () => void;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState(""); // Storing as comma-separated string for now
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleSave = async () => {
    const newSnippet: Snippet = {
      id: uuidv4(), // Generate unique ID
      title,
      content,
      language,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      liked: false,
      description,
      mediaUrl,
    };

    // Load existing snippets, add the new one, and save
    const existingSnippets = await loadSnippets(); // Need to import loadSnippets
    const updatedSnippets = [...existingSnippets, newSnippet];
    await saveSnippets(updatedSnippets);
    onSave(); // Call the parent's onSave handler
  };

  return (
    <div className="p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary font-sans">
        Create New Snippet
      </h2>
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-foreground mb-1 font-serif"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md bg-background border-border text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-foreground mb-1 font-serif"
        >
          Code Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md bg-background border-border text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono p-2"
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-foreground mb-1 font-serif"
        >
          Language
        </label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md bg-background border-border text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-foreground mb-1 font-serif"
        >
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md bg-background border-border text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground mb-1 font-serif"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md bg-background border-border text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="mediaUrl"
          className="block text-sm font-medium text-foreground mb-1 font-serif"
        >
          Media URL
        </label>
        <input
          type="text"
          id="mediaUrl"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          className="mt-1 block w-full rounded-md bg-background border-border text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-2 text-sm font-medium text-foreground rounded-md border border-border hover:bg-muted transition-colors font-sans"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/80 transition-colors font-sans"
          onClick={handleSave}
        >
          Save Snippet
        </button>
      </div>
    </div>
  );
};

export default SnippetEditor;
