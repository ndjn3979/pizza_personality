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

  return (
    <div>
      <Popup open={open} onClose={onClose} modal>
        {(close) => (
          <div className='modal'>
            <div className='content'>Welcome What is your name?</div>
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
