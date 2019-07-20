import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

// Combine les réduceurs Redux pour créer un seul magasin (store)
export default combineReducers({
	UserReducer
});