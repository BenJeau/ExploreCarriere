import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({
	collapsed: true
});

// Ajoute redux-logger à Redux (pour être capable de facilement voir les actions et l'état de Redux)
const createStoreWithMiddleware = applyMiddleware(
	loggerMiddleware,
)(createStore);

// Sauve l'information de Redux dans la mémoire de l'appareil (persiste l'information)
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Crée l'état de Redux et sont persistor
export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store);