import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="flex w-fit text-zinc-800 bg-zinc-300 p-5 rounded-4xl shadow-sm shadow-black/20">
        <TextArea />
        <SearchButton />
      </div>
    </div>
  );
}

function TextArea() {
  return (
    <textarea
      placeholder="Is social media use linked to anxiety in teenagers?"
      autoFocus
      rows={1}
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
      className="text-md resize-none md:text-lg min-w-lg sm:min-w-xl md:min-w-2xl lg:min-w-4xl focus:outline-none"
    />
  );
}

function SearchButton() {
  return (
    <button className="cursor-pointer">
      <MagnifyingGlassIcon className="size-7" />
    </button>
  );
}

export default SearchBar;
