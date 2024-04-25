import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { ThemeProvider } from 'styled-components';
import { useAppContext } from './context/AppContext';
import { theme } from './theme/theme';
import Toast from './components/models/Toast';

const App = () => {
  const {
    darkMode,
    toastMessage,
    showToast,
    closeToast,
    socket,
    toggleVisibilty,
  } = useAppContext();
  // console.log(darkMode, 'dark mode');

  const handleVisibilty = () => {
    toggleVisibilty(document.hidden);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilty);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilty);
    };
  }, []);
  useEffect(() => {
    console.log(socket);
  }, [socket]);
  return (
    <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
      <RouterProvider router={router} />
      {showToast && (
        <Toast
          messege={toastMessage}
          handleToast={closeToast}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
