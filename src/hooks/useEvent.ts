import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/event";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};
