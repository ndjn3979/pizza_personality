import React, { useState, useEffect } from 'react';
import Questions from './components/Question';
import Results from './components/Results';
import calculateResult from './components/Results';
import questionsData from './data/questions.json';
import resultsData from './data/results.json';
import './styles.css';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userTraits, setUserTraits] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = (selectedTraits) => {
    setUserTraits(prevTraits => [...prevTraits, ...selectedTraits]);

    if (currentQuestionIndex >= questionsData.length - 1) {
      setQuizComplete(true); // ✅ triggers useEffect below
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // 🔁 Run result calculation only *after* quiz is complete
  useEffect(() => {
    if (quizComplete && userTraits.length > 0 && !result) {
      const finalResult = calculateResult(userTraits, resultsData);
      setResult(finalResult);
    }
  }, [quizComplete, userTraits, result]);

  return (
    <div className="app-container">
      <main>
        {!quizComplete ? (
          <Questions
            question={questionsData[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questionsData.length}
          />
        ) : (
          <Results result={result} />
        )}
      </main>
    </div>
  );
};

export default App;
