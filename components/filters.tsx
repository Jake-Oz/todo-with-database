"use client";
import React from "react";
import { filterType } from "@/lib/types";

const Filters = ({
  filter,
  setFilter,
}: {
  filter: filterType;
  setFilter: React.Dispatch<React.SetStateAction<filterType>>;
}) => {
  return (
    <div className="flex flex-row justify-center items-center h-full gap-4 text-sm text-neutral-dark-grayish-blue dark:text-dark-theme-very-dark-grayish-blue">
      <button
        onClick={() => setFilter("all")}
        className={`${
          filter === "all"
            ? "text-primary-bright-blue font-bold"
            : "hover:text-neutral-very-dark-grayish-blue dark:hover:text-neutral-light-grayish-blue"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`${
          filter === "active"
            ? "text-primary-bright-blue font-bold"
            : "hover:text-neutral-very-dark-grayish-blue dark:hover:text-neutral-light-grayish-blue"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`${
          filter === "completed"
            ? "text-primary-bright-blue font-bold"
            : "hover:text-neutral-very-dark-grayish-blue dark:hover:text-neutral-light-grayish-blue"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default Filters;
