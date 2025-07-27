import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        newestOnTop={true}
      />
    </>
  );
}

export default App;
