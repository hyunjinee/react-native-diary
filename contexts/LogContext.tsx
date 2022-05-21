import React, {createContext, useContext, useState} from 'react';
import {nanoid} from 'nanoid';
// import {v4 as uuidv4} from 'uuid';

export interface Log {
  id: string;
  title: string;
  body: string;
  date: string;
}
export interface LogContextValue {
  logs: Log[];
  onCreate: ({title: body, date}: Partial<Log>) => void;
  onModify: (modified: Log) => void;
}

const LogContext = createContext<LogContextValue | null>(null);

export function LogContextProvider({children}: {children: React.ReactNode}) {
  // const [logs, setLogs] = useState<Log[]>([]);
  const [logs, setLogs] = useState<Log[]>(
    Array.from({length: 10})
      .map((_, index) => ({
        id: nanoid(),
        title: `title ${index}`,
        body: `body ${index}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
  );

  const onCreate = ({title, body, date}: Partial<Log>) => {
    const log = {
      id: nanoid(),
      title,
      body,
      date,
    } as Log;
    setLogs([log, ...logs]);
  };

  const onModify = (modified: Log) => {
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify}}>
      {children}
    </LogContext.Provider>
  );
}

// Context를 만들면 LogContext.Provider와 LogContext.Consumer가 생김
// Provider는 Context안에 있는 값을 사용할 컴포넌트들을 감싸는 용도

export function useLog() {
  const log = useContext(LogContext);

  if (!log) {
    throw new Error('LogContextProvider is not used');
  }

  return log;
}

export default LogContext;
