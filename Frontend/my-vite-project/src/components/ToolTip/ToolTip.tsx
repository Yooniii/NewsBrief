import './ToolTip.css'
import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'; 

const genAI = new GoogleGenerativeAI('AIzaSyCNA7BjxzDJz2UGz5GAyWqryzthajGAGzo');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ToolTip = () => {
  const toolTipRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
          setPosition({
            top: rectangle.top + window.scrollY - 43,
            left: rectangle.left + window.scrollX + (rectangle.width / 2) - (toolTipWidth / 2),
          });
        }
      } else {
        setSelectedText('');
        setIsVisible(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (toolTipRef.current && 
      !toolTipRef.current.contains(event.target as Node) &&
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)) {
        console.log('Click outside detected');
        setShowForm(false);
        setIsVisible(false);
      }
    }

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleClick = async () => {
    // setShowForm
    // const prompt = `If the input is a person's name, briefly explain who they are. 
    // If it's a term, provide a concise definition. For phrases or sentences, 
    // rephrase and simplify the meaning. Keep responses to the point. 
    // If the input is nonsensical (e.g., a single word like 'a' or 'the'), 
    // return 'INVALID'. 
    // Here is the input: ${selectedText}`;

    // try {
    //   const result = await model.generateContent(prompt);
    //   const text = result.response.text(); 
    //   setGptResponse(text);
    //   console.log(text);
    // } catch (error) {
    //   console.error('Error generating content:', error);
    // }
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
          <div className='options-container' ref={optionsRef}>
            <form onSubmit={handleSearch} > 
            <input 
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
            <div className='gpt-options' ref={toolTipRef}>
              <div>Clarify this</div>
              <div>Define this</div>
              <div>Background</div>
            </div>
          </div> ) : null}
        {/* <div>{gptResponse}</div> */}
      </div>
    ) : null 
  );
};

export default ToolTip;
