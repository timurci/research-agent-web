import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_URL_KEY } from "../api/client";

const DEBOUNCE_MS = 500;

function normalizeUrl(url) {
  return url.trim().replace(/\/+$/, "");
}

function ServerSettings({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const firstRun = useRef(true);

  const apply = useCallback(
    (raw) => {
      const normalized = normalizeUrl(raw);
      if (normalized) {
        localStorage.setItem(BASE_URL_KEY, normalized);
      } else {
        localStorage.removeItem(BASE_URL_KEY);
      }
      onChange(normalized);
    },
    [onChange],
  );

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const timer = setTimeout(() => apply(draft), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [draft, apply]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function toggle() {
    if (!open) {
      setDraft(value);
    }
    setOpen(!open);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label="Backend settings"
        aria-expanded={open}
        className="transition cursor-pointer p-1 md:p-1.5 rounded-4xl text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700"
      >
        <Cog6ToothIcon className="size-7" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 z-20 w-80 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-2xl shadow-lg p-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                apply(draft);
              }}
            >
              <input
                autoFocus
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="http://127.0.0.1:8000"
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </form>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Connect to your own server (optional)
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ServerSettings;
