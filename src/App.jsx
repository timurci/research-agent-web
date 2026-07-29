import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { LoadingStatus, SearchResults } from "./components/Results";
import { useState } from "react";
import Error from "./components/Error";
import Footer from "./components/Footer";
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
    <div className="relative flex min-h-dvh flex-col">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Navbar />
      </div>
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center items-center px-4 pt-20 pb-10">
          <h1 className="text-center font-bold text-5xl md:text-6xl text-zinc-700 dark:text-zinc-50 mb-20">
            Research Agent
          </h1>
          <div className="mb-8 w-full flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div
            className="grid w-full transition-all duration-500 ease-out"
            style={{
              gridTemplateRows: loading && !results ? "1fr" : "0fr",
              opacity: loading && !results ? 1 : 0,
            }}
          >
            <div className="overflow-hidden flex justify-center">
              {loading && !results && <LoadingStatus />}
            </div>
          </div>

          <div
            className="grid w-full transition-all duration-500 ease-out"
            style={{
              gridTemplateRows: results ? "1fr" : "0fr",
              opacity: results ? 1 : 0,
            }}
          >
            <div className="overflow-hidden flex justify-center">
              {results && <SearchResults results={results} />}
            </div>
          </div>

          {error && <Error message={error} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
