import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function PopupGfg({ open, onClose, setUserName }) {
  // track and manage user provided name from to start of quiz.
  const [typedUpUser, setTypeUser] = useState('');

  // to grab the name created by the user to later return store with results in database.
  const userNameCreater = () => {
    setUserName(typedUpUser);
    onClose();
  };
  // handles the input changing in the pop up text box.
  const handleInputChange = (event) => {
    setTypeUser(event.target.value);
  };

  const contentStyle = {
    background: 'white',
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    border: '1px solid #e0e0e0'
  };

  const overlayStyle = {
    background: 'rgba(0, 0, 0, 0.5)'
  };

  return (
    <div>
      <Popup 
        open={open} 
        onClose={onClose} 
        modal 
        nested 
        contentStyle={contentStyle}
        overlayStyle={overlayStyle}
      >
        {(close) => (
          <div className='modal'>
            <div className='content' style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#e74c3c'
          }}>Welcome What is your name?</div>
            <input
              type='text'
              value={typedUpUser}
              onChange={handleInputChange}
            />
            <button onClick={userNameCreater}>Submit</button>
            <div>
              <button onClick={close}>Close modal</button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
