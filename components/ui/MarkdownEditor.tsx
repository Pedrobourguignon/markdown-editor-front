"use client";

import { LuRedo, LuUndo } from "react-icons/lu";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import type { editor as MonacoEditor } from "monaco-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { CiClock2 } from "react-icons/ci";
import { ScrollArea } from "./ScrollArea";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface ChangeHistoryItem {
  user: string;
  timestamp: Date;
  change: string;
}

export const MarkDownEditor = () => {
  const [editor, setEditor] =
    useState<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const [content, setContent] = useState("");
  const [activeUsers, setActiveUsers] = useState(1);
  const [changeHistory, setChangeHistory] = useState<ChangeHistoryItem[]>([]);

  const handleEditorDidMount = (
    editorInstance: MonacoEditor.IStandaloneCodeEditor
  ) => {
    setEditor(editorInstance);
    editorInstance.onDidChangeModelContent(() => {
      setContent(editorInstance.getValue());
    });
  };

  const handleUndo = () => {
    if (editor) {
      editor.trigger("keyboard", "undo", null);
    }
  };

  const handleRedo = () => {
    if (editor) {
      editor.trigger("keyboard", "redo", null);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Collaborative Markdown Editor</span>
            <div className="flex items-center space-x-2 text-sm font-normal">
              <FiUser className="h-5 w-5" />
              <span>
                {activeUsers} active user{activeUsers !== 1 ? "s" : ""}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Editor</span>
              <div className="space-x-2">
                <PrimaryButton size="sm" variant="outline" onClick={handleUndo}>
                  <LuUndo className="h-4 w-4 mr-1" />
                  Undo
                </PrimaryButton>
                <PrimaryButton size="sm" variant="outline" onClick={handleRedo}>
                  <LuRedo className="h-4 w-4 mr-1" />
                  Redo
                </PrimaryButton>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="60vh"
              defaultLanguage="markdown"
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                lineNumbers: "off",
                wordWrap: "on",
                theme: "vs-dark",
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <Tabs defaultValue="preview">
            <TabsList className="w-full">
              <TabsTrigger value="preview" className="w-full">
                Preview
              </TabsTrigger>
              <TabsTrigger value="history" className="w-full">
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <CardContent>
                <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                  <div className="prose dark:prose-invert">
                    <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </TabsContent>
            <TabsContent value="history">
              <CardContent>
                <ScrollArea className="h-[60vh] w-full rounded-md border">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Change History
                    </h3>
                    {changeHistory.map((item, index) => (
                      <div
                        key={index}
                        className="mb-3 pb-3 border-b last:border-b-0"
                      >
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                          <span className="flex items-center">
                            <FiUser className="h-4 w-4 mr-1" />
                            {item.user}
                          </span>
                          <span className="flex items-center">
                            <CiClock2 className="h-4 w-4 mr-1" />
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{item.change}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
