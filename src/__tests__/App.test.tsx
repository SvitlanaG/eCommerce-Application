import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import App from '@/App';

describe('App component', () => {
  it('renders the application correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
});
