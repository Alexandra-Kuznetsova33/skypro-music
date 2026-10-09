'use client';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthInit from './redux/AuthInit';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}><AuthInit>{children}</AuthInit></Provider>;
}