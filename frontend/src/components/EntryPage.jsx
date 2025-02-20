import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EntryPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleStartQuiz = () => {
    if (validateEmail(email)) {
      localStorage.setItem("userEmail", email); // Save email for tracking
      navigate("/quiz"); // navigate to quiz page
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
      <h2>Enter Your Email to Start the Quiz</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleStartQuiz}>Start Quiz</button>
      <button onClick={handleAnalyze}>Analyze</button>
    </div>
  );
};

export default EntryPage;
