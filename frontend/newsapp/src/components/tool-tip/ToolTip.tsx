import { CiCircleQuestion } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { PiSparkleFill } from "react-icons/pi";

import { useToolTip } from '../../hooks/useToolTip';
import "./ToolTip.css";


/**
 * Renders tooltip component when a word or phrase is highlighted.
 */
export const ToolTip = () => {
  
  const { 
    toolTipRef, 
    position, 
    isVisible, 
    showForm, 
    showResponse, 
    gptResponse, 
    userPrompt, 
    setUserPrompt,
    handleAiSearchClick, 
    handleExplainOrDefineClick, 
    handleSearch 
  } = useToolTip();  
  
  return (isVisible ? (
    <div 
      ref={toolTipRef}
      className='tool-tip-container'
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
      }} >
        
      <div className='gpt-options'>
        <button className='ai-btn' onClick={handleAiSearchClick}>
          <PiSparkleFill /> Ask AI</button>
        <button className='explain-btn' onClick={() => handleExplainOrDefineClick('explain')}>
          <CiCircleQuestion /> Explain</button>
        <button className='define-btn' onClick={() => handleExplainOrDefineClick('define')}>
          <FaBook /> Define
        </button>
      </div>

      {showForm && (
        <div className='search-wrapper'>
          <form className='gpt-form' onSubmit={handleSearch} autoComplete="off"> 
            <input 
              id='gpt-input'
              className='gpt-input'
              type='search'
              placeholder='Ask anything about the selected text...'
              value={userPrompt} 
              onChange={(e) => setUserPrompt(e.target.value)}
              autoComplete="off" 
            />
          </form>
        </div> )}

      {showResponse && gptResponse && (
        <div className='response-container'>
          <p className='response-text'>{gptResponse}</p>
        </div>
      )}
    </div>
  ) : null 
  );
};
