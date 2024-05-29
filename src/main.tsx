import { StrictMode } from 'react';
import '@/assets/css/index.css';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Analytics } from '@vercel/analytics/react';
import App from './App';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Analytics />
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>,
  );
}
