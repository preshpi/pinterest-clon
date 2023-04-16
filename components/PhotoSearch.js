import React from "react";
import { CgSearch } from "react-icons/cg";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";


function PhotoSearch({ onSearch }) {
  const [query, setQuery] = useState("");
 
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center h-[52px] w-[95%] mx-auto">
        <div className="text-3xl cursor-pointer">
          <Link href="/">imageSurf</Link>
        </div>
        <div className="bg-gray-200 lg:w-[940px] md:w-[400px] rounded-full lg:p-[7px] flex items-center justify-center">
          <span className="text-xl p-3">
            <CgSearch />
          </span>
          <input
            type="search"
            className="lg:w-[880px] md:w-[400px] h-[38px] outline-none text-black"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <div className="flex gap-5 items-center justify-center ">
          <div className="h-12 w-12 hover:bg-gray-100 grid place-items-center justify-center rounded-[50px] group transition-all duration-300 cursor-pointer">
            <button className="bg-gray-100 rounded-[20px] h-8 w-8 ring-black focus:ring-[1.5px] cursor-pointer">
              I
            </button>
            <p className="absolute text-white bg-black p-1 text-[11px] rounded-lg group-hover:opacity-100 opacity-0  group-hover:translate-y-12">
              Your profile
            </p>
          </div>

          <span className="hover:bg-gray-100 h-6 w-6 rounded-[20px] flex items-center justify-center group">
            <BsChevronDown className="cursor-pointer hover:bg-gray-100" />
            <p className="absolute text-white w-16 h-16 text-[11px] bg-black p-1 rounded-lg group-hover:opacity-100 opacity-0  group-hover:translate-y-14">
              Accounts and more options
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
export default PhotoSearch;
