import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const dialog = useRef();
  
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  
  if (timeRemaining <= 0){
    handleTimeStop();
    dialog.current.open();
  }
  
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  
  function handleClick() {
    timerIsActive ? handleTimeStop() : handleTimeStart();
  }
  
  function handleTimeStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTime => +prevTime - 10);
    }, 10);
  }
  
  function handleTimeStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  
  return (<>
    <ResultModal reference={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
    <section className="challenge">
      <h2>{title}</h2>
      
      <p className="challenge-time">{targetTime} second{targetTime > 1 ? 's' : ''}</p>
      <p>
        <button onClick={handleClick}>{timerIsActive ? 'Stop' : 'Start'} challenge</button>
      </p>
      <p className={timerIsActive ? 'active' : undefined}>
        {timerIsActive ? 'Timer is running...' : 'Timer inactive'}
      </p>
    </section>
  </>)
}
