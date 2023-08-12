import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import "../styles/ProgressBar.css"

const ProgressBarV2 = ({timeCreate, timeWork, master, changeProgressBar}) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [progress, setProgress] = useState();

  const prBarrMemo = useMemo(() => {
    const timeEnd = moment(timeCreate).add(timeWork, 'hour')
    const totalDuration = moment.duration(timeEnd.diff(timeCreate)); 
    const elapsedDuration = moment.duration(currentTime.diff(timeCreate)); 
    const currentProgress = (elapsedDuration.asSeconds() / totalDuration.asSeconds()) * 100;
    return currentProgress
  }, [currentTime])

  useEffect(() => {
    const interval = setInterval(() => { 
      setCurrentTime(moment());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(prBarrMemo);
    changeProgressBar(prBarrMemo)

    if (prBarrMemo >= 100) {
      setProgress(100)
      changeProgressBar(100)
    }

  }, [currentTime]);


  return (
    <div>
        {master ? (
            <div className={`${progress < 50 ? "progress-bar-green" : `progress-bar-green ${progress >= 100 ? "red" : "orange"}` }`} style={{ width: `${progress}%`}} />
        ) : (
            <div className={`${progress < 50 ? "progress-bar-yellow" : `progress-bar-yellow ${progress >= 100 ? "red" : "orange"}` }`} style={{ width: `${progress}%`}} />
        )}
    </div>
  );
};

export default ProgressBarV2;
