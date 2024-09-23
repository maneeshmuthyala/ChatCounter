import {useState} from 'react'
import './index.css'

const TextAnalyzer = () => {
  const [text, setText] = useState('')
  const [uniqueWords, setUniqueWords] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [searchStr, setSearchStr] = useState('')
  const [replaceStr, setReplaceStr] = useState('')
  const [replacedText, setReplacedText] = useState('')

  const calculateStatistics = inputText => {
    const wordsArray = inputText.toLowerCase().match(/\b\w+\b/g) || []

    setUniqueWords(new Set(wordsArray).size)
    const characters = inputText.replace(/[^a-zA-Z0-9]/g, '')
    setCharCount(characters.length)
  }

  const handleTextChange = e => {
    const inputText = e.target.value
    setText(inputText)
    calculateStatistics(inputText)
  }
  const handleReplace = () => {
    if (searchStr) {
      const updatedText = text.split(searchStr).join(replaceStr)
      setReplacedText(updatedText)
      setText(updatedText)
    }
  }

  return (
    <div className="container">
      <h1>Real Time Text Analyzer</h1>

      <textarea
        className="textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
      />

      <div className="stats">
        <p>Unique Words: {uniqueWords}</p>
        <p>Characters (excluding spaces/punctuation): {charCount}</p>
      </div>

      <div className="replace-section">
        <input
          type="text"
          value={searchStr}
          onChange={e => setSearchStr(e.target.value)}
          placeholder="String to search"
        />
        <input
          type="text"
          value={replaceStr}
          onChange={e => setReplaceStr(e.target.value)}
          placeholder="String to replace"
        />
        <button onClick={handleReplace} type="button">
          Replace All
        </button>
      </div>

      {replacedText && (
        <div className="highlighted-text">
          <h2>Replaced Text:</h2>
          <pre>{replacedText}</pre>
        </div>
      )}
    </div>
  )
}

export default TextAnalyzer
