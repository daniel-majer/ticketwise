import React from "react";

import { CommentWithMetadata } from "../types";

import CommentCreateForm from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import CommentItem from "./comment-item";

import CardWrapper from "@/components/card-custom";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/isOwner";

export type CommentListProps = {
  ticketId: string;
  comments: CommentWithMetadata[];
};

const CommentList = async ({ ticketId, comments }: CommentListProps) => {
  const { user } = await getAuthOrRedirect();

  return (
    <>
      <CardWrapper
        title="Create comment"
        desc="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="ml-8 space-y-2">
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={[
                isOwner(user, comment)
                  ? [<CommentDeleteButton key={1} id={comment.id} />]
                  : [],
              ]}
            />
          );
        })}
      </div>
    </>
  );
};

export default CommentList;
