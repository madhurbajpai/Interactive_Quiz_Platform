import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AnalyzePage.css";

const AnalyzePage = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setQuizHistory(storedHistory);
  }, []);

  const handleReattempt = () => {
    navigate("/quiz");
  };

  return (
    <div className="analyze-page">
      <h2 className="heading">Quiz Analysis</h2>

      {quizHistory.length > 0 ? (
        <>
          <label htmlFor="attempt-select" className="label" ><strong>Select Attempt:</strong></label>
          <select className="select"
            id="attempt-select"
            value={currentAttemptIndex}
            onChange={(e) => setCurrentAttemptIndex(Number(e.target.value))}
          >
            {quizHistory.map((_, idx) => (
              <option key={idx} value={idx}>
                Attempt {idx + 1}
              </option>
            ))}
          </select>

          <h3 className="head3">Attempt {currentAttemptIndex + 1}</h3>
          <p className="score">Score: {quizHistory[currentAttemptIndex].score} / {quizHistory[currentAttemptIndex].results.length}</p>

          <ul className="results">
            {quizHistory[currentAttemptIndex].results.map((q, idx) => (
              <li key={idx}>
                <strong>Q. {idx+1} {q.question}</strong>
                <br />
                Your Answer: {q.userAnswer ? q.userAnswer : "Not Answered ❌"}  
                {q.isCorrect ? " ✅" : " ❌"}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="err">No attempts found.</p>
      )}

      <button onClick={handleReattempt} style={{ marginTop: "20px" }}>
        Reattempt Quiz
      </button>
    </div>
  );
};

export default AnalyzePage;
