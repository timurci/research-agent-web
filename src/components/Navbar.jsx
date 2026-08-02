import { useState } from "react";
import { BASE_URL_KEY } from "../api/client";
import ServerStatus from "./ServerStatus";
import ServerSettings from "./ServerSettings";
import ThemePicker from "./ThemePicker";

function Navbar() {
  const [backendUrl, setBackendUrl] = useState(
    () => localStorage.getItem(BASE_URL_KEY) || "",
  );

  return (
    <nav className="flex justify-between items-center p-2 md:p-4">
      <div className="flex items-center gap-2">
        <ServerSettings value={backendUrl} onChange={setBackendUrl} />
        <ServerStatus backendUrl={backendUrl} />
      </div>
      <ThemePicker />
    </nav>
  );
}

export default Navbar;
