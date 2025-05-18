import React, { useEffect, useState } from "react";
import { loadSnippets } from "../lib/snippetStorage";

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

const SnippetList: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      const storedSnippets = await loadSnippets();
      setSnippets(storedSnippets);
      setLoading(false);
    };

    fetchSnippets();
  }, []);

  if (loading) {
    return <div className="text-foreground">Loading snippets...</div>;
  }

  if (snippets.length === 0) {
    return (
      <div className="text-foreground">No snippets yet—create one now!</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold text-primary">{snippet.title}</h3>
          <p className="text-sm text-foreground mt-2 font-mono">
            {snippet.language}
          </p>
          {/* Add more snippet details and actions here */}
          {/* Placeholder for code preview */}
          <div className="mt-4 text-sm font-mono text-muted-foreground italic">
            {snippet.content
              ? snippet.content.substring(0, 50) + "..."
              : "No content preview"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
