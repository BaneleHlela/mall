import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { NavbarProvider } from './utils/context/NavBarContext.tsx';
import { store } from './app/store';
import './index.css';
import App from './App.tsx';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <NavbarProvider>   
        <App />
      </NavbarProvider>
    </Provider>
  </StrictMode>,
);
