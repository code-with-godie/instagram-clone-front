import { postData } from '../api/apiCalls';

export const getUser = state => {
  const user = JSON.parse(localStorage.getItem('insta-clone-user'));
  const token = JSON.parse(localStorage.getItem('insta-clone-access-token'));
  return { ...state, user, token, loading: false };
};
export const login = (state, { token, user }) => {
  localStorage.setItem('insta-clone-user', JSON.stringify(user));
  localStorage.setItem('insta-clone-access-token', JSON.stringify(token));
  return { ...state, token, user };
};
export const updateUser = (state, payload) => {
  localStorage.setItem('insta-clone-user', JSON.stringify(payload));
  return { ...state, user: payload };
};
export const updateSocket = (state, payload) => {
  return { ...state, socket: payload };
};
export const updateNotifications = (state, payload) => {
  return { ...state, notifications: payload };
};
export const updateOlineUsers = (state, payload) => {
  return { ...state, onlineUsers: payload };
};

export const getPosts = state => {
  try {
    console.log('fetching post');
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const like = (state, payload) => {
  try {
    console.log('liking a post', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const bookmark = (state, payload) => {
  try {
    console.log('bookmarking a post', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const save = (state, payload) => {
  try {
    console.log('saving a post', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const follow = (state, payload) => {
  try {
    console.log('following user', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const addComment = (state, payload) => {
  try {
    console.log('adding comment', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const logout = state => {
  try {
    console.log('logging out');
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const switchAccount = (state, payload) => {
  try {
    console.log('switching account', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const sendMessage = (state, payload) => {
  try {
    console.log('sending  message', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const createPost = (state, payload) => {
  try {
    console.log('creating post', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const deletePost = (state, payload) => {
  try {
    console.log('deleteing post with id ', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};
export const addToFavourite = (state, payload) => {
  try {
    console.log('adding post to favourite with id ', payload);
  } catch (error) {
    console.log(error);
  }
  return state;
};

export const openToast = (state, payload) => ({
  ...state,
  toastMessage: payload,
  showToast: true,
});
export const closeToast = state => ({
  ...state,
  showToast: false,
  toastMessage: '',
});
export const toggleVisibility = (state, payload) => {
  return { ...state, isPageHidden: payload };
};
