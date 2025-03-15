import * as React from "react";
import { TagProps } from "@/types/businesscard";

export const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <div className="gap-1 self-stretch px-3 pt-0.5 pb-1 my-auto border border-black p-2 rounded-xl text-xs">
      {text}
    </div>
  );
};

export default Tag;
