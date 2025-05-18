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
import { Heart, Code, ExternalLink } from "lucide-react";

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

            <div className="bg-muted/50 rounded p-2 font-mono text-sm text-muted-foreground overflow-hidden">
              {snippet.content
                ? snippet.content.substring(0, 80) + "..."
                : "No content preview"}
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
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Heart
                className={`h-4 w-4 mr-1 ${
                  snippet.liked ? "fill-destructive text-destructive" : ""
                }`}
              />
              {snippet.liked ? "Liked" : "Like"}
            </Button>

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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SnippetList;
