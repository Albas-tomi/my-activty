import React, { useState } from "react";

type TabsListProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const TabsList = ({ category, setCategory }: TabsListProps) => {
  return (
    <div role="tablist" className="tabs tabs-lifted px-2">
      <a
        role="tab"
        onClick={() => setCategory("all")}
        className={`tab ${category === "all" && "tab-active text-purple-500"} `}
      >
        All
      </a>
      <a
        role="tab"
        // onClick={() => setCategory("important")}
        className={`tab disabled cursor-not-allowed ${
          category === "important" && "tab-active text-purple-500"
        } `}
      >
        Important
      </a>
      <a
        role="tab"
        // onClick={() => setCategory("notes")}
        className={`tab disabled cursor-not-allowed ${
          category === "notes" && "tab-active text-purple-500"
        } `}
      >
        Notes
      </a>
      <a
        role="tab"
        // onClick={() => setCategory("links")}
        className={`tab disabled cursor-not-allowed ${
          category === "links" && "tab-active text-purple-500"
        } `}
      >
        Links
      </a>
    </div>
  );
};

export default TabsList;
