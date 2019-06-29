import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({
	collapsed: true
});

const createStoreWithMiddleware = applyMiddleware(
	loggerMiddleware,  // redux-logger
)(createStore);

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store);