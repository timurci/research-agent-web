import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

function App() {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div className="flex flex-col h-full gap-20 justify-center">
        <h1 className="transition-colors text-center font-bold text-5xl md:text-6xl text-zinc-700 dark:text-zinc-50">
          Research Agent
        </h1>
        <SearchBar />
        <Results />
      </div>
    </div>
  );
}

export default App;
