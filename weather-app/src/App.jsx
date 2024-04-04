import ListCity from "./components/WeatherPage";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bg from "./Background.png";
function App() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        className="text-white"
      >
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/weather/:city" element={<ListCity />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
