import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import EventValidationPage from "./pages/EventValidationPage/EventValidationPage";

function App() {
  return (
    <>
      <Header />
      <EventValidationPage />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
