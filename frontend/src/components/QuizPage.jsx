import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(30);
  const [quizTimer, setQuizTimer] = useState(1800); // 30 minutes
  const navigate = useNavigate();

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        navigate("/"); // Redirect to entry page if no email found
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/questions");
        setQuestions(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchQuestions();
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

  useEffect(() => {
    if (quizTimer === 0) {
      handleSubmitQuiz();
    }
    const interval = setInterval(() => {
      setQuizTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [quizTimer]);

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
    <div>
      <h2>{currentQuestion.question}</h2>
      <p>Time Left: {questionTimer}s | Quiz Time Left: {Math.floor(quizTimer / 60)}:{quizTimer % 60}</p>

      {currentQuestion.type === "mcq" ? (
        currentQuestion.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))
      ) : (
        <input
          type="number"
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
      )}

      {currentQuestion.type === "integer" && (
        <button onClick={() => handleAnswer(selectedAnswer)}>Submit</button>
      )}

      {feedback && <p>{feedback}</p>}

      <button onClick={handleSubmitQuiz} style={{ marginTop: "20px" }}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
