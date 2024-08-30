import React, { useState, useEffect } from 'react';
import LogList from '../LogList/LogList';

const LOGS_URL = 'https://test-log-viewer-backend.stg.onepunch.agency/view-log';

function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch(LOGS_URL);
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let chunkValue = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunkValue += decoder.decode(value, { stream: true });

        const lines = chunkValue.split('\n');
        chunkValue = lines.pop();

        setLogs((prevLogs) => [...prevLogs, ...lines]);
      }
    };

    fetchLogs();
  }, []);

  const toggleAutoScroll = () => {
    setIsAutoScroll((prev) => !prev);
  };

  return (
    <div className="log-viewer">
      <button onClick={toggleAutoScroll}>
        {isAutoScroll ? 'Stop Auto Scroll' : 'Start Auto Scroll'}
      </button>
      <LogList logs={logs} isAutoScroll={isAutoScroll} />
    </div>
  );
}

export default LogViewer;
