import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundpage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const NETFLIX_LOGO_URL =
  "https://www.freepnglogos.com/uploads/netflix-logo-0.png";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <img
            src={NETFLIX_LOGO_URL}
            alt="Netflix Logo"
            className="netflix-logo"
          />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="movies">
              <Route index element={<MoviePage />} />
              <Route path=":id" element={<MovieDetailPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
