import './ToolTip.css'
import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'; 

const genAI = new GoogleGenerativeAI('AIzaSyCNA7BjxzDJz2UGz5GAyWqryzthajGAGzo');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ToolTip = () => {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
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

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleClick = async () => {
    const prompt = `If the input is a person's name, briefly explain who they are. 
    If it's a term, provide a concise definition. For phrases or sentences, 
    rephrase and simplify the meaning. Keep responses to the point. 
    If the input is nonsensical (e.g., a single word like 'a' or 'the'), 
    return 'INVALID'. 
    Here is the input: ${selectedText}`;

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
        className='tool-tip-container'
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
        }}
      >
        <button onClick={handleClick}>Ask AI</button>
        {/* <div>{gptResponse}</div> */}
      </div>
    ) : null 
  );
};

export default ToolTip;
