import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendFeedback } from "../api/client";
import { normalizeDoi } from "../api/schemas";

export function LoadingStatus() {
  const words = [
    "Searching",
    "Exploring",
    "Thinking",
    "Discovering",
    "Synthesizing",
    "Reviewing",
    "Ranking",
    "Analyzing",
  ];
  const [word, setWord] = useState(words[0]);
  const [dots, setDots] = useState("");
  const [seconds, setSeconds] = useState(0);

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 600);

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(secondInterval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-zinc-800 dark:text-zinc-50 text-lg">
        {word}
        {dots}
      </div>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 font-normal">
        Expected runtime: ~2 minutes · {minutes}:{remainingSeconds} elapsed
      </p>
    </div>
  );
}

function ResultFeedback({ traceId }) {
  const [selected, setSelected] = useState(null);

  function handleVote(choice) {
    if (selected === choice) {
      return;
    }
    setSelected(choice);
    sendFeedback({ traceId, useful: choice === "yes" }).catch(() => {});
  }

  const accent = "bg-amber-500 text-white shadow-md shadow-black/10";
  const plain = "bg-zinc-300 text-zinc-900 hover:bg-zinc-400";

  return (
    <div className="flex flex-col justify-center text-zinc-800 dark:text-zinc-50 gap-2">
      <div className="flex gap-2 justify-center">
        <p className="p-2">Was this result helpful?</p>
        <button
          onClick={() => handleVote("yes")}
          className={`cursor-pointer font-bold p-2 min-w-16 rounded-4xl transition ${selected === "yes" ? accent : plain}`}
        >
          Yes
        </button>
        <button
          onClick={() => handleVote("no")}
          className={`cursor-pointer font-bold p-2 min-w-16 rounded-4xl transition ${selected === "no" ? accent : plain}`}
        >
          No
        </button>
      </div>
    </div>
  );
}

function downloadPapersAsJson(papers) {
  const blob = new Blob([JSON.stringify(papers, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "research-papers.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function SearchResults({ results }) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="pb-6">
        <ResultFeedback traceId={results.traceId} />
      </div>
      <SuggestionCard suggestion={results.suggestion} />
      <div className="flex justify-center">
        <button
          onClick={() => downloadPapersAsJson(results.papers)}
          className="cursor-pointer inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          <ArrowDownTrayIcon className="size-4" />
          Download results (JSON)
        </button>
      </div>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 font-normal text-center">
        Found {results.papers.length} papers
      </p>
      <div className="max-h-[60vh] overflow-y-auto overscroll-contain pr-2 [mask-image:linear-gradient(to_bottom,black_97%,transparent)]">
        <ol className="flex flex-col gap-3 list-none p-0">
          {results.papers.map((result, index) => (
            <PaperCard key={index} paper={result} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function SuggestionCard({ suggestion }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-start gap-3 bg-amber-50 dark:bg-zinc-700 text-zinc-800 dark:text-amber-50 p-4 md:p-5 rounded-4xl shadow-md shadow-black/10 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <SparklesIcon className="size-6 mt-0.5 shrink-0 text-amber-500 dark:text-amber-400" />
        <div>
          <p className="font-semibold mb-1">Suggested approach</p>
          <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert prose-a:text-amber-600 prose-a:font-medium dark:prose-a:text-amber-400">
            {suggestion}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function PaperCard({ paper }) {
  return (
    <li className="bg-zinc-200 dark:bg-zinc-700 p-4 md:p-5 rounded-4xl shadow-md shadow-black/10 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <h2 className="font-bold text-lg text-zinc-800 dark:text-zinc-50 mb-1">
        {paper.title}
      </h2>
      {paper.authors && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
          {paper.authors.join(", ")}
        </p>
      )}
      <p className="text-zinc-700 dark:text-zinc-300 mb-3">{paper.abstract}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {paper.isOpenAccess && (
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-medium">
            Open Access
          </span>
        )}
        {paper.publicationYear && (
          <span className="text-xs bg-zinc-200 dark:bg-zinc-600 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
            {paper.publicationYear}
          </span>
        )}
        {paper.citationCount != null && (
          <span className="text-xs bg-zinc-200 dark:bg-zinc-600 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
            {paper.citationCount} citations
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={paper.url}
          className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium hover:underline"
        >
          Read full paper
          <ArrowTopRightOnSquareIcon className="size-4" />
        </a>
        {paper.pdfUrl && (
          <a
            href={paper.pdfUrl}
            className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium hover:underline"
          >
            Download PDF
            <ArrowTopRightOnSquareIcon className="size-4" />
          </a>
        )}
        {paper.doi && (
          <a
            href={`https://doi.org/${normalizeDoi(paper.doi)}`}
            className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium hover:underline"
          >
            DOI: {paper.doi}
            <ArrowTopRightOnSquareIcon className="size-4" />
          </a>
        )}
      </div>
    </li>
  );
}
