import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

useEffect(() => {
    const fetchQuestions = async () => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            navigate("/"); // Redirect to entry page if no email found
            return;
        }

        try {
            // console.log("fetching questions")
            const response = await axios.get("http://localhost:5000/questions");
            // console.log(response)
            setQuestions(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    fetchQuestions();
}, [navigate]);

  if (!questions.length) return <p>Loading...</p>;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer) => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentQuestion.type === "mcq") {
      setFeedback(answer === currentQuestion.answer ? "✅ Correct!" : "❌ Incorrect");
    } else {
      setFeedback(parseInt(answer) === parseInt(currentQuestion.answer) ? "✅ Correct!" : "❌ Incorrect");
    }
  };

  return (
    <div>
      <h2>{currentQuestion.question}</h2>

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
    </div>
  );
};

export default QuizPage;
