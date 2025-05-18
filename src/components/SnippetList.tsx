import React, { useEffect, useState } from "react";
import {
  loadSnippets,
  deleteSnippet,
  toggleSnippetLike,
  type Snippet,
} from "../lib/snippetStorage";
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
import {
  Heart,
  Code,
  ExternalLink,
  Eye,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const SnippetList = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null);
  const [deleteConfirmSnippet, setDeleteConfirmSnippet] =
    useState<Snippet | null>(null);

  const fetchSnippets = async () => {
    setLoading(true);
    const storedSnippets = await loadSnippets();
    setSnippets(storedSnippets);
    setLoading(false);
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleViewCode = (snippet: Snippet) => {
    setViewingSnippet(snippet);
  };

  const handleCloseView = () => {
    setViewingSnippet(null);
  };

  const handleDeleteClick = (snippet: Snippet) => {
    setDeleteConfirmSnippet(snippet);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmSnippet) {
      const success = await deleteSnippet(deleteConfirmSnippet.id);
      if (success) {
        toast.error(`"${deleteConfirmSnippet.title}" has been deleted.`);
        await fetchSnippets();
      } else {
        toast.error("Failed to delete snippet. Please try again.");
      }
      setDeleteConfirmSnippet(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmSnippet(null);
  };

  const handleLikeToggle = async (snippet: Snippet) => {
    const success = await toggleSnippetLike(snippet.id);
    if (success) {
      await fetchSnippets();
    } else {
      toast.error("Failed to update like status. Please try again.");
    }
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
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            className="overflow-hidden hover:shadow-md transition-all"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-primary">
                  {snippet.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewCode(snippet)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Code
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLikeToggle(snippet)}>
                      <Heart
                        className={`mr-2 h-4 w-4 ${
                          snippet.liked
                            ? "fill-destructive text-destructive"
                            : ""
                        }`}
                      />
                      {snippet.liked ? "Unlike" : "Like"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(snippet)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="mr-2">
                  {snippet.language}
                </Badge>
                {snippet.createdAt && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </span>
                )}
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
                onClick={() => handleLikeToggle(snippet)}
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
                    onClick={() => window.open(snippet.mediaUrl, "_blank")}
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
      <Dialog open={viewingSnippet !== null} onOpenChange={handleCloseView}>
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmSnippet !== null}
        onOpenChange={(open) => !open && setDeleteConfirmSnippet(null)}
      >
        <DialogContent className="bg-sidebar text-sidebar-foreground border-border dark">
          <DialogHeader>
            <DialogTitle className="text-primary">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-sidebar-foreground">
              Are you sure you want to delete "{deleteConfirmSnippet?.title}"?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              className="bg-sidebar-accent/10 hover:bg-sidebar-accent/20 text-primary border-border"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

SnippetList.displayName = "SnippetList";

export default SnippetList;
