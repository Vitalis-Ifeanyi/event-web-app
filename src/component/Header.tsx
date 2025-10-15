import { Link } from "react-router-dom";

const Header=()=> {
  return (
    <header className="w-full bg-black/70 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-400 transition"
        >
          EVENTS
        </Link>
      </div>
    </header>
  );
}
export default Header