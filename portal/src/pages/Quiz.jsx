import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import axios from "axios";
import { Button } from "../ui/Button";
import "./Quiz.css";

const path = import.meta.env.VITE_API_URL;

export default function SecurityQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch quiz
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`${path}/api/quiz/get`);
        console.log("Quiz data:", res.data);

        if (res.data && res.data.length > 0) {
          const quiz = res.data[0];
          setQuestions(quiz.questions || []);
          setTimeLeft((quiz.duration || 20) * 60);
        } else {
          setQuestions([]);
          setTimeLeft(0);
        }
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setQuestions([]);
        setTimeLeft(0);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !finished && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft, finished, questions]);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    let sc = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) sc++;
    });

    setScore(sc);
    setFinished(true);

    // ✅ Save result in DB
    try {
      const userId = localStorage.getItem("userId");
      console.log(userId);
     

      const res = await axios.post(`${path}/api/result/add`, {
        userId,
        obtainNumber: sc,
        totalNumber: questions.length,
      },{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Result saved:", res.data);
    } catch (err) {
      console.error("Failed to save result:", err);
    }
  };

  const handleApplyCertificate = async () => {
    try {
           const userId = localStorage.getItem("userId");
      console.log(userId);
      if (!userId) {
        console.warn("No userId found in localStorage!");
        alert("User not logged in. Please log in to apply for a certificate.");
        return;
      }
      const res = await axios.post(
        `${path}/api/certificate/apply`,
        { userId },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setApplied(true);
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (loading) return <p className="text-center mt-5">Loading quiz...</p>;
  if (questions.length === 0)
    return <p className="text-center mt-5">No quiz available.</p>;

  return (
    <motion.div
      className="d-flex flex-column align-items-center justify-content-center p-4"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      {!finished ? (
        <div className="w-100" style={{ maxWidth: "700px" }}>
          {/* Timer */}
          <div className="text-end mb-3">
            <strong>
              Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
            </strong>
          </div>

          {/* Question */}
          <div className="bg-white p-4 rounded shadow-sm mb-3">
            <h5>
              Q{current + 1}. {questions[current]?.question || ""}
            </h5>
            <div className="d-flex flex-column gap-2 mt-3">
              {questions[current]?.options?.map((opt, i) => (
                <Button
                  key={i}
                  variant={answers[current] === opt ? "primary" : "outline"}
                  className="text-start"
                  onClick={() => handleAnswer(opt)}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Next / Submit */}
          <div className="text-end">
            <Button onClick={handleNext}>
              {current === questions.length - 1 ? "Submit Quiz" : "Next"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          {score / questions.length >= 0.8 ? (
            <>
              <Confetti />
              <h2 className="text-success fw-bold">🎉 Excellent!</h2>
              <p>
                You scored {score} out of {questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </p>

              {!applied ? (
                <Button variant="primary" onClick={handleApplyCertificate}>
                  Apply for Certificate
                </Button>
              ) : (
                <p className="text-success mt-3">
                  Thank you for applying. You will receive an email soon.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-danger fw-bold">😢 Bad Luck!</h2>
              <p>
                You scored {score} out of {questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </p>
              <p>Try again next time!</p>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
