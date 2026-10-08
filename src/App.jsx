import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";


function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [predictionData, setPredictionData] = useState(null);


  function changePage(page) {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }


  function handlePrediction(data) {
    setPredictionData(data);
    changePage("prediction");
  }


  function handlePredictAgain() {
    setPredictionData(null);
    changePage("home");
  }


  return (
    <div className="app">

      <Navbar
        currentPage={currentPage}
        onNavigate={changePage}
      />


      {currentPage === "home" && (
        <Home
          onPredict={handlePrediction}
        />
      )}


      {currentPage === "prediction" && (
        <Prediction
          predictionData={predictionData}
          onPredictAgain={handlePredictAgain}
        />
      )}


      {currentPage === "about" && (
        <About />
      )}


      {currentPage === "how-it-works" && (
        <HowItWorks />
      )}

    </div>
  );
}


export default App;