import React, { useState, useEffect } from "react";
import { loadSnippets, saveSnippets } from "../lib/snippetStorage";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";

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

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "shell", label: "Shell/Bash" },
  { value: "other", label: "Other" },
];

const SnippetEditor: React.FC<SnippetEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState(""); // Storing as comma-separated string for now
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [activeTab, setActiveTab] = useState("edit");

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
    const existingSnippets = await loadSnippets();
    const updatedSnippets = [...existingSnippets, newSnippet];
    await saveSnippets(updatedSnippets);
    onSave(); // Call the parent's onSave handler
  };

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Create New Snippet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter snippet title"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="content">Code Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your code here"
                className="font-mono min-h-[200px]"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="pt-4">
            {content ? (
              <CodeBlock
                code={content}
                language={language || "javascript"}
                showLineNumbers={true}
              />
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-muted/50 rounded-md border border-border">
                <p className="text-muted-foreground">No code to preview</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, hooks, tutorial"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for your snippet"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mediaUrl">Media URL</Label>
          <Input
            id="mediaUrl"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://example.com/image.png"
          />
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Snippet</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SnippetEditor;
