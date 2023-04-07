import React, { useState, useEffect } from 'react';
import moment from 'moment';
import "../styles/ProgressBar.css"

const ProgressBarV2 = ({timeCreate, timeWork, master, changeProgressBar}) => {
  const [startTime, setStartTime] = useState(moment(timeCreate)); // початкова точка в часі
  const [endTime, setEndTime] = useState(moment(timeCreate).add(timeWork, 'hours')); // кінцева точка в часі
  const [currentTime, setCurrentTime] = useState(moment()); // поточний час
  const [progress, setProgress] = useState(); // стан прогресу

  useEffect(() => {
    const interval = setInterval(() => { 
      setCurrentTime(moment()); // отримуємо поточний час кожну секунду
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(100)
      changeProgressBar(100)
      return 
    }

    if (progress >= 50) {
      changeProgressBar(50)
    }

    const totalDuration = moment.duration(endTime.diff(startTime)); // обчислюємо загальну тривалість в мілісекундах
    const elapsedDuration = moment.duration(currentTime.diff(startTime)); // обчислюємо пройдений час в мілісекундах
    const currentProgress = (elapsedDuration.asSeconds() / totalDuration.asSeconds()) * 100; // обчислюємо прогрес від 0 до 100
    setProgress(currentProgress);

  }, [currentTime, startTime, endTime]);


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
