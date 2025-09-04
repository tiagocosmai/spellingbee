import React from 'react';
import './VirtualKeyboard.css';

const VirtualKeyboard = ({ onKeyPress, onBackspace, onSpace, disabled }) => {
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyClick = (key) => {
    if (disabled) return;
    onKeyPress(key);
  };

  const handleBackspace = () => {
    if (disabled) return;
    onBackspace();
  };

  const handleSpace = () => {
    if (disabled) return;
    onSpace();
  };

  return (
    <div className="virtual-keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`keyboard-key ${disabled ? 'disabled' : ''}`}
              onClick={() => handleKeyClick(key)}
              disabled={disabled}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      
      <div className="keyboard-row keyboard-controls">
        <button
          className={`keyboard-key backspace-key ${disabled ? 'disabled' : ''}`}
          onClick={handleBackspace}
          disabled={disabled}
        >
          ⌫
        </button>
        <button
          className={`keyboard-key space-key ${disabled ? 'disabled' : ''}`}
          onClick={handleSpace}
          disabled={disabled}
        >
          ESPAÇO
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
