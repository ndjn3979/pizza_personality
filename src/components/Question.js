import React, { useEffect, useState } from 'react';
import questionsData from "../data/questions.json"

// core function to render the current question as a question card
 const questionRenderer = () => {
    const questions = questionsData;
    const answersOnly = Object.keys(questions[0].options)
    return (
        <><div>
            <h1>Pizza Personality Test</h1>
        </div><div>
            <h2>Sample Question</h2>
            <div>{questions[0].question}</div>
            </div>
            <div>
                <span>{JSON.stringify(answersOnly)}</span>
            </div>
            </>
    )
}

// helper function to handle answer submissions
        // this will send/push the answer traits to the user traits array
        // this will then display the next question card

export default questionRenderer