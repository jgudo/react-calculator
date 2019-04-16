import React, { useRef } from 'react';

const Recent = ({ 
  recent, 
  selectedHistory, 
  deleteHistory,
  clearHistory
}) => {
  const historyWrapper = useRef(null);
  const toggleButton = useRef(null);

  const toggleHistory = () => {
    historyWrapper.current.classList.toggle('visible');

    if (historyWrapper.current.classList.contains('visible')) {
      toggleButton.current.textContent = 'Close'; 
    } else {
      toggleButton.current.textContent = 'History'; 
    }
  };

  return (
    <div 
        className="history"
        ref={historyWrapper}
    >
      <div className="history-actions">
        <button 
            className="history-toggle"
            onClick={toggleHistory}
            ref={toggleButton}
        >
        History
        </button>
        <button 
            className="history-clear"
            onClick={clearHistory}
        >
        Clear History
        </button>
      </div>
      <div className="history-wrapper">
        {recent.length !== 0 && recent.map((item, index) => {
          const input = item.input.join('').replace('*', 'x');

          return (
            <div 
                key={index}
                className="history-item"
            >
              <div  
                  className="history-item-wrapper" 
                  onClick={() => {
                    selectedHistory(item.input, item.result);
                    toggleHistory();
                  }}
              >
                <p>{input} = {item.result}</p>
              </div>
              <button 
                  className="history-delete"
                  onClick={() => {
                    deleteHistory(index);
                  }}
              >
              Delete
              </button>
            </div>
          );
        })}
        {recent.length === 0 && (
          <div className="history-empty">
            <p>No recent calculations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recent;
