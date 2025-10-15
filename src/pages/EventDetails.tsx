import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEventById } from "../api/event";
import { ArrowLeft, Calendar, MapPin, Loader2 } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id!),
  });

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/eventBg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-3xl mx-auto p-6 flex flex-col items-center">
        {(isLoading || isError) && (
          <div className="flex flex-col items-center justify-center mt-32 bg-black/50 backdrop-blur-sm rounded-2xl p-8 w-full text-center">
            {isLoading && (
              <>
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-4" />
                <p className="text-gray-200 text-lg">Loading event...</p>
              </>
            )}
            {isError && (
              <p className="text-red-400 text-lg">
                Failed to load event. Please try again.
              </p>
            )}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <Link
              to="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </Link>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg w-full">
              <h1 className="text-3xl font-bold text-white mb-4">
                {data.title}
              </h1>

              <div className="flex items-center gap-3 text-gray-200 mb-2">
                <Calendar className="w-5 h-5 text-blue-300" /> {data.date}
              </div>

              <div className="flex items-center gap-3 text-gray-200 mb-2">
                <MapPin className="w-5 h-5 text-blue-300" /> {data.location}
              </div>

              {data.petsAllowed && (
                <p className="text-green-400 mt-2 text-sm">🐾 Pets Allowed</p>
              )}

              <p className="mt-4 text-gray-200">{data.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default EventDetails;
