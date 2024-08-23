import './ToolTip.css'
import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import CloseModalComponent from '../Modal/CloseModal';

const genAI = new GoogleGenerativeAI('AIzaSyCNA7BjxzDJz2UGz5GAyWqryzthajGAGzo');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ToolTip = () => {
  const toolTipRef = useRef<HTMLDivElement>(null);

  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [showCloseModal, setCloseModal] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const [gptPrompt, setGptPrompt] = useState('');
  const [gptResponse, setGptResponse] = useState('');

  useEffect(() => {
    const handleMouseUp = () => {
      const text = window.getSelection()?.toString().trim();

      if (text) {
        const range = window.getSelection()?.getRangeAt(0);
        const rectangle = range?.getBoundingClientRect();

        setSelectedText(text);
        setIsVisible(true);

        if (rectangle) {

          const topPosition = rectangle.bottom + window.scrollY + 10; 
          const leftPosition = (window.innerWidth / 2) - (toolTipRef.current?.offsetWidth || 0) / 2;

          setPosition({
            top: topPosition,
            left: leftPosition,
          });
        }
      } 
    };

    const handleClickOutside = (event: MouseEvent) => {
      console.log('click outside')
      if (
        toolTipRef.current &&
        !toolTipRef.current.contains(event.target as Node) 
      ) {
        console.log('Click outside detected');
        setShowForm(false);
        setIsVisible(false);
        setCloseModal(true);
        setGptResponse('');
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

  const generateResponse = async(prompt: string) => {
    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text(); 
      setGptResponse(text);
      setShowResponse(true);
      console.log(text);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const prompt = `Please perform the following instructions. If nonsensical
    input is provided, do not return anything.
    Here are the instructions: ${gptPrompt} and the corresponding input: ${selectedText}`;

    generateResponse(prompt);
    setGptPrompt('');
  };

  const handleClick = async (type: string) => {

    const prompts = {
      clarify: `Please provide a simple explanation for the following text: ${selectedText}.`,
      define: `Please provide a simple definition for the following term: ${selectedText}.`,
      background: `Please provide some information on who the following person/organization/entity is: ${selectedText}.`,
    }

    const disclaimer = `Provide a concise answer and avoid unnecessary information. 
    If the provided text is irrelevant to the selected option,
    respond with: 'It seems nothing meaningful was highlighted or typed. 
    Please highlight text or enter your query.`

    const prompt = `${prompts[type as keyof typeof prompts]} ${disclaimer}`;
    generateResponse(prompt);
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
        <div className='gpt-options'>
          <button onClick={() => setShowForm(true)}>Ask AI</button>
          <button onClick={() => handleClick('clarify')}>Clarify This</button>
          <button onClick={() => handleClick('define')}>Define This</button>
          <button onClick={() => handleClick('background')}>Background</button>
        </div>

        {showForm && (
          <div className='options-container'>
            <form className='gpt-form' onSubmit={handleSearch} > 
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
            
          </div> )}

        {showResponse && (
          <div className='response-container'>
            <p className='response-text'>{gptResponse}</p>
          </div>
        )}
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
