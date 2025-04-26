import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import resultsData from '../data/results.json';
/*This function component is responsible for rendering the 
quiz questions and handling user interactions.*/
const QuestionRenderer = () => {
  const questions = questionsData; //this line makes the quiz questions data accessible within the component.

  const results = resultsData; // this line makes the results data accessible within the component.

  /*This declares a state variable named currentQuestionIndex. 
  It holds the index of the question that is currently being displayed to the user*/
  /*This also declares a state setter function named setCurrentQuestionIndex. Its 
  purpose is to update the value of the currentQuestionIndex state variable. 
  When you call setCurrentQuestionIndex with a new value */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //initial value set to array index 0.
  const [myResults, setmyResults] = useState([]);
  
  if (currentQuestionIndex >= questions.length) {
    console.log('hitting the max out logic');
    return (
      <div className='end-message'>
        🎉 You've reached the end of the quiz!
        <pre>{JSON.stringify(myResults, null, 2)}</pre>{' '}
        {/* Optional debug output */}
      </div>
    );
  }

  const answersOnly = Object.keys(questions[currentQuestionIndex].options); //This line grabs an array of answer choices for the current question.

  const quizOverFunction = (answer) => {
    console.log('hitting here');
    const selectedResult = questions[currentQuestionIndex].options[answer]; //This line retrieves the result associated with the user's selected answer for the current question
    setmyResults((prevResults) => [...prevResults, ...selectedResult]);
    console.log('myResults', myResults);
    console.log('selectedResult', selectedResult);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); //This line updates the currentQuestionIndex state, moving to the next question.
  };

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
        <h2>Sample Question</h2>
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
      

      {/* Temporary JSON output - remove in production */}
      Progress: {currentQuestionIndex + 1}/{questions.length}
    </div>
  );
};

// we need to return the values for the keys 'name' and 'description'
// from the results data array based on the users accumalated answers in
//the state variable myResults.

export default QuestionRenderer;
