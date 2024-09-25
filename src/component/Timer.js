import { useEffect } from "react";

function Timer({ dispatch, seconds_remaining }) {
  let min = Math.floor(seconds_remaining / 60);
  let sec = seconds_remaining % 60;

  useEffect(function () {
    let time = setInterval(() => {
      dispatch({ type: "timeOut" });
    }, 1000);

    return () => {
      //al clean up function
      clearInterval(time);
      // dispatch({ type: "finished" });
    };
  }, []);
  if (seconds_remaining === 0) {
    dispatch({ type: "finished" });
  }
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
