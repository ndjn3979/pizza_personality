import React from "react";
import QuestionRenderer from "./components/Question";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
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
