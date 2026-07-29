import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import { useState } from "react";
import Error from "./components/Error";
import { mockResults } from "./utils/mock";

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(query) {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const results = await mockResults(query);
      setResults(results);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <div className="flex flex-col transition-all duration-1000 h-full gap-20 justify-center">
        <h1 className="text-center font-bold text-5xl md:text-6xl text-zinc-700 dark:text-zinc-50">
          Research Agent
        </h1>
        <SearchBar onSearch={handleSearch} />
        {error ? (
          <Error message={error} />
        ) : (
          <Results loading={loading} results={results} />
        )}
      </div>
    </div>
  );
}

export default App;
