import React from 'react';

function LogRow({ index, style, logs }) {
  return (
    <div style={style} className="orange-text">
      {logs[index]}
    </div>
  );
}

export default LogRow;
