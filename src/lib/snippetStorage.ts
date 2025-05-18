import localforage from "localforage";

const SNIPPET_STORAGE_KEY = "snippetvault_snippets";

export const saveSnippets = async (snippets: any[]) => {
  try {
    await localforage.setItem(SNIPPET_STORAGE_KEY, snippets);
    console.log("Snippets saved successfully");
  } catch (error) {
    console.error("Error saving snippets:", error);
  }
};

export const loadSnippets = async (): Promise<any[]> => {
  try {
    const snippets = await localforage.getItem(SNIPPET_STORAGE_KEY);
    console.log("Snippets loaded successfully");
    if (snippets === null || snippets === undefined) {
      return [];
    } else {
      return snippets as any[];
    }
  } catch (error) {
    console.error("Error loading snippets:", error);
    return [];
  }
};
