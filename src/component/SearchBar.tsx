import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div
      className="flex items-center w-full max-w-md px-4 py-2 rounded-2xl
                    bg-white/10 backdrop-blur-md border border-white/20
                    focus-within:ring-2 focus-within:ring-blue-400
                    transition-all duration-300"
    >
      <Search className="w-5 h-5 text-gray-200 mr-3" />
      <input
        type="search"
        value={value}
        placeholder="Search events..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-gray-200 placeholder-gray-400 outline-none"
      />
    </div>
  );
}
