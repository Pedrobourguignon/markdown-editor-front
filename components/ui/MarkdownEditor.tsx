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

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export const MarkDownEditor = () => {
  const [editor, setEditor] =
    useState<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const [content, setContent] = useState("");
  const [activeUsers, setActiveUsers] = useState(1);

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
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none h-[60vh] overflow-auto p-4 bg-white dark:bg-gray-800 rounded-md">
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
