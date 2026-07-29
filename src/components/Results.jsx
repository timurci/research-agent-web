import { useEffect, useState } from "react";

function Results({ loading, results }) {
  return (
    <div className="flex justify-center">
      {loading ? <LoadingStatus /> : <SearchResults results={results} />}{" "}
    </div>
  );
}

function LoadingStatus() {
  const words = [
    "Searching",
    "Exploring",
    "Thinking",
    "Discovering",
    "Synthesizing",
    "Cooking",
    "Baking",
    "Analyzing",
  ];
  const [word, setWord] = useState(words[0]);
  const [dots, setDots] = useState("");

  function getNextWord(currentWord) {
    let next;
    do {
      next = words[Math.floor(Math.random() * words.length)];
    } while (next === currentWord);
    return next;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWord((prev) => getNextWord(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 600);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="text-zinc-800 dark:text-zinc-50 text-lg">
      {word}
      {dots}
    </div>
  );
}

function ResultFeedback({ results }) {
  return (
    <div>
      <p>Was this result helpful?</p>
      <button>Yes</button>
      <button>No</button>
      // send feedback to backend
    </div>
  );
}

function SearchResults({ results }) {
  return <div>{results}</div>;
}

export default Results;
