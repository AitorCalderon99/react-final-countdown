import {useRef, useState} from "react";

export default function Player() {
  const inputRef = useRef();
  const [playerName, setPlayerName] = useState('');
  
  function setInput() {
    setPlayerName(inputRef.current.value);
    inputRef.current.value = '';
  }
  
  return (<section id="player">
    <h2>Welcome {playerName ? playerName : 'Unknown'}</h2>
    <p>
      <input ref={inputRef} type="text"/>
      <button onClick={setInput}>Set Name</button>
    </p>
  </section>);
}
