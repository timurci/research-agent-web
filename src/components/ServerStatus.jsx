import { useEffect, useState } from "react";
import { getHealth } from "../api/client";

function ServerStatus() {
  const [status, setStatus] = useState("down");

  useEffect(() => {
    let cancelled = false;
    getHealth()
      .then((health) => {
        if (!cancelled && health.status === "ok") {
          setStatus("ok");
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const isUp = status === "ok";
  const dot = isUp ? "bg-green-500" : "bg-red-500";
  const text = isUp ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400";

  return (
    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm font-medium p-2 md:p-4">
      <span className={`size-2 rounded-full ${dot}`} />
      <span className={text}>
        Server status: {isUp ? "up" : "down"}
      </span>
      {!isUp && (
        <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500 font-normal">
          wakes up in ~1 min
        </span>
      )}
    </div>
  );
}

export default ServerStatus;
