import {useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

export default function ResultModal({reference, targetTime, remainingTime, onReset}) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  
  useImperativeHandle(reference, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  })
  
  
  return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
    <h2>You {userLost ? 'LOST' : 'WON'}</h2>
    {!userLost && <p>SCORE: {score}</p>}
    <p>The target time was <strong>{targetTime} seconds.</strong></p>
    {!userLost && <p>You stopped the timer with <strong>{(remainingTime / 1000).toFixed(2)} seconds left.</strong></p>}
    <form method="dialog" onSubmit={onReset}>
      <button>Close</button>
    </form>
  </dialog>, document.getElementById('modal'));
}
