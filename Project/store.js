import { configureStore } from '@reduxjs/toolkit';
import allReducers from './src/reducers';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

// const store = configureStore({ reducer: allReducers })

export const store = configureStore({ reducer: persistedReducer })
export const persistor = persistStore(store)