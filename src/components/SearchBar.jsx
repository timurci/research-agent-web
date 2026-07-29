import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full max-w-2xl px-4 justify-center">
      <div className="flex w-full text-zinc-800 bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-600 p-5 rounded-4xl shadow-md shadow-black/10">
        <TextArea query={query} setQuery={setQuery} onSearch={onSearch} />
        <SearchButton query={query} onClick={onSearch} />
      </div>
    </div>
  );
}

function TextArea({ query, setQuery, onSearch }) {
  return (
    <textarea
      placeholder="Is social media use linked to anxiety in teenagers?"
      autoFocus
      rows={1}
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-md resize-none md:text-lg w-full flex-1 min-w-0 focus:outline-none"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSearch(e.target.value);
        }
      }}
    />
  );
}

function SearchButton({ query, onClick }) {
  return (
    <button className="cursor-pointer" onClick={() => onClick(query)}>
      <MagnifyingGlassIcon className="size-7" />
    </button>
  );
}

export default SearchBar;
