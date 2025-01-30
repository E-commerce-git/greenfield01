import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 4,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <div className="bg-gray-900 text-white px-3 py-2 rounded">
          {String(time.hours).padStart(2, '0')}
        </div>
        <span className="text-xl">:</span>
        <div className="bg-gray-900 text-white px-3 py-2 rounded">
          {String(time.minutes).padStart(2, '0')}
        </div>
        <span className="text-xl">:</span>
        <div className="bg-gray-900 text-white px-3 py-2 rounded">
          {String(time.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
} 