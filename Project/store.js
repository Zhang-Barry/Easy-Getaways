import { configureStore } from '@reduxjs/toolkit';
import allReducers from './src/reducers';


const store = configureStore({ reducer: allReducers })

export default store;