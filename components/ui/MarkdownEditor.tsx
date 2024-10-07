"use client";

import { LuRedo, LuUndo } from "react-icons/lu";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { FiUser } from "react-icons/fi";

export const MarkDownEditor = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Collaborative Markdown Editor</span>
            <div className="flex items-center space-x-2 text-sm font-normal">
              <FiUser className="h-5 w-5" />
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
                <PrimaryButton size="sm" variant="outline">
                  <LuUndo className="h-4 w-4 mr-1" />
                  Undo
                </PrimaryButton>
                <PrimaryButton size="sm" variant="outline">
                  <LuRedo className="h-4 w-4 mr-1" />
                  Redo
                </PrimaryButton>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>Markdown input</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none h-[60vh] overflow-auto p-4 bg-white dark:bg-gray-800 rounded-md">
              Content preview
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
