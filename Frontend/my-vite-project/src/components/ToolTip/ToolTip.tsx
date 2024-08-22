import './ToolTip.css'
import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import CloseModalComponent from '../Modal/CloseModal';

const genAI = new GoogleGenerativeAI('AIzaSyCNA7BjxzDJz2UGz5GAyWqryzthajGAGzo');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ToolTip = async () => {
  const toolTipRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [showCloseModal, setCloseModal] = useState(false);

  const [gptPrompt, setGptPrompt] = useState('');
  const [gptResponse, setGptResponse] = useState('');

  useEffect(() => {
    const handleMouseUp = () => {
      const text = window.getSelection()?.toString().trim();

      if (text) {
        const range = window.getSelection()?.getRangeAt(0);
        const rectangle = range?.getBoundingClientRect();
        const toolTipWidth = 96;
        console.log(text);
        setSelectedText(text);
        setIsVisible(true);

        if (rectangle) {
          const lineHeight = parseInt(window.getComputedStyle(document.body).lineHeight, 10) || 20;
          const isSingleLine = (rectangle.bottom - rectangle.top) < lineHeight;

          setPosition({
            top: isSingleLine
              ? rectangle.bottom + window.scrollY 
              : rectangle.bottom + window.scrollY + 10, 
            left: rectangle.left + window.scrollX + (rectangle.width / 2) - (toolTipWidth / 2),
          });
        }
      } else {
        setSelectedText('');
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolTipRef.current &&
        !toolTipRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        console.log('Click outside detected');
        setShowForm(false);
        setIsVisible(false);
        setCloseModal(true);
        setGptPrompt('');
      }
    }

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleCancel = () => {
  //   setCloseModal(true);
  // }

  // const handleDiscard = () => {
  //   setIsVisible(false);
  //   setCloseModal(true);
  // }

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const prompt = `Please perform the following instructions. If nonsensical
    input is provided, do not return anything.
    Here are the instructions: ${selectedText}`;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text(); 
      setGptResponse(text);
      console.log(text);
    } catch (error) {
      console.error('Error generating content:', error);
    }

    setGptPrompt('');
  };

  const handleClick = async (type: string) => {

    const prompt = `Based on the selected option: ${type}, please provide a simple 
    explanation, definition, or background information for the following text: 
    ${selectedText}. If the provided text is incoherent, incomplete, or 
    irrelevant to the selected option, respond with: 
    'It seems nothing meaningful was highlighted or typed. Please highlight 
    text or enter your query.`

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text(); 
      setGptResponse(text);
      console.log(text);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    isVisible ? (
      <div 
        ref={toolTipRef}
        className='tool-tip-container'
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
        }}
      >
        <button onClick={() => setShowForm(true)}>Ask AI</button>

        {showForm ? (
          <div className='options-container'>
            <form onSubmit={handleSearch} > 
              <input 
                ref={inputRef}
                id='gpt-input'
                className='gpt-input'
                type='search'
                placeholder='Ask AI to generate...'
                value={gptPrompt} 
                onChange={(e) => setGptPrompt(e.target.value)} 
              />
            {/* <button type='submit'>
              <img className='search-icon' src={search} alt='Search' />
            </button> */}
            </form>
            <div className='gpt-options' ref={optionsRef}>
              <button onClick={() => handleClick('clarify')}>Clarify This</button>
              <button onClick={() => handleClick('define')}>Define This</button>
              <button onClick={() => handleClick('background')}>Background</button>
            </div>
          </div> ) : null}
        {/* <div>{gptResponse}</div> */}

        {/* {showCloseModal ? (
          <CloseModalComponent
            isOpen={showCloseModal}
            onRequestClose={() => setCloseModal(false)}
            // onCancel={handleCancel}
            // onDiscard={handleDiscard}
          />): null} */}
      </div>
    ) : null 
  );
};

export default ToolTip;
