import ServerStatus from "./ServerStatus";
import ThemePicker from "./ThemePicker";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 md:p-4">
      <ServerStatus />
      <ThemePicker />
    </nav>
  );
}

export default Navbar;
