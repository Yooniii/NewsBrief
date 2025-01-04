import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import { CiCircleQuestion } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { PiSparkleFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import './ToolTip.css'

// Renders the tooltip component when a word or phrase is highlighted.

// Load the GeminiAI model
// const apiKey =  process.env.GENAI_API_KEY!;
const genAI = new GoogleGenerativeAI('AIzaSyCNA7BjxzDJz2UGz5GAyWqryzthajGAGzo');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Tooltip component
 * @returns {JSX.Element} JSX element representing the tooltip
 */
const ToolTip = () => {
  const toolTipRef = useRef<HTMLDivElement>(null); // Ref to tooltip display

  // State variables for managing tooltip behaviour and data
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [gptPrompt, setGptPrompt] = useState('');
  const [gptResponse, setGptResponse] = useState('');

  // Effect to handle text selection and position of tooltip when visible
  useEffect(() => {
    const handleMouseUp = () => {
      const text = window.getSelection()?.toString().trim(); // Get selected text

      if (text) {
        // Get range and bounding rectangle of selected text
        const range = window.getSelection()?.getRangeAt(0);
        const rectangle = range?.getBoundingClientRect();

        setSelectedText(text);
        setIsVisible(true); // Display tooltip

        if (rectangle) {
          // Calculate top and left position for the tooltip
          let topPosition = rectangle.bottom + window.scrollY + 10; 
          let leftPosition = rectangle.left + window.scrollX;

          const tooltipWidth = 400;

          // Adjust tooltip position if it overflows the window
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

    // Hides tooltip display if clicks outside are detected
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolTipRef.current &&
        !toolTipRef.current.contains(event.target as Node) 
      ) {
        setShowForm(false);
        setIsVisible(false);
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

  /**
   * Generates a response from GeminiAI.
   * @param {String} prompt - Specific prompt to pass to the AI model
   */
  async function generateResponse(prompt: string){
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

  /**
  * Handles the 'AI Search' option on the tooltip by calling generateResponse with a specific prompt.
  * @param {React.FormEvent} event - The event obj from the form submission
  */
 async function handleSearch(event: React.FormEvent) {
    event.preventDefault(); 
    const prompt = `Please perform the following instructions. If nonsensical
    input is provided, do not return anything. Present the response in plain text
    and avoid any use of asterisks. Here are the instructions: ${gptPrompt} and 
    the corresponding input if needed: ${selectedText}`;

    generateResponse(prompt);
    setGptPrompt('');
  };

  /**
   * Handles 'Explain' or 'Define' option on tooltip by
   * calling generateResponse() with the appropriate prompt.
   * @param {String} type - User's selected option ('explain' or 'define') 
  */
  async function handleClick(type: string){

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

  return (isVisible ? (
    <div 
      ref={toolTipRef}
      className='tool-tip-container'
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
      }} >

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
              onChange={(e) => setGptPrompt(e.target.value)} />
            <button className='ai-search-btn' type='submit'>
            <IoIosSearch />
            </button>
          </form>
        </div> )}

      {showResponse && (
        <div className='response-container'>
          <p className='response-text'>{gptResponse}</p>
        </div>
      )}
    </div>
  ) : null 
  );
};

export default ToolTip;
