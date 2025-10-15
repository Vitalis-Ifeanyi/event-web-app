import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";

const App = () => {
  return (
    <>
      {/* Persistent Header */}
      <Header />

      {/* Main content with padding to avoid header overlap */}
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
    </>
  );
};

export default App;
