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
      // Daniel - adding image tag for the results image + inline styling
      // Made "description" and "traits" letters smaller via inline styling
      <div className='end-message' style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '10px',
        boxSizing: 'border-box'
      }}>
        {result.image && (
          <img 
            src={result.image} 
            alt={result.name} 
            style={{
              maxWidth: '400px',
              maxHeight: '300px',
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '10px',
              margin: '10px auto',
              display: 'block',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
            }}
          />
        )}
        <h3 style={{
          marginTop: '5px'
        }}>You are {result.name}!</h3>
        <p style={{
          fontSize: '0.9rem',
          lineHeight: '1.4',
          color: '#34495e',
          maxWidth: '600px',
          margin: '15px auto 6px auto',
          padding: '0 10px',
          whiteSpace: 'pre-wrap'
        }}>{result.description}</p>
        <h5 style={{
          fontSize: '1rem',
          marginTop: '16px',
          marginBottom: '4px'
        }}>Matching Traits:</h5>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {result.traits.map((trait, index) => (
            <li key={index} style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              padding: '3px 15px',
              borderRadius: '20px',
              display: 'inline-block',
              margin: '0px 6px',
              fontSize: '0.85rem'
            }}>{trait}</li>
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
