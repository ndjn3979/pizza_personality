import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import resultsData from '../data/results.json';

const QuestionRenderer = () => {
  const questions = questionsData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const answersOnly = Object.keys(questions[currentQuestionIndex].options);

  const [myAnswerObject, setMyAnswerObject] = useState([]);
  const [myResults, setmyResults] = useState([]);
  
  const buttonFunction = (answer) => {
    if (currentQuestionIndex >= questions.length - 1) {
      return (
        <div className='end-message'>
          🎉 You've reached the end of the quiz!
        </div>
      );
    }
    const selectedResult = questions[currentQuestionIndex].options[answer];
    setmyResults((prevResults) => [...prevResults, ...selectedResult]);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className='question-card'>
      <div className='pizza-icon'>🍕</div>
      <h1>
        {currentQuestionIndex === questions.length - 1
          ? 'Your Pizza Personality Results 🍕'
          : 'Pizza Personality Test'}
      </h1>
      <div className='progress-bar'>
        <div className='progress' style={{ width: '25%' }}></div>
      </div>

      <div className='question-container'>
        <h2>Sample Question</h2>
        <div className='question-text'>
          {questions[currentQuestionIndex].question}
        </div>

        <div className='answer-options'>
          {answersOnly.map((answer, index) => (
            <button
              onClick={() => buttonFunction(answer)}
              key={index}
              className='answer-option'
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      {/* Temporary JSON output - remove in production */}
      <div className='json-output'>Debug: {JSON.stringify(answersOnly)}</div>
    </div>
  );
};

export default QuestionRenderer;
