import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const MIN_QUERY_LENGTH = 5;

function SearchBar({ query, onQueryChange, onSearch }) {
  const [hint, setHint] = useState("");

  useEffect(() => {
    if (query.trim().length >= MIN_QUERY_LENGTH) {
      setHint("");
    }
  }, [query]);

  function submit(rawQuery) {
    const trimmed = rawQuery.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setHint(`Query must be at least ${MIN_QUERY_LENGTH} characters`);
      return;
    }
    setHint("");
    onSearch(trimmed);
  }

  return (
    <div className="flex w-full max-w-2xl px-4 flex-col justify-center">
      <div className="flex w-full text-zinc-800 bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-600 p-5 rounded-4xl shadow-md shadow-black/10">
        <TextArea
          query={query}
          setQuery={onQueryChange}
          onSubmit={() => submit(query)}
          onInvalid={setHint}
        />
        <SearchButton onClick={() => submit(query)} />
      </div>
      {hint && <p className="text-red-500 text-sm mt-2 px-2">{hint}</p>}
    </div>
  );
}

function TextArea({ query, setQuery, onSubmit, onInvalid }) {
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
      onChange={(e) => {
        setQuery(e.target.value);
        onInvalid("");
      }}
      className="text-md resize-none md:text-lg w-full flex-1 min-w-0 focus:outline-none"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
  );
}

function SearchButton({ onClick }) {
  return (
    <button className="cursor-pointer" onClick={onClick}>
      <MagnifyingGlassIcon className="size-7" />
    </button>
  );
}

export default SearchBar;
