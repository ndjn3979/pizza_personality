// main React component, which is started up by index.js

import React, { useState } from "react";
import Questions from "./components/Question"; // Michal
import Results from './components/Results'; // Michal
import questionsData from './data/questions.json';
import resultsData from './data/results.json';
import './styles.css'; // Thin Thin

const App = () => {
  // State to track current question index, initialized to 0 (first question)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State to track accumulated personality traits
  // i.e. { "Reliable": 1, "Bold": 2, "Chill" : 3, ... }
  const [traitCounts, setTraitCounts] = useState({});
  
  // State to track if quiz is complete
  // Used with handleAnswer function
  const [quizComplete, setQuizComplete] = useState(false);
  
  // State to track final personality result
  const [result, setResult] = useState(null);

  /*
  - Calculate the personality result based on trait counts

  - Each answer has associated traits
  - We count how many times each trait appears across all answers
  - Each pizza has its own set of traits
  - We give each pizza a score based on how many of the user's trait counts match the pizza's traits
  - The pizza with the highest score becomes the result
  */

  const calculateResult = (traits) => {
    // Find pizza with best trait match
    let bestMatch = null;
    let bestMatchScore = 0;

    resultsData.forEach(pizza => {
      let score = 0;
      pizza.traits.forEach(trait => {
        score += traits[trait] || 0;
      });

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = pizza;
      }
    });
    return bestMatch;
  };

  // Handle user's answer selection
  const handleAnswer = (questionId, selectedOption) => {
    // Update trait counts
    const updatedTraits = { ...traitCounts };
    selectedOption.traits.forEach(trait => {
      updatedTraits[trait] = (updatedTraits[trait] || 0) + 1;
      // When a user picks an answer, we add 1 to the count of each trait in that answer.
    });
    setTraitCounts(updatedTraits);
    
    // If this was the last question, calculate result
    if (currentQuestionIndex >= questionsData.length - 1) {
      const pizzaResult = calculateResult(updatedTraits);
      setResult(pizzaResult);
      setQuizComplete(true);
    } else {
      // Otherwise, move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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
          <Results 
            result={result}
          />
        )}
      </main>
    </div>
  );
};

export default App;