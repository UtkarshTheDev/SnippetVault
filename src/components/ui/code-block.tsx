import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import { cn } from "@/lib/utils";

// Import Prism core
import "prismjs/prism";

// Import Prism plugins
import "prismjs/plugins/line-numbers/prism-line-numbers";

// Import markup and markup-templating first (dependencies for other languages)
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";

// Import Prism languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-php";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-dart";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  css: "css",
  python: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  go: "go",
  rust: "rust",
  shell: "bash",
  bash: "bash",
  sql: "sql",
  json: "json",
  markdown: "markdown",
  yaml: "yaml",
  php: "php",
  ruby: "ruby",
  swift: "swift",
  kotlin: "kotlin",
  scala: "scala",
  dart: "dart",
  html: "markup",
  xml: "markup",
  other: "javascript", // Default to javascript for "other"
};

export function CodeBlock({
  code,
  language,
  className,
  showLineNumbers = false,
  maxHeight = "400px",
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      try {
        Prism.highlightElement(codeRef.current);
      } catch (error) {
        console.error("Error highlighting code:", error);
        // Fallback to basic styling if highlighting fails
      }
    }
  }, [code, language]);

  const mappedLanguage = languageMap[language.toLowerCase()] || "javascript";
  const lineNumbersClass = showLineNumbers ? "line-numbers" : "";

  // Ensure code has no trailing spaces to avoid line number issues
  const formattedCode = code.trimEnd();

  return (
    <div
      className={cn(
        "rounded-md overflow-hidden bg-sidebar border border-border shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-sidebar-accent/10 border-b border-border">
        <span className="text-xs font-medium text-sidebar-foreground">
          {language.toUpperCase()}
        </span>
      </div>
      <pre
        className={cn(
          "p-4 overflow-auto font-mono text-sm bg-sidebar text-sidebar-foreground",
          lineNumbersClass
        )}
        style={{ maxHeight }}
      >
        <code ref={codeRef} className={`language-${mappedLanguage}`}>
          {formattedCode}
        </code>
      </pre>
    </div>
  );
}
