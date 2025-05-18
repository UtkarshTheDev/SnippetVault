import localforage from "localforage";
import { sampleSnippets, initializeSampleSnippets } from "./sampleSnippets";

const SNIPPET_STORAGE_KEY = "snippetvault_snippets";

export interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  tags: string[];
  liked: boolean;
  description: string;
  mediaUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SearchFilters {
  searchQuery?: string;
  language?: string;
  tag?: string;
  onlyLiked?: boolean;
}

// Save all snippets
export const saveSnippets = async (snippets: Snippet[]): Promise<boolean> => {
  try {
    await localforage.setItem(SNIPPET_STORAGE_KEY, snippets);
    return true;
  } catch (error) {
    console.error("Error saving snippets:", error);
    return false;
  }
};

// Load all snippets
export const loadSnippets = async (
  filters?: SearchFilters
): Promise<Snippet[]> => {
  try {
    const snippets = await localforage.getItem(SNIPPET_STORAGE_KEY);
    if (snippets === null || snippets === undefined) {
      return [];
    } else {
      let filteredSnippets = snippets as Snippet[];

      // Apply filters if provided
      if (filters) {
        // Filter by search query (title, content, description)
        if (filters.searchQuery && filters.searchQuery.trim() !== "") {
          const query = filters.searchQuery.toLowerCase().trim();
          filteredSnippets = filteredSnippets.filter(
            (snippet) =>
              snippet.title.toLowerCase().includes(query) ||
              snippet.content.toLowerCase().includes(query) ||
              (snippet.description &&
                snippet.description.toLowerCase().includes(query))
          );
        }

        // Filter by language
        if (filters.language && filters.language !== "all") {
          filteredSnippets = filteredSnippets.filter(
            (snippet) => snippet.language === filters.language
          );
        }

        // Filter by tag
        if (filters.tag && filters.tag !== "all") {
          filteredSnippets = filteredSnippets.filter((snippet) =>
            snippet.tags.includes(filters.tag)
          );
        }

        // Filter by liked status
        if (filters.onlyLiked) {
          filteredSnippets = filteredSnippets.filter(
            (snippet) => snippet.liked
          );
        }
      }

      return filteredSnippets;
    }
  } catch (error) {
    console.error("Error loading snippets:", error);
    return [];
  }
};

// Add a new snippet
export const addSnippet = async (snippet: Snippet): Promise<boolean> => {
  try {
    const snippets = await loadSnippets();
    const updatedSnippets = [...snippets, snippet];
    return await saveSnippets(updatedSnippets);
  } catch (error) {
    console.error("Error adding snippet:", error);
    return false;
  }
};

// Update an existing snippet
export const updateSnippet = async (
  updatedSnippet: Snippet
): Promise<boolean> => {
  try {
    const snippets = await loadSnippets();
    const updatedSnippets = snippets.map((snippet) =>
      snippet.id === updatedSnippet.id ? updatedSnippet : snippet
    );
    return await saveSnippets(updatedSnippets);
  } catch (error) {
    console.error("Error updating snippet:", error);
    return false;
  }
};

// Delete a snippet
export const deleteSnippet = async (snippetId: string): Promise<boolean> => {
  try {
    const snippets = await loadSnippets();
    const filteredSnippets = snippets.filter(
      (snippet) => snippet.id !== snippetId
    );
    return await saveSnippets(filteredSnippets);
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return false;
  }
};

// Toggle like status
export const toggleSnippetLike = async (
  snippetId: string
): Promise<boolean> => {
  try {
    const snippets = await loadSnippets();
    const updatedSnippets = snippets.map((snippet) => {
      if (snippet.id === snippetId) {
        return { ...snippet, liked: !snippet.liked };
      }
      return snippet;
    });
    return await saveSnippets(updatedSnippets);
  } catch (error) {
    console.error("Error toggling snippet like:", error);
    return false;
  }
};

// Check if any snippets exist
export const hasSnippets = async (): Promise<boolean> => {
  try {
    const snippets = await localforage.getItem(SNIPPET_STORAGE_KEY);
    return (
      snippets !== null &&
      snippets !== undefined &&
      Array.isArray(snippets) &&
      (snippets as Snippet[]).length > 0
    );
  } catch (error) {
    console.error("Error checking if snippets exist:", error);
    return false;
  }
};

// Initialize with sample snippets if no snippets exist
export const initializeWithSampleSnippetsIfNeeded =
  async (): Promise<boolean> => {
    try {
      const snippetsExist = await hasSnippets();

      if (!snippetsExist) {
        console.log("No snippets found, initializing with sample snippets...");
        return await initializeSampleSnippets(saveSnippets);
      }

      return true; // Already initialized
    } catch (error) {
      console.error("Error initializing with sample snippets:", error);
      return false;
    }
  };
