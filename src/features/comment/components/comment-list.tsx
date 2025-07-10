"use client";

import React from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";

import CommentCreateForm from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import CommentItem from "./comment-item";

import CardWrapper from "@/components/card-custom";
import { Button } from "@/components/ui/button";
import { PaginatedData } from "@/types/pagination";

export type CommentListProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const CommentList = ({ ticketId, paginatedComments }: CommentListProps) => {
  const queryKey = ["comments", ticketId];

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getComments(ticketId, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage, allPages) => {
        const totalFetchedComments = allPages.flatMap((p) => p.list).length;
        return lastPage.metadata.hasNextPage ? totalFetchedComments : undefined;
      },
      // (lastPage) =>
      //   lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();

  const handlerMoreComments = () => fetchNextPage();
  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });
  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  // const [comments, setComments] = useState(paginatedComments.list);
  // const [metadata, setMetadata] = useState(paginatedComments.metadata);

  // const handlerMoreComments = async () => {
  // const paginateComments = await getComments(ticketId, comments.length);
  // const morePaginateComments = paginateComments.list;
  // setComments([...comments, ...morePaginateComments]);
  // setMetadata(paginateComments.metadata);
  // };

  // const handleDeleteComment = (id: string) => {
  // setComments((prevComment) => prevComment.filter((c) => c.id !== id));
  // };

  // const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
  // if (!comment) return;
  // setComments((prevComment) => [comment, ...prevComment]);
  //}

  return (
    <>
      <CardWrapper
        title="Create comment"
        desc="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="ml-8 space-y-2">
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={[
                ...(comment.isOwner
                  ? [
                      <CommentDeleteButton
                        key={1}
                        id={comment.id}
                        onDeleteComment={handleDeleteComment}
                      />,
                    ]
                  : []),
              ]}
            />
          );
        })}
      </div>
      {/* {metadata.hasNextPage ? (
        <div className="ml-8 flex">
          <Button
            className="flex-1 cursor-pointer"
            variant="ghost"
            onClick={handlerMoreComments}
          >
            More comments
          </Button>
        </div>
      ) : null} */}

      {hasNextPage ? (
        <div className="ml-8 flex">
          <Button
            className="flex-1 cursor-pointer"
            variant="ghost"
            onClick={handlerMoreComments}
            disabled={isFetchingNextPage}
          >
            More comments
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default CommentList;
