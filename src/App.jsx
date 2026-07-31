import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { LoadingStatus, SearchResults } from "./components/Results";
import { useState } from "react";
import Error from "./components/Error";
import Footer from "./components/Footer";
import { searchResearch } from "./api/client";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const exampleQueries = [
    "RAG vs fine-tuning for LLMs",
    "Graph neural networks for drug discovery",
    "Retinal detachment surgery outcomes",
  ];

  async function handleSearch(query) {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const results = await searchResearch(query);
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
          <div className="mb-20 text-center">
            <h1 className="font-display font-extralight tracking-tight text-5xl md:text-6xl text-zinc-700 dark:text-zinc-50">
              Research Agent
            </h1>
            <p className="mt-3 text-lg text-zinc-400 dark:text-zinc-500">
              Enhance your literature search
            </p>
          </div>
          <div className="mb-8 w-full flex justify-center">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
            />
          </div>
          {!loading && !results && (
            <div className="mb-8 flex flex-wrap justify-center gap-2 px-4">
              {exampleQueries.map((example) => (
                <button
                  key={example}
                  onClick={() => setQuery(example)}
                  className="cursor-pointer text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-600 px-3 py-1 rounded-full hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-500 transition"
                >
                  {example}
                </button>
              ))}
            </div>
          )}

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
