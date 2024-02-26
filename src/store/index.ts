import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import productsReducer from './productsSlice';

const rootReducer = combineReducers({
	products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
