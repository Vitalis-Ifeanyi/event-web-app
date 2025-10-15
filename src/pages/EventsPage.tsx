import { useState } from "react";
import { useEvents } from "../hooks/useEvent";
import EventCard from "../component/EventCard";
import SearchBar from "../component/SearchBar";
import { Loader2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  petsAllowed: boolean;
}

const EventsPage = () => {
  const { data: events = [], isLoading, isError } = useEvents();
  const [search, setSearch] = useState("");
  const [petsFilter, setPetsFilter] = useState<
    "all" | "allowed" | "notAllowed"
  >("all");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = events
    .filter((e: Event) =>
      (e.title || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((e: Event) => {
      if (petsFilter === "allowed") return e.petsAllowed;
      if (petsFilter === "notAllowed") return !e.petsAllowed;
      return true;
    });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/eventBg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {(isLoading || isError) && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl ${
              isLoading ? "h-screen" : "h-auto"
            }`}
          >
            {isLoading && (
              <div className="py-60 flex items-center justify-center gap-2">
                <Loader2 className="w-10 h-10 text-white animate-spin mb-4 text-center" />
                <p className="text-gray-200 text-lg text-center">
                  Loading events...
                </p>
              </div>
            )}
            {isError && (
              <p className="text-red-400 text-lg">
                Failed to load events. Please try again.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <SearchBar value={search} onChange={setSearch} />

          <select
            value={petsFilter}
            onChange={(e) =>
              setPetsFilter(e.target.value as "all" | "allowed" | "notAllowed")
            }
            className="p-2 rounded bg-black/30 text-gray-200 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="all">All Events</option>
            <option value="allowed">Pets Allowed</option>
            <option value="notAllowed">No Pets Allowed</option>
          </select>
        </div>

        {filtered.length === 0 && !isLoading && !isError ? (
          <p className="text-gray-400 text-center mt-10">
            No events found matching your search.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {paginated.map((event: Event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                petsAllowed={event.petsAllowed}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && !isLoading && !isError && (
          <div className="flex justify-center items-center gap-3 mt-10 text-gray-200">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="border border-gray-500 px-4 py-2 rounded disabled:opacity-40 hover:bg-gray-700 transition"
            >
              Prev
            </button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border border-gray-500 px-4 py-2 rounded disabled:opacity-40 hover:bg-gray-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventsPage;
