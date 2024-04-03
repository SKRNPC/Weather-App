import ListCity from "./assets/components/ListCity";
import MainPage from "./assets/components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="  bg-lime-800">
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
