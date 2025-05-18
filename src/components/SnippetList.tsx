import React, { useEffect, useState } from "react";
import { loadSnippets } from "../lib/snippetStorage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Code, ExternalLink, Eye, X } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      const storedSnippets = await loadSnippets();
      setSnippets(storedSnippets);
      setLoading(false);
    };

    fetchSnippets();
  }, []);

  const handleViewCode = (snippet: Snippet) => {
    setViewingSnippet(snippet);
  };

  const handleCloseView = () => {
    setViewingSnippet(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/2" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Code className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No snippets yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first code snippet to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            className="overflow-hidden hover:shadow-md transition-all"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-primary">
                {snippet.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="mr-2">
                  {snippet.language}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              {snippet.description && (
                <p className="text-sm text-card-foreground mb-2">
                  {snippet.description.length > 100
                    ? `${snippet.description.substring(0, 100)}...`
                    : snippet.description}
                </p>
              )}

              <div className="overflow-hidden rounded">
                {snippet.content ? (
                  <CodeBlock
                    code={
                      snippet.content.substring(0, 150) +
                      (snippet.content.length > 150 ? "..." : "")
                    }
                    language={snippet.language || "javascript"}
                    maxHeight="120px"
                  />
                ) : (
                  <div className="bg-muted/50 rounded p-2 font-mono text-sm text-muted-foreground">
                    No content preview
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Heart
                  className={`h-4 w-4 mr-1 ${
                    snippet.liked ? "fill-destructive text-destructive" : ""
                  }`}
                />
                {snippet.liked ? "Liked" : "Like"}
              </Button>

              <div className="flex gap-2">
                {snippet.mediaUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Media
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => handleViewCode(snippet)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Code
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Full Code View Dialog */}
      <Dialog
        open={viewingSnippet !== null}
        onOpenChange={handleCloseView}
        className="dark"
      >
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col bg-sidebar text-sidebar-foreground border-border dark">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-primary">
              <span>{viewingSnippet?.title}</span>
              <Badge
                variant="outline"
                className="bg-sidebar-accent/10 text-primary"
              >
                {viewingSnippet?.language}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden my-4">
            {viewingSnippet && (
              <CodeBlock
                code={viewingSnippet.content}
                language={viewingSnippet.language || "javascript"}
                showLineNumbers={true}
                maxHeight="60vh"
                className="border border-border"
              />
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseView}
              className="bg-sidebar-accent/10 hover:bg-sidebar-accent/20 text-primary border-border"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SnippetList;
