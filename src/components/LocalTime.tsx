'use client';

import React, { useEffect, useState } from 'react';

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback if Intl is not fully supported or errors
        const now = new Date();
        const lagosOffset = 1; // Lagos is UTC+1
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const lagosTime = new Date(utc + 3600000 * lagosOffset);
        const hours = String(lagosTime.getHours()).padStart(2, '0');
        const minutes = String(lagosTime.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
      }
    };

    updateTime();
    // Sync to start of the next minute
    const delay = (60 - new Date().getSeconds()) * 1000;
    let interval: NodeJS.Timeout;
    
    const timeout = setTimeout(() => {
      updateTime();
      interval = setInterval(updateTime, 60000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <span className="font-mono text-[#F5F5F5] tabular-nums">
      {time || '--:--'}
    </span>
  );
}
