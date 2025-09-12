import { useState, useRef, useEffect } from "react";
import { 
  requestAiSearch, 
  requestTextDefinition, 
  requestTextExplanation 
} from "../services/toolService";

export function useToolTip() {
  const toolTipRef = useRef<HTMLDivElement>(null); // Ref to tooltip display

  // State variables for managing tooltip behaviour and data
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [gptResponse, setGptResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  // Effect to handle text selection and position of tooltip when visible
  useEffect(() => {
    const handleMouseUp = () => {
      const text = window.getSelection()?.toString().trim(); // Get selected text

      if (text) { // Get range and bounding region of selected text
        const range = window.getSelection()?.getRangeAt(0);
        const rectangle = range?.getBoundingClientRect();

        setSelectedText(text);
        setIsVisible(true);

        // Calculate top and left position for the tooltip
        if (rectangle) {
          let topPosition = rectangle.bottom + window.scrollY + 10;
          let leftPosition = rectangle.left + window.scrollX;

          const tooltipWidth = 400;

          // Adjust tooltip position if overflow
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

    // Hide tooltip display when clicks outside are detected
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolTipRef.current &&
        !toolTipRef.current.contains(event.target as Node)
      ) {
        setShowForm(false);
        setIsVisible(false);
        setShowResponse(false);
        setGptResponse('');
      }
    }
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    try {
      const data = await requestAiSearch(selectedText);
      setGptResponse(data.response);
    } catch (error) {
      console.error('Error in AI search:', error);
      setGptResponse('Sorry, there was an error processing your request.');
    }
    setShowResponse(true);
  };


  const handleExplainOrDefineClick = async (type: string) => {
    setShowForm(false);
    setShowResponse(false);
    setGptResponse('');
    
    try {
      let response: string;
      if (type === 'explain') {
        response = await requestTextExplanation(selectedText);
      } else {
        response = await requestTextDefinition(selectedText);
      }
      
      setGptResponse(response);
      setShowResponse(true);
    } catch (error) {
      console.error('Error in explain/define:', error);
      setGptResponse('Sorry, there was an error processing your request.');
      setShowResponse(true);
    }
  }

  const handleAiSearchClick = () => {
    setShowForm(true);
    setShowResponse(false);
    setGptResponse('');
  }

  return {
    toolTipRef,
    selectedText,
    position,
    isVisible,
    showForm,
    showResponse,
    gptResponse,
    userPrompt,
    setUserPrompt,
    handleSearch,
    handleExplainOrDefineClick,
    handleAiSearchClick,
  };
}