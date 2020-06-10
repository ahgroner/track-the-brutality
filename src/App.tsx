import React from 'react';
import { DataContextProvider } from './components/data-context';
import { Header } from './components/header';
import { List } from './components/list';

import { GlobalStyle } from './components/global-style';
import { Filter } from './components/filter';


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <DataContextProvider>
        <Header />
        <Filter />
        <List />
      </DataContextProvider>
    </div>
  );
}

export default App;
