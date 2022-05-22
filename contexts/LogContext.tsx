import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {nanoid} from 'nanoid';
import logsStorage from '../storages/logsStorage';
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
  onRemove: (id: string) => void;
}

const LogContext = createContext<LogContextValue | null>(null);

export function LogContextProvider({children}: {children: React.ReactNode}) {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = useState<Log[]>(
    [
      {
        id: nanoid(),
        title: 'react',
        body: 'react는 짱인가?',
        date: '2022-05-15',
      },
      {
        id: nanoid(),
        title: 'vue',
        body: 'vue는 짱인가?',
        date: '2022-05-15',
      },
      {
        id: nanoid(),
        title: 'next',
        body: 'next는 짱인가?',
        date: '2022-05-15',
      },
      {
        id: nanoid(),
        title: '일기',
        body: '코딩은 재밌다.',
        date: '2022-05-10',
      },
      {
        id: nanoid(),
        title: '일기1',
        body: '안녕하세요? 잘 지내셨나요?',
        date: '2022-05-08',
      },
      {
        id: nanoid(),
        title: '일기2',
        body: '오늘은 축구를 했는데 너무 재밌었다.',
        date: '2022-05-06',
      },
      {
        id: nanoid(),
        title: '배가고프다.',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: '2022-05-04',
      },
    ],
    // Array.from({length: 10})
    //   .map((_, index) => ({
    //     id: nanoid(),
    //     title: `title ${index}`,
    //     body: `body ${index}`,
    //     date: new Date().toISOString(),
    //   }))
    //   .reverse(),
  );

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

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

  const onRemove = (id: string) => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
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
