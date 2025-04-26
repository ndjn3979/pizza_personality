import React from 'react';
import resultsData from '../data/results.json';

const ResultTester = () => {
  // Scroll to a specific result when clicking on the navigation
  const scrollToResult = (index) => {
    const element = document.getElementById(`result-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Navigation for quick access to each result */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        marginBottom: '20px'
      }}>
        <h1>Result Tester - All Pizza Results</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {resultsData.map((result, index) => (
            <button
              key={index}
              onClick={() => scrollToResult(index)}
              style={{
                padding: '5px 10px',
                borderRadius: '5px',
                border: '1px solid #e74c3c',
                backgroundColor: 'white',
                color: '#e74c3c',
                cursor: 'pointer'
              }}
            >
              {result.name}
            </button>
          ))}
        </div>
      </div>

      {/* Display all results */}
      {resultsData.map((result, index) => (
        <div 
          key={index} 
          id={`result-${index}`}
          className='end-message'
          style={{
            marginBottom: '40px',
            border: '2px solid #e74c3c',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#fff9f9'
          }}
        >
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
                margin: '0 auto 10px auto',
                display: 'block',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
              }}
            />
          )}
          <h3 style={{
            marginTop: '5px',
            textAlign: 'center'
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
            marginBottom: '4px',
            textAlign: 'center'
          }}>Matching Traits:</h5>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'center'
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
      ))}
    </div>
  );
};

export default ResultTester;