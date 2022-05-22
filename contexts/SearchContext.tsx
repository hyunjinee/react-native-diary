import React, {useState, createContext, useContext} from 'react';

interface SearchContextValue {
  keyword: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchContextProvider({children}: {children: React.ReactNode}) {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error('useSearch must be used within a SearchContextProvider');
  }
  return context;
}

export default SearchContext;
