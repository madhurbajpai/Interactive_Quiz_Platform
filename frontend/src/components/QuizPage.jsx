import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import questionsData from "../assets/questions.json";
import "./QuizPage.css";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(30);
  const navigate = useNavigate();

  // Fetch Questions
  useEffect(() => {
    setQuestions(questionsData);
  }, [navigate]);

  useEffect(() => {
    if (questionTimer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setQuestionTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [questionTimer]);

  if (!questions.length) return <p>Loading...</p>;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer) => {
    const isCorrect =
      currentQuestion.type === "mcq"
        ? answer === currentQuestion.answer
        : parseInt(answer) === parseInt(currentQuestion.answer);

    setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect");

    if (isCorrect) setScore(score + 1);

    setResults([
      ...results,
      { question: currentQuestion.question, userAnswer: answer, isCorrect },
    ]);

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer("");
      setQuestionTimer(30);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    const prevAttempts = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const newAttempt = { score, results };

    // Save new attempt
    localStorage.setItem("quizHistory", JSON.stringify([...prevAttempts, newAttempt]));

    navigate("/analyze");
  };

  return (
    <div className="quiz-container">
      <div className="timer">Time Left: {questionTimer}s</div>

      <div className="question-section">
        <h3 className="question-number">Question {currentIndex + 1} of {questions.length}</h3>
        <h2 className="question-text">{currentQuestion.question}</h2>

        {currentQuestion.type === "mcq" ? (
          <div className="options">
            {currentQuestion.options.map((opt, idx) => (
              <button key={idx} className="option-btn" onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="input-section">
            <input
              type="number"
              className="input-box"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <button className="submit-btn" onClick={() => handleAnswer(selectedAnswer)}>
              Submit
            </button>
          </div>
        )}
      </div>

      {feedback && <p className="feedback">{feedback}</p>}

      <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
