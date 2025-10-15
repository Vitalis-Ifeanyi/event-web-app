import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  petsAllowed: boolean;
}

const EventCard=({
  id,
  title,
  date,
  location,
  petsAllowed,
}: Event)=> {
  return (
    <Link
      to={`/event/${id}`}
      className="block p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg 
                 hover:shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
    >
      <h2 className="font-semibold text-lg text-white mb-2">{title}</h2>

      <div className="flex items-center text-sm text-gray-200 gap-2 mb-1">
        <Calendar className="w-4 h-4 text-blue-300" /> {date}
      </div>

      <div className="flex items-center text-sm text-gray-200 gap-2">
        <MapPin className="w-4 h-4 text-blue-300" /> {location}
      </div>

      {petsAllowed && (
        <p className="text-green-400 text-sm mt-3">🐾 Pets Allowed</p>
      )}
    </Link>
  );
}
export default EventCard