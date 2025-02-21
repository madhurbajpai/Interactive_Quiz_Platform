import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EntryPage.css";

const EntryPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    
    navigate("/quiz"); // navigate to quiz page
  };

  const handleAnalyze = () => {
    const quiz = localStorage.getItem("quizHistory");
    if (!quiz) {
      //checking whether the quiz is attempted or not at least once
      alert("You need to attempt a quiz first.");
    } else {
      navigate("/analyze"); // navigate to analyze page
    }
  };

  return (
    <div className="entry-page">
      <h2 className="heading">Interactive Quiz Platform</h2>
      <div className="btn-holder">
        <button onClick={handleStartQuiz}>Start Quiz</button>
        <button onClick={handleAnalyze}>Analyze</button>
      </div>
    </div>
  );
};

export default EntryPage;
