import React from "react";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import { useState } from "react";

function PhotoSearch({ handleSearch }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <div className="lg:flex grid gap-5 justify-between items-center p-5 top-0 w-full mx-auto fixed bg-white drop-shadow">
      <div className="lg:text-3xl text-2xl cursor-pointer logo">
        <Link href="/">PhotoSurf</Link>
      </div>
      <div className="border-b shadow lg:w-[540px] md:w-[400px] w-[320px] rounded-full lg:p-[3px] flex items-center justify-center">
        <span className="text-xl p-3">
          <CgSearch />
        </span>
        <input
          type="search"
          className="lg:w-[580px] md:w-[400px] w-[272px] h-[30px] outline-none text-black"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  );
}

export default PhotoSearch;
