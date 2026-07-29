function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="flex w-fit text-zinc-800 bg-zinc-300 p-5 rounded-4xl shadow-sm shadow-black/20">
        <input
          type="text"
          placeholder="Search..."
          autoFocus
          className="text-md md:text-xl lg:text-2xl min-w-sm md:min-w-2xl lg:min-w-4xl focus:outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
