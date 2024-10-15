"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("keyword"));
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/?keyword=${searchValue}&page=1`);
    }
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          value={searchValue || ""}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <svg
          className="absolute w-5 h-5 text-gray-500 right-4 top-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Search;
