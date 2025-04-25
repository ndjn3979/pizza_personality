import React from 'react';
import questionsData from "../data/questions.json";

const QuestionRenderer = () => {
    const questions = questionsData;
    const answersOnly = Object.keys(questions[0].options);

    return (
        <div className="question-card">
            <div className="pizza-icon">🍕</div>
            <h1>Pizza Personality Test</h1>

            <div className="progress-bar">
                <div className="progress" style={{ width: '25%' }}></div>
            </div>

            <div className="question-container">
                <h2>Sample Question</h2>
                <div className="question-text">{questions[0].question}</div>

                <div className="answer-options">
                    {answersOnly.map((answer, index) => (
                        <button key={index} className="answer-option">
                            {answer}
                        </button>
                    ))}
                </div>
            </div>

            {/* Temporary JSON output - remove in production */}
            <div className="json-output">
                Debug: {JSON.stringify(answersOnly)}
            </div>
        </div>
    );
};

export default QuestionRenderer;