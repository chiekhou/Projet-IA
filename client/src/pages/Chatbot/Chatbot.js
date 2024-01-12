import React, { useState, } from 'react';
import { useSetRecoilState } from 'recoil';
import { chatDisplayState } from '../../state';
import styles from "./Chatbot.module.scss";

function Chatbot() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [prompt, setPrompt] = useState('');
    const [jresult, setJresult] = useState('');
    const [error, setError] = useState('');
    const setChatDisplay = useSetRecoilState(chatDisplayState)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if(!inputValue){
        setError('Please enter a prompt!');
        setPrompt('');
        setResult('');
        setJresult('');
        return;
      }
  
      const response = await fetch('/api/chatgpt/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });
  
      try {
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPrompt(inputValue);
          setResult(data.ideas.join('\n'));
          setJresult(JSON.stringify(data.ideas, null, 2));
          setInputValue('');
          setError('');
        } else {
          throw new Error('An error occurred');
        }
      } catch (error) {
        console.log(error);
        setResult('');
        setError('An error occurred while submitting the form.');
      }
    };
  
    return (
      <div onClick={() => setChatDisplay(false) }className={styles.container}>
        <div onClick={ (e) => e.stopPropagation()} className={styles.chatboxmsg}>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {prompt && <div className="alert alert-secondary mt-3">{prompt}</div>}
        {result && <div className="alert alert-success mt-3">{result}</div>}
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="">
              <div className="form-floating">
                <input
                  className={styles.size}
                  id="floatingInput"
                  placeholder="Enter a value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
  
                <label htmlFor="floatingInput"></label>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary custom-button">Submit</button>
            </div>
          </div>
        </form>

      </div>
      </div>
    );
  }


export default Chatbot;
