import React, { cloneElement } from "react";

type PlaceholderProps = {
  icon: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement;
  text: string;
};

const Placeholder = ({
  icon,
  text,
  button = <div className="size-9" />,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-2 self-center">
      {cloneElement(icon, {
        className: "size-14 mx-auto md:size-20",
      })}
      <p className="md:text-xl">{text}</p>
      {button}
    </div>
  );
};

export default Placeholder;
