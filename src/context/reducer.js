import { ACTIONS } from './actions';
import {
  addToFavourite,
  bookmark,
  closeToast,
  createPost,
  deletePost,
  follow,
  getPosts,
  like,
  login,
  logout,
  save,
  sendMessage,
  switchAccount,
  openToast,
  getUser,
  updateSocket,
  updateNotifications,
  updateUser,
  updateOlineUsers,
  toggleVisibility,
} from './controllers';

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return login(state, action.payload);
    case ACTIONS.GET_USER:
      return getUser(state);
    case ACTIONS.UPDATE_USER:
      return updateUser(state, action.payload);
    case ACTIONS.like:
      return like(state, action.payload);
    case ACTIONS.get_Posts:
      return getPosts(state);
    case ACTIONS.bookmark:
      return bookmark(state, action.payload);
    case ACTIONS.save:
      return save(state, action.payload);
    case ACTIONS.follow:
      return follow(state, action.payload);
    case ACTIONS.logout:
      return logout(state);
    case ACTIONS.switchAccount:
      return switchAccount(state, action.payload);
    case ACTIONS.createPost:
      return createPost(state, action.payload);
    case ACTIONS.sendMessage:
      return sendMessage(state, action.payload);
    case ACTIONS.deletePost:
      return deletePost(state, action.payload);
    case ACTIONS.addToFavourite:
      return addToFavourite(state, action.payload);
    case ACTIONS.CLOSE_TOAST:
      return closeToast(state);
    case ACTIONS.OPEN_TOAST:
      return openToast(state, action.payload);
    case ACTIONS.UPDATE_SOCKET:
      return updateSocket(state, action.payload);
    case ACTIONS.UPDATE_NOTIFICATION:
      return updateNotifications(state, action.payload);
    case ACTIONS.UPDATE_ONLINE_USERS:
      return updateOlineUsers(state, action.payload);
    case ACTIONS.TOGGLE_VISIBILTY:
      return toggleVisibility(state, action.payload);
    default:
      throw new Error('Unhandled  action type !!!');
  }
};
