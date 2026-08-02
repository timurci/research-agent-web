import { useEffect, useState } from "react";
import { getHealth } from "../api/client";

function ServerStatus({ backendUrl }) {
  const [status, setStatus] = useState("down");

  useEffect(() => {
    let cancelled = false;
    setStatus("down");
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
  }, [backendUrl]);

  const isUp = status === "ok";
  const dot = isUp ? "bg-green-500" : "bg-red-500";
  const text = isUp ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400";

  return (
    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm font-medium p-2 md:p-4">
      <span className={`size-2 rounded-full ${dot}`} />
      <span className={text}>{isUp ? "Connected" : "Disconnected"}</span>
    </div>
  );
}

export default ServerStatus;
