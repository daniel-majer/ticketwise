import React from "react";

import { CommentWithMetadata } from "../types";

import { Card } from "@/components/ui/card";

type CommentItemProps = {
  comment: CommentWithMetadata;
};
const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card className="flex flex-1 gap-y-1 rounded-md p-4">
      <div className="text-muted-foreground flex justify-between text-xs">
        <p>{comment.user?.username ?? "Deleted user"}</p>
        <p>{comment.createdAt.toLocaleString()}</p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
    </Card>
  );
};

export default CommentItem;
