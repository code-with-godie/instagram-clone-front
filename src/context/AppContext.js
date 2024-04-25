import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { ACTIONS } from './actions';
import { updateData } from '../api/apiCalls';
import FirstLoading from '../components/loading/FirstLoading';

const AppContext = createContext({
  user: null,
  token: null,
  socket: null,
  darkMode: true,
  notifications: [],
});

export const AppContextProvider = ({ children }) => {
  const intialState = {
    user: null,
    onlineUsers: [],
    token: null,
    loading: true,
    toastMessage: '',
    showToast: false,
    socket: null,
    darkMode: false,
    followings: [],
    notifications: [],
    isPageHidden: false,
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  //controllers
  const login = payload => {
    dispatch({ type: ACTIONS.LOGIN, payload });
  };
  const getUser = () => {
    dispatch({ type: ACTIONS.GET_USER });
  };
  const updateUser = payload => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload });
  };
  const updateOnlineUsers = payload => {
    dispatch({ type: ACTIONS.UPDATE_ONLINE_USERS, payload });
  };
  const updateNotification = payload => {
    dispatch({ type: ACTIONS.UPDATE_NOTIFICATION, payload });
  };
  const updateSocket = payload => {
    dispatch({ type: ACTIONS.UPDATE_SOCKET, payload });
  };
  const closeToast = () => {
    dispatch({ type: ACTIONS.CLOSE_TOAST });
  };
  const openToast = payload => {
    dispatch({ type: ACTIONS.OPEN_TOAST, payload });
  };
  const save = id => {
    dispatch({ type: ACTIONS.save, payload: id });
  };
  const toggleVisibilty = payload => {
    dispatch({ type: ACTIONS.TOGGLE_VISIBILTY, payload });
  };
  const follow = async userID => {
    try {
      const res = await updateData(`/users/follow/${userID}`, {}, state.token);
      updateUser(res.user);
      return res;
    } catch (error) {
      const messege =
        error?.response?.data?.message?.toLowerCase() ||
        'Something went wrong.Try again later.';
      openToast(messege);
    }
  };

  const share = {
    ...state,
    login,
    save,
    updateFollowings: () => {},
    setSocket: () => {},
    setToken: () => {},
    updateUser,
    setUser: () => {},
    follow,
    closeToast,
    openToast,
    updateSocket,
    updateNotification,
    updateOnlineUsers,
    toggleVisibilty,
  };

  useEffect(getUser, []);

  return (
    <AppContext.Provider value={{ ...share }}>
      {state.loading ? <FirstLoading /> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
