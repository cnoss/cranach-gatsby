import { createContext } from 'react';
import { configure } from 'mobx';

configure({
  useProxies: 'never',
});

export default createContext();
