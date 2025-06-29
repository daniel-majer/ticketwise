import React from "react";

import { Button } from "./ui/button";

type Pagination = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: Pagination;
  onChange: (pagination: Pagination) => void;
  metaData: { count: number; hasNext: boolean };
};

const Pagination = ({
  pagination,
  onChange,
  metaData: { count, hasNext },
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  const handleNextPage = () => {
    onChange({ ...pagination, page: pagination.page + 1 });
  };
  const handlePrevPage = () => {
    onChange({ ...pagination, page: pagination.page - 1 });
  };

  const nextBtn = (
    <Button
      variant="outline"
      size="sm"
      onClick={handleNextPage}
      disabled={!hasNext}
    >
      Next
    </Button>
  );
  const prevBtn = (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrevPage}
      disabled={pagination.page < 1}
    >
      Next
    </Button>
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground text-sm">{label}</p>
      <div className="flex gap-x-2">
        {prevBtn}
        {nextBtn}
      </div>
    </div>
  );
};

export default Pagination;
