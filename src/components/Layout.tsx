import React, { useState, useRef, useEffect } from "react";
import SnippetList from "./SnippetList";
import SnippetEditor from "./SnippetEditor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import {
  Code,
  Plus,
  Clock,
  Tag,
  Settings,
  Search,
  Filter,
  Heart,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  loadSnippets,
  type SearchFilters,
  type Snippet,
} from "@/lib/snippetStorage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { CodeBlock } from "@/components/ui/code-block";

const Layout: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const snippetListRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [favoriteSnippets, setFavoriteSnippets] = useState<Snippet[]>([]);
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null);

  // Fetch available languages, tags, and favorite snippets
  useEffect(() => {
    const fetchData = async () => {
      const snippets = await loadSnippets();

      // Extract unique languages
      const languages = [
        ...new Set(snippets.map((snippet) => snippet.language)),
      ].filter(Boolean);
      setAvailableLanguages(languages);

      // Extract unique tags
      const tags = [
        ...new Set(snippets.flatMap((snippet) => snippet.tags)),
      ].filter(Boolean);
      setAvailableTags(tags);

      // Get favorite snippets
      const favorites = snippets.filter((snippet) => snippet.liked);
      setFavoriteSnippets(favorites);
    };

    fetchData();
  }, [refreshKey]);

  // Debounce search query to avoid too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update filters when tab changes
  useEffect(() => {
    if (activeTab === "favorites") {
      setFilters((prev) => ({ ...prev, onlyLiked: true }));
    } else {
      setFilters((prev) => ({ ...prev, onlyLiked: false }));
    }
  }, [activeTab]);

  // Update search filters when search query changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery: debouncedSearchQuery }));
  }, [debouncedSearchQuery]);

  const handleCreateSnippetClick = () => {
    setIsEditing(true);
  };

  const handleSaveSnippet = () => {
    setIsEditing(false);
    // Refresh the snippet list
    setRefreshKey((prev) => prev + 1);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleLanguageFilterChange = (language: string) => {
    setFilters((prev) => ({
      ...prev,
      language: language === "all" ? undefined : language,
    }));
  };

  const handleTagFilterChange = (tag: string) => {
    setFilters((prev) => ({ ...prev, tag: tag === "all" ? undefined : tag }));
  };

  const handleClearFilters = () => {
    setFilters({ onlyLiked: activeTab === "favorites" });
    setSearchQuery("");
  };

  const handleViewSnippet = (snippet: Snippet) => {
    setViewingSnippet(snippet);
  };

  const handleCloseSnippetView = () => {
    setViewingSnippet(null);
  };

  return (
    <div className="flex w-full h-full min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar p-4 border-r border-border flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-bold font-sans text-sidebar-foreground">
            SnippetVault
          </h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full !bg-sidebar-accent/10 !p-1 !rounded-md !border !border-border">
            <TabsTrigger
              value="all"
              className="flex-1 !data-[state=active]:bg-sidebar-accent/30 !data-[state=active]:text-primary !hover:bg-sidebar-accent/20 !transition-all !duration-200 !text-sidebar-foreground"
              style={
                {
                  "--tw-ring-color": "transparent",
                  "--tw-ring-shadow": "none",
                  "--tw-shadow": "none",
                } as React.CSSProperties
              }
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex-1 !data-[state=active]:bg-sidebar-accent/30 !data-[state=active]:text-primary !hover:bg-sidebar-accent/20 !transition-all !duration-200 !text-sidebar-foreground"
              style={
                {
                  "--tw-ring-color": "transparent",
                  "--tw-ring-shadow": "none",
                  "--tw-shadow": "none",
                } as React.CSSProperties
              }
            >
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start !text-sidebar-foreground !hover:bg-sidebar-accent/20 !hover:text-primary !transition-all !duration-200"
              style={
                {
                  "--tw-ring-color": "transparent",
                  "--tw-ring-shadow": "none",
                  "--tw-shadow": "none",
                } as React.CSSProperties
              }
            >
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start !text-sidebar-foreground !hover:bg-sidebar-accent/20 !hover:text-primary !transition-all !duration-200"
              style={
                {
                  "--tw-ring-color": "transparent",
                  "--tw-ring-shadow": "none",
                  "--tw-shadow": "none",
                } as React.CSSProperties
              }
            >
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </Button>
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            {favoriteSnippets.length > 0 ? (
              <div className="space-y-1">
                {favoriteSnippets.map((snippet) => (
                  <Button
                    key={snippet.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start !text-sidebar-foreground !hover:bg-sidebar-accent/20 !hover:text-primary !transition-all !duration-200 truncate group"
                    onClick={() => handleViewSnippet(snippet)}
                    style={
                      {
                        "--tw-ring-color": "transparent",
                        "--tw-ring-shadow": "none",
                        "--tw-shadow": "none",
                      } as React.CSSProperties
                    }
                  >
                    <Heart className="h-4 w-4 mr-2 fill-destructive text-destructive !group-hover:scale-110 !transition-transform" />
                    <span className="truncate">{snippet.title}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-sm text-sidebar-foreground/70 text-center py-4">
                No favorites yet
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start !text-sidebar-foreground !hover:bg-sidebar-accent/20 !hover:text-primary !transition-all !duration-200"
            style={
              {
                "--tw-ring-color": "transparent",
                "--tw-ring-shadow": "none",
                "--tw-shadow": "none",
              } as React.CSSProperties
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="bg-sidebar border-b border-border p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search snippets..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7 w-7 px-0"
                  onClick={() => setSearchQuery("")}
                >
                  <span className="sr-only">Clear</span>
                  <span className="text-muted-foreground">×</span>
                </Button>
              )}
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {(filters.language || filters.tag) && (
                    <Badge
                      variant="secondary"
                      className="ml-1 rounded-sm px-1 font-normal"
                    >
                      {(filters.language ? 1 : 0) + (filters.tag ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-72 !bg-sidebar !text-sidebar-foreground !border-border dark"
                align="end"
                style={{
                  backgroundColor: "var(--sidebar)",
                  color: "var(--sidebar-foreground)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="space-y-4">
                  <h4 className="font-medium leading-none text-primary">
                    Filters
                  </h4>
                  <Separator className="bg-border" />

                  <div className="space-y-2">
                    <Label
                      htmlFor="language-filter"
                      className="text-sidebar-foreground"
                    >
                      Language
                    </Label>
                    <Select
                      value={filters.language || "all"}
                      onValueChange={handleLanguageFilterChange}
                    >
                      <SelectTrigger
                        id="language-filter"
                        className="bg-sidebar-accent/10 border-border text-sidebar-foreground"
                      >
                        <SelectValue placeholder="All languages" />
                      </SelectTrigger>
                      <SelectContent
                        className="!bg-sidebar !border-border !text-sidebar-foreground !rounded-md !shadow-md dark"
                        style={{
                          backgroundColor: "var(--sidebar)",
                          color: "var(--sidebar-foreground)",
                          borderColor: "var(--border)",
                        }}
                      >
                        <SelectItem
                          value="all"
                          className="!text-sidebar-foreground hover:!bg-sidebar-accent/20 hover:!text-primary focus:!bg-sidebar-accent/20 focus:!text-primary"
                        >
                          All languages
                        </SelectItem>
                        {availableLanguages.map((lang) => (
                          <SelectItem
                            key={lang}
                            value={lang}
                            className="!text-sidebar-foreground hover:!bg-sidebar-accent/20 hover:!text-primary focus:!bg-sidebar-accent/20 focus:!text-primary"
                          >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {availableTags.length > 0 && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="tag-filter"
                        className="text-sidebar-foreground"
                      >
                        Tag
                      </Label>
                      <Select
                        value={filters.tag || "all"}
                        onValueChange={handleTagFilterChange}
                      >
                        <SelectTrigger
                          id="tag-filter"
                          className="bg-sidebar-accent/10 border-border text-sidebar-foreground"
                        >
                          <SelectValue placeholder="All tags" />
                        </SelectTrigger>
                        <SelectContent
                          className="!bg-sidebar !border-border !text-sidebar-foreground !rounded-md !shadow-md dark"
                          style={{
                            backgroundColor: "var(--sidebar)",
                            color: "var(--sidebar-foreground)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <SelectItem
                            value="all"
                            className="!text-sidebar-foreground hover:!bg-sidebar-accent/20 hover:!text-primary focus:!bg-sidebar-accent/20 focus:!text-primary"
                          >
                            All tags
                          </SelectItem>
                          {availableTags.map((tag) => (
                            <SelectItem
                              key={tag}
                              value={tag}
                              className="!text-sidebar-foreground hover:!bg-sidebar-accent/20 hover:!text-primary focus:!bg-sidebar-accent/20 focus:!text-primary"
                            >
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-sidebar-accent/10 hover:bg-sidebar-accent/20 text-primary border-border"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">
                UV
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Area */}
        <ScrollArea className="flex-1 h-full bg-background">
          <main className="flex-1 relative min-h-full bg-background">
            {/* Main content goes here (snippet list or editor) */}
            {isEditing ? (
              <div className="p-6">
                <SnippetEditor
                  onSave={handleSaveSnippet}
                  onCancel={handleCancelEdit}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-background">
                <SnippetList
                  key={refreshKey}
                  ref={snippetListRef}
                  filters={filters}
                />
              </div>
            )}

            {/* Floating Action Button */}
            {!isEditing && (
              <Button
                size="icon"
                className="fixed bottom-8 right-8 rounded-full shadow-lg h-12 w-12"
                onClick={handleCreateSnippetClick}
                aria-label="Create new snippet"
              >
                <Plus className="h-6 w-6" />
              </Button>
            )}
          </main>
        </ScrollArea>
      </div>

      {/* Snippet View Dialog */}
      <Dialog
        open={viewingSnippet !== null}
        onOpenChange={handleCloseSnippetView}
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
              onClick={handleCloseSnippetView}
              className="bg-sidebar-accent/10 hover:bg-sidebar-accent/20 text-primary border-border"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
