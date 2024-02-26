import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export type Product = {
    id: string;
    product: string;
    price: number;
    brand: string;
};

type ProductsState = {
    products: Product[];
    page: number;
    filter: {
        product?: string;
        price?: number;
        brand?: string;
    };
};

const initialState: ProductsState = {
    products: [],
    page: 1,
    filter: {},
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setFilter(state, action: PayloadAction<{ product?: string; price?: number; brand?: string }>) {
            state.filter = action.payload;
        },
    },
});

export const { setProducts, setPage, setFilter } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectPage = (state: RootState) => state.products.page;
export const selectFilter = (state: RootState) => state.products.filter;

export default productsSlice.reducer;