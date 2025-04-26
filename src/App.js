import React from "react";
import QuestionRenderer from "./components/Question";
import './styles.css';

const App = () => {
  return (
    <div className="app-container">
      <main>
        <QuestionRenderer />
      </main>
    </div>
  );
};

export default App;