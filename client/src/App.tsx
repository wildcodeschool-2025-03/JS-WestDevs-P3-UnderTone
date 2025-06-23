import { Link, Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Login</Link>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default App;
