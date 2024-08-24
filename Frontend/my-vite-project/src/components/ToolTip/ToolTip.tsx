import './ToolTip.css'
import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import CloseModalComponent from '../Modal/CloseModal';
import { CiCircleQuestion } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { PiSparkleFill } from "react-icons/pi";
import { useSpring, animated } from '@react-spring/web'
import { IoIosSearch } from "react-icons/io";


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
          let topPosition = rectangle.bottom + window.scrollY + 10; 
          let leftPosition = rectangle.left + window.scrollX;

          const tooltipWidth = 400;

          if (leftPosition + tooltipWidth > window.innerWidth) {
            leftPosition = window.innerWidth - tooltipWidth - 60; 
          }

          setPosition({
            top: topPosition,
            left: leftPosition,
          });
        }
      } 
    };

    const handleClickOutside = (event: MouseEvent) => {
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
    Here are the instructions: ${gptPrompt} and the corresponding input if needed: ${selectedText}`;

    generateResponse(prompt);
    setGptPrompt('');
  };

  const handleClick = async (type: string) => {

    const prompts = {
      explain: `Please provide a simple explanation for the following text: ${selectedText}.`,
      define: `Please provide a simple definition for the following term: ${selectedText}.`,
    }

    const disclaimer = `Provide a concise answer and avoid unnecessary information. 
    Present the response in plain text and avoid any use of asterisks.
    If the provided text is irrelevant to the selected option,
    respond with: 'It seems nothing meaningful was highlighted or typed. 
    Please highlight text or enter your query. `

    const prompt = `${prompts[type as keyof typeof prompts]} ${disclaimer}`;
    generateResponse(prompt);
  };

  //   const showGptResponse = () => {
  //     const props = useSpring({
  //       from: { opacity: 0, transform: 'translateY(10px)' },
  //       to: { opacity: 1, transform: 'translateY(0px)' },
  //     });
      
  //     return (
  //     <animated.div className='response-container' style={props}>
  //       <p className='response-text'>{gptResponse}</p>
  //     </animated.div>
  //   );
  // };

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
          <button className='ai-btn'onClick={() => setShowForm(true)}>
            <PiSparkleFill /> Ask AI </button>
          <button className='explain-btn' onClick={() => handleClick('explain')}>
            <CiCircleQuestion /> Explain This 
          </button>
          <button className='define-btn' onClick={() => handleClick('define')}>
            <FaBook />Define This</button>
        </div>

        {showForm && (
          <div className='search-wrapper'>
            <form className='gpt-form' onSubmit={handleSearch} > 
              <input 
                id='gpt-input'
                className='gpt-input'
                type='search'
                placeholder='Ask AI to generate...'
                value={gptPrompt} 
                onChange={(e) => setGptPrompt(e.target.value)} 
              />
              <button className='ai-search-btn' type='submit'>
                <IoIosSearch />
              </button>
            </form>
            
          </div> )}

        {showResponse && (
          <div className='response-container'>
            <p className='response-text'>{gptResponse}</p>
          </div>
          // showGptResponse()
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
