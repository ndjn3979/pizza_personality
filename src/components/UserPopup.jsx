import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../data/popup.css';

export default function PopupGfg({ open, onClose, setUserName }) {
  const [typedUpUser, setTypeUser] = useState('');

  const userNameCreater = () => {
    setUserName(typedUpUser);
    onClose();
  };

  const handleInputChange = (event) => {
    setTypeUser(event.target.value);
  };

  // Inline styles
  const modalStyle = {
    background: 'white',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',
  };

  const inputStyle = {
    marginTop: '10px',
    padding: '8px',
    width: '80%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    marginTop: '15px',
    padding: '8px 16px',
    backgroundColor: '#4a7e4e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <Popup open={open} onClose={onClose} modal>
        {(close) => (
          <div style={modalStyle}>
            <div
              style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}
            >
              Welcome! What is your name?
            </div>
            <input
              type='text'
              value={typedUpUser}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <br />
            <button onClick={userNameCreater} style={buttonStyle} >
              Submit
            </button>
            <br />
            <button
              onClick={close}
              style={{ ...buttonStyle, backgroundColor: '#777' }}
            >
              Finish
            </button>
          </div>
        )}
      </Popup>
    </div>
  );
}
