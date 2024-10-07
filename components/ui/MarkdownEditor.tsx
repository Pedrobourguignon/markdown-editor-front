"use client";

import { PrimaryButton } from "./Buttons/PrimaryButton";
import { Card } from "./Card";

export const MarkDownEditor = () => {
  return (
    <div className="container mx-auto p-4">
      <PrimaryButton size="sm">Click here</PrimaryButton>
      <Card className="mb-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Collaborative Markdown Editor</h1>
        </div>
      </Card>
    </div>
  );
};
