import React from "react";

import { getComments } from "../queries/get-comments";

import CommentItem from "./comment-item";

type CommentListProps = {
  ticketId: string;
};

const CommentList = async ({ ticketId }: CommentListProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="ml-8 space-y-2">
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default CommentList;
