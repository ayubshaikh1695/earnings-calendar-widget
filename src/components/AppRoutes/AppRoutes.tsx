import { Routes, Route } from "react-router-dom";
import App from "../../App";
import CalendarPage from "../../components/CalendarPage/CalendarPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
};

export default AppRoutes;
