import React, { useState, useEffect, useRef } from 'react';
import questionsData from '../data/questions.json';
import resultsData from '../data/results.json';
import calculateResult from './Results'; // Calculates the best pizza match based on traits
import html2canvas from 'html2canvas'; // library for capturing DOM elements

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

  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);

  // for use with html2canvas
  const [isSharing, setIsSharing] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState('');
  const resultRef = useRef(null);

  // 🔁 When the quiz is done, use the collected traits to find the best pizza match
  useEffect(() => {
    if (quizComplete && myResults.length > 0) {
      const finalResult = calculateResult(myResults, results);
      setResult(finalResult);
    }
  }, [quizComplete, myResults, results]);

  // Initialize pizza particles
  useEffect(() => {
    const pizzaIcons = ['🍕', '🍅', '🧀', '🌶️', '🍄', '🥓'];
    const newParticles = Array(15).fill().map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      icon: pizzaIcons[Math.floor(Math.random() * pizzaIcons.length)],
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  // Initialize confetti when quiz completes
  useEffect(() => {
    if (quizComplete && result) {
      const colors = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6'];
      const newConfetti = Array(50).fill().map(() => ({
        id: Math.random().toString(36).substr(2, 9),
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      }));
      setConfetti(newConfetti);
    }
  }, [quizComplete, result]);

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

 // Function to restart the quiz
 const restartQuiz = () => {
  setCurrentQuestionIndex(0);
  setMyResults([]);
  setQuizComplete(false);
  setResult(null);
  setConfetti([]); // Clear confetti
};

// Function to handle sharing results
  const handleShare = async () => {
    // Set sharing state to true to show loading indicator
    setIsSharing(true);
    
    try {
      // Make sure the ref exists before trying to clone
      if (!resultRef.current) {
        throw new Error("Cannot find the results container to create image");
      }

      // Create a clone of the results div without the restart button
      const resultsDiv = resultRef.current;
      const clone = resultsDiv.cloneNode(true);
      
      // Find the buttons container in the clone
      const buttonsContainer = clone.querySelector(".buttons-container");
      if (buttonsContainer) {
        // Remove the container entirely (we'll recreate a cleaner version)
        buttonsContainer.remove();
      }
      
      // Add padding to the bottom of the clone to make it look balanced
      clone.style.paddingBottom = '20px';
    
      // Set a fixed height that doesn't include space for buttons
      clone.style.height = 'auto';
      clone.style.minHeight = '0';

      // Temporarily append the clone to the body for html2canvas to capture it
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      // Use html2canvas to capture the clone as an image
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true // For images to render properly
      });
      
      // Convert the canvas to a data URL and set it in state
      const imageUrl = canvas.toDataURL('image/png');
      setShareImageUrl(imageUrl);
      
      // Remove the clone from the DOM
      document.body.removeChild(clone);
      
      // Try to use the Web Share API if available
      if (navigator.share) {
        // Create a blob from the data URL
        const blob = await (await fetch(imageUrl)).blob();
        
        // Create a file from the blob
        const file = new File([blob], 'pizza-personality-result.png', { type: 'image/png' });
        
        // Share the file using the Web Share API
        await navigator.share({
          title: 'My Pizza Personality Result',
          text: `I am ${result.name}! Take the Pizza Personality Test to find out yours!`,
          files: [file]
        });
      } else {
        // Fallback: Download the image
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'my-pizza-personality.png';
        link.click();
      }
    } catch (error) {
      console.error('Error sharing result:', error);
      alert('There was an error creating your shareable image. Please try again.');
    } finally {
      setIsSharing(false);
    }
  }

  // ✅ Once the quiz is complete and result is ready, show it to the user
  if (quizComplete && result) {
    return (
        <div className='end-message' 
        ref={resultRef}
        style={{
        height: '95vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '10px',
        boxSizing: 'border-box'
      }}>
        {/* Confetti */}
        {confetti.map(item => (
          <div 
            key={item.id}
            className="confetti"
            style={{
              backgroundColor: item.color,
              left: `${item.left}%`,
              animationDuration: `${item.animationDuration}s`,
              animationDelay: `${item.delay}s`
            }}
          />
        ))}
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
          margin: '7px auto',
          textAlign: 'center',
          zIndex: 2, // Ensures heading is above confetti
          fontWeight: 'bold',
          color: '#e74c3c'
        }}>You are {result.name}!</h3>
        <p style={{
          fontSize: '0.85rem',
          lineHeight: '1.3',
          color: '#34495e',
          maxWidth: '600px',
          margin: '7px auto',
          padding: '0 10px',
          whiteSpace: 'pre-wrap'
        }}>{result.description}</p>
        <h5 style={{
          fontSize: '1rem',
          margin: '7px auto',
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
        {/* Action buttons container */}
        <div className='buttons-container' style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          margin: '25px auto 0px auto'
        }}>
          {/* Share button */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            style={{
              backgroundColor: '#4a7e4e', // cheese color
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '10px 25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isSharing ? 'default' : 'pointer',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isSharing ? 0.7 : 1,
              height: '44px'
            }}
            onMouseOver={(e) => {
              if (!isSharing) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              if (!isSharing) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <span style={{ marginRight: '8px' }}>
              {isSharing ? '⏳' : '📷'}
            </span>
            {isSharing ? 'Creating...' : 'Share Your Result!'}
          </button>
          
          {/* Restart button */}
          <button
            id="restart-button" // Add ID for easy removal when sharing
            onClick={restartQuiz}
            style={{
              backgroundColor: '#4b4237', // crust color
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '10px 25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '44px'}}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
            }}
          >
            <span style={{ marginRight: '8px' }}>🔄</span>
            Take the Quiz Again
          </button>
        </div>
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
      {/* Background particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="pizza-particle"
          style={{
            fontSize: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.animationDuration}s`
          }}
        >
          {particle.icon}
        </div>
      ))}
      
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
