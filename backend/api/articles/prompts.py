# Shared system message / instruction
COMMON_INSTRUCTIONS = """\
- Provide a concise, accurate answer.
- Use plain text only (no Markdown, no asterisks).
- Avoid repeating the input verbatim unless necessary.
- If the text is irrelevant or nonsensical, respond exactly with:
"It seems nothing meaningful was highlighted or typed. Please highlight text or enter your query."
"""

def CUSTOM_SEARCH_PROMPT(user_prompt: str, selected_text: str) -> str:
    return f"""You are an AI assistant for a news summarization app. Follow the user's instructions carefully.

User's request:
{user_prompt}

Selected text (if relevant):
{selected_text}

{COMMON_INSTRUCTIONS}
"""

def DEFINITION_PROMPT(text: str) -> str:
    return f"""You are an AI assistant for a news summarization app. 
Provide a clear, beginner-friendly definition for this term or phrase:

{text}

{COMMON_INSTRUCTIONS}
"""

def EXPLANATION_PROMPT(text: str) -> str:
    return f"""You are an AI assistant for a news summarization app. 
Provide a short, easy-to-understand explanation for this text or concept:

{text}

{COMMON_INSTRUCTIONS}
"""

def CLEAN_SUMMARY_PROMPT(summary: str, title: str) -> str:
    return f"""Refine and reformat the following news article summary according to these rules:

1. Begin with a 1-2 sentence overview that clearly captures the article's main point.  
2. Break down the remaining key details into **multiple distinct bullet points**, each focusing on one fact, event, or piece of information.  
3. Present bullet points in chronological order or logical sequence.  
4. Remove incoherent, repetitive, or irrelevant text.  
5. If the article title and summary are nonsensical or meaningless, respond only with: "INVALID".  

Formatting requirements:
- First line: concise overview sentence.
- Following lines: use multiple bullet points, starting each with "- " (a hyphen and a space).
- Each bullet point should be one short sentence or phrase — avoid combining unrelated details into a single bullet.
- Do not use phrases like "This article" — write as if summarizing directly from the source.
- Use plain text only (no special symbols, asterisks, or markdown formatting).

Article title: {title}  
Summary to reformat: {summary}
"""
