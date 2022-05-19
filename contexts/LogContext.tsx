import React, {createContext, useContext, useState} from 'react';

export interface LogContextValue {
  text: string;
  // setText: (text: string) => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const LogContext = createContext<LogContextValue | null>(null);

export function LogContextProvider({children}: {children: React.ReactNode}) {
  const [text, setText] = useState('');

  return (
    <LogContext.Provider value={{text, setText}}>
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
