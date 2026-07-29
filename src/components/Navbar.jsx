import ThemePicker from "./ThemePicker";

function Navbar() {
  return (
    <nav className="flex justify-end p-2 md:p-4">
      <ThemePicker />
    </nav>
  );
}

export default Navbar;
