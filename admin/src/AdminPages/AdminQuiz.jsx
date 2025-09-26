import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Trash2, PlusCircle } from "lucide-react";
import '../styles/AdminQuiz.css';

export default function AdminQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    duration: 20,
    questions: [{ question: "", options: ["", ""], answer: "" }],
  });
  const [error, setError] = useState("");

  const path = import.meta.env.VITE_API_URL;

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${path}/quiz/get`, { withCredentials: true });
      setQuizzes(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleChange = (e, qIndex, optIndex) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    if (name === "title" || name === "duration") {
      newForm[name] = value;
    } else {
      const questions = [...newForm.questions];
      if (name === "question") {
        questions[qIndex].question = value;
      } else if (name === "answer") {
        questions[qIndex].answer = value;
      } else if (name === "option") {
        questions[qIndex].options[optIndex] = value;
      }
      newForm.questions = questions;
    }
    setForm(newForm);
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [...form.questions, { question: "", options: ["", ""], answer: "" }],
    });
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[qIndex].options.push("");
    setForm({ ...form, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    for (let q of form.questions) {
      if (q.options.length < 2) {
        setError("Each question must have at least 2 options.");
        return;
      }
      if (!q.answer) {
        setError("Each question must have a correct answer.");
        return;
      }
    }

    try {
      await axios.post(`${path}/quiz/add`, form, { withCredentials: true });
      fetchQuizzes();
      setShowModal(false);
      setForm({ title: "", duration: 20, questions: [{ question: "", options: ["", ""], answer: "" }] });
    } catch (err) {
      console.error(err);
      setError("Failed to save quiz. Please check backend.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`${path}/quiz/delete/${id}`);
        fetchQuizzes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="quiz-page-container">
      <header className="quiz-header">
        <h1>Quiz Management</h1>
        {quizzes.length === 0 && (
          <button className="btn-primary-theme" onClick={() => setShowModal(true)}>
            <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
            Add Quiz
          </button>
        )}
      </header>

      <div className="quiz-table-container">
        <table className="quiz-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, idx) => (
              <tr key={quiz._id}>
                <td>{idx + 1}</td>
                <td>{quiz.title}</td>
                <td>{quiz.duration} mins</td>
                <td>{quiz.questions.length}</td>
                <td>
                  <button className="btn-action delete" onClick={() => handleDelete(quiz._id)}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Add New Quiz</h2>
              <button className="btn-action" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSubmit}>
              {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
              
              <div className="form-group">
                <label htmlFor="title">Quiz Title</label>
                <input type="text" id="title" name="title" value={form.title} onChange={handleChange} className="input-theme" required />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (minutes)</label>
                <input type="number" id="duration" name="duration" value={form.duration} onChange={handleChange} className="input-theme" required />
              </div>

              {form.questions.map((q, qIndex) => (
                <div key={qIndex} className="question-block">
                  <div className="form-group">
                    <label>Question {qIndex + 1}</label>
                    <input type="text" name="question" value={q.question} onChange={(e) => handleChange(e, qIndex)} className="input-theme" required />
                  </div>

                  <div className="form-group">
                    <label>Options</label>
                    {q.options.map((opt, optIndex) => (
                      <input key={optIndex} type="text" name="option" value={opt} onChange={(e) => handleChange(e, qIndex, optIndex)} className="input-theme" style={{ marginBottom: '0.5rem' }} required />
                    ))}
                    <button type="button" className="btn-secondary-theme" onClick={() => addOption(qIndex)} style={{ marginTop: '0.5rem' }}>
                      + Add Option
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Correct Answer</label>
                    <input type="text" name="answer" value={q.answer} onChange={(e) => handleChange(e, qIndex)} className="input-theme" required />
                  </div>
                </div>
              ))}
              
              <button type="button" className="btn-secondary-theme" onClick={addQuestion}>
                + Add Question
              </button>

              <div className="modal-actions">
                <button type="button" className="btn-secondary-theme" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary-theme">Save Quiz</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}