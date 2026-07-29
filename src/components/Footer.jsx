import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const GITHUB_URL = "https://github.com/timurci/research-agent";
const FRONTEND_URL = "https://github.com/timurci/research-agent-web";

const PRIVACY_SECTIONS = [
  {
    title: "What we collect:",
    body: "The search queries you submit, the results our agent generates, the feedback you provide, and session metadata.",
  },
  {
    title: "Why:",
    body: "To operate the service and improve the tool's suggestions and ranking.",
  },
  {
    title: "Where it's stored:",
    body: "Collected via Opik and hosted on Comet Cloud.",
  },
  {
    title: "Retention:",
    body: "Retained indefinitely while the project is active.",
  },
  {
    title: "Public release:",
    body: "Data we collect may be published publicly under an open license. Our application does not intentionally log IP addresses, though our hosting providers may retain standard connection logs per their own policies. We apply no anonymization guardrails to submitted text, so please do not include personal information in your queries.",
  },
  {
    title: "Contact:",
    body: (
      <>
        To request removal of your data, email{" "}
        <a
          href="mailto:t.cakmakoglu@tutanota.com"
          className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          t.cakmakoglu@tutanota.com
        </a>
        .
      </>
    ),
  },
];

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!privacyOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setPrivacyOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [privacyOpen]);

  return (
    <footer className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 p-3 text-sm text-zinc-500 dark:text-zinc-400">
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
      >
        <GitHubIcon className="size-5" />
        Backend
      </a>
      <a
        href={FRONTEND_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
      >
        <GitHubIcon className="size-5" />
        Frontend
      </a>
      <button
        type="button"
        onClick={() => setPrivacyOpen(true)}
        className="hover:text-zinc-800 dark:hover:text-zinc-200 transition underline underline-offset-2"
      >
        Privacy
      </button>

      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Privacy notice"
            className="w-full max-w-lg rounded-4xl bg-zinc-100 p-6 shadow-lg shadow-black/20 dark:bg-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-50">
                Privacy
              </h2>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 transition"
              >
                <XMarkIcon className="size-5" />
              </button>
            </div>
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              {PRIVACY_SECTIONS.map((section) => (
                <section key={section.title}>
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
                    {section.title}
                  </h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
