import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import resultsData from '../data/results.json';
import calculateResult from './Results'; // Calculates the best pizza match based on traits

const QuestionRenderer = () => {
  // Load the questions and result templates from JSON files
  const questions = questionsData;
  const results = resultsData;

  // Keeps track of which question the user is on
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Accumulates all traits selected by the user across answers
  const [myResults, setMyResults] = useState([]);

  // Flags when the quiz is complete
  const [quizComplete, setQuizComplete] = useState(false);

  // Holds the final pizza result object (name, description, traits)
  const [result, setResult] = useState(null);

  // 🔁 When the quiz is done, use the collected traits to find the best pizza match
  useEffect(() => {
    if (quizComplete && myResults.length > 0) {
      const finalResult = calculateResult(myResults, results);
      setResult(finalResult);
    }
  }, [quizComplete, myResults, results]);

  // This function is called whenever the user clicks an answer
  const quizOverFunction = (answer) => {
    // Get the traits for the selected answer
    const selectedResult = questions[currentQuestionIndex].options[answer];

    // Add the traits to the accumulated results
    setMyResults((prevResults) => [...prevResults, ...selectedResult]);

    // If it's the last question, finish the quiz
    if (currentQuestionIndex >= questions.length - 1) {
      setQuizComplete(true);
    } else {
      // Otherwise, move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // ✅ Once the quiz is complete and result is ready, show it to the user
  if (quizComplete && result) {
    return (
      <div className='end-message'>
        🎉 You've reached the end of the quiz!
        <h2>Your Pizza Personality: {result.name}</h2>
        <p>{result.description}</p>
        <h4>Matching Traits:</h4>
        <ul>
          {result.traits.map((trait, index) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Prevent rendering errors if current question is undefined
  if (!questions[currentQuestionIndex]) return null;

  // Extract just the answer labels (e.g., ["Yes", "No", "Maybe"])
  const answersOnly = Object.keys(questions[currentQuestionIndex].options);

  // 👇 This is the normal quiz question screen
  return (
    <div className='question-card'>
      <div className='pizza-icon'>🍕</div>
      <h1>
        {currentQuestionIndex === questions.length
          ? 'Your Pizza Personality Results 🍕'
          : 'Pizza Personality Test'}
      </h1>
      {/* fixed progress bar thin thin */}
      <div className="progress-bar">
                <div 
                    className="progress" 
                    style={{ 
                        width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` 
                    }} 
                />
            </div>
            
      <div className='question-container'>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <div className='question-text'>
          {questions[currentQuestionIndex].question}
        </div>

        <div className='answer-options'>
          {answersOnly.map((answer, index) => (
            <button
              onClick={() => quizOverFunction(answer)}
              key={index}
              className='answer-option'
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionRenderer;
