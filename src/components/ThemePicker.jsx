import { MoonIcon } from "@heroicons/react/24/solid";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function ThemePicker() {
  const [theme, setTheme] = useState(localStorage.theme || null);
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, [theme]);

  function handleTheme(theme) {
    if (["light", "dark"].includes(theme)) {
      localStorage.theme = theme;
    } else {
      localStorage.removeItem("theme");
    }
    setTheme(theme);
  }

  return (
    <div className="flex w-fit gap-1 p-1 md:p-1.5 text-zinc-800 bg-zinc-400 inset-shadow-black/20 inset-shadow-sm rounded-4xl">
      <ThemeButton
        value={<SunIcon className="size-7" />}
        active={theme === "light"}
        onClick={() => handleTheme("light")}
      />
      <ThemeButton
        value={<MoonIcon className="size-7" />}
        active={theme === "dark"}
        onClick={() => handleTheme("dark")}
      />
      <ThemeButton
        value={<ComputerDesktopIcon className="size-7" />}
        active={theme === null}
        onClick={() => handleTheme(null)}
      />
    </div>
  );
}

function ThemeButton({ value, active, onClick }) {
  const accent = active
    ? "bg-zinc-100 shadow-sm shadow-black/20"
    : "hover:bg-zinc-300";
  return (
    <button
      className={`transition cursor-pointer p-1 md:p-1.5 rounded-4xl ${accent}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default ThemePicker;
