import React, { useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import LogRow from '../LogRow/LogRow';

function LogList({ logs, isAutoScroll }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (isAutoScroll && listRef.current) {
      listRef.current.scrollToItem(logs.length - 1);
    }
  }, [logs, isAutoScroll]);

  return (
    <List
      height={700}
      itemCount={logs.length}
      itemSize={50}
      width="100%"
      ref={listRef}
    >
      {({ index, style }) => <LogRow index={index} style={style} logs={logs} />}
    </List>
  );
}

export default LogList;
