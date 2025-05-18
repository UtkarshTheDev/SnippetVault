import React, { useState, useRef } from "react";
import SnippetList from "./SnippetList";
import SnippetEditor from "./SnippetEditor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Code, Plus, Clock, Tag, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Layout: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const snippetListRef = useRef<any>(null);

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
          <TabsList className="w-full bg-sidebar-accent/10">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1">
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground"
            >
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground"
            >
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </Button>
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            <div className="text-sm text-sidebar-foreground/70 text-center py-4">
              No favorites yet
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground"
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
          <Command className="rounded-lg w-72">
            <CommandInput placeholder="Search snippets..." />
            <CommandList className="hidden" />
          </Command>

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
                <SnippetList key={refreshKey} ref={snippetListRef} />
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
    </div>
  );
};

export default Layout;
