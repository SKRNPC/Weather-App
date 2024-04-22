import ListCity from "./components/WeatherPage";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bg from "./images/Background.png";
function App() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
    </div>
  );
}

export default App;
