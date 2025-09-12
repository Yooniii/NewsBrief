import { API_ENDPOINTS, buildApiUrl} from "../lib/api-config";

export async function requestTextDefinition(text: string) { 
  const response = await fetch(buildApiUrl(API_ENDPOINTS.TEXT_DEFINITION), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

export async function requestTextExplanation(text: string) { 
  const response = await fetch(buildApiUrl(API_ENDPOINTS.TEXT_EXPLAINATION), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.response;  
} 

export async function requestAiSearch(text: string) { 
  const response = await fetch(buildApiUrl(API_ENDPOINTS.AI_SEARCH), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

