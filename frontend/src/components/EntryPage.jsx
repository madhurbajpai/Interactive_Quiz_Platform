import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EntryPage.css";

const EntryPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleStartQuiz = () => {
    if (validateEmail(email)) {
      const userEmail = localStorage.getItem("userEmail");
      if (email === userEmail) {
        navigate("/analyze"); // navigate to analyze page
      } else {
        localStorage.setItem("userEmail", email); // Save email for tracking
        navigate("/quiz"); // navigate to quiz page
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleAnalyze = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (email === userEmail) {
      navigate("/analyze"); // navigate to analyze page
    } else {
      alert("You need to attempt a quiz first.");
    }
  };

  return (
    <div className="entry-page">
      <h2 className="heading">Enter Your Email to Start the Quiz</h2>

      <input
        className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div className="btn-holder">
        <button onClick={handleStartQuiz}>Start Quiz</button>
        <button onClick={handleAnalyze}>Analyze</button>
      </div>
    </div>
  );
};

export default EntryPage;
