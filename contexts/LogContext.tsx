import React, {createContext, useContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export interface Log {
  id: string;
  title: string;
  body: string;
  date: Date;
}
export interface LogContextValue {
  logs: Log[];
  onCreate: ({title: body, date}: Partial<Log>) => void;
}

const LogContext = createContext<LogContextValue | null>(null);

export function LogContextProvider({children}: {children: React.ReactNode}) {
  const [logs, setLogs] = useState<Log[]>([]);

  const onCreate = ({title, body, date}: Partial<Log>) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    } as Log;
    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
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
