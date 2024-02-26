import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import md5 from 'md5';

interface Product {
	id: string;
	product: string;
	price: number;
	brand: string | null;
}

interface ProductsState {
	products: Product[];
	status: 'idle' | 'loading' | 'failed';
	error: string | null;
	page: number;
	filter: {
		product?: string;
		price?: number;
		brand?: string;
	};
}

const initialState: ProductsState = {
	products: [],
	status: 'idle',
	error: null,
	page: 1,
	filter: {},
};

const authHeader = {
	'X-Auth': md5(`Valantis_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`),
};

const apiUrl = 'http://api.valantis.store:40000/';

interface FetchProductsArgs {
	page: number;
	filter?: {
		product?: string;
		price?: number;
		brand?: string;
	};
}

export const fetchProducts = createAsyncThunk<Product[], FetchProductsArgs>(
	'products/fetchProducts',
	async ({ page, filter }) => {
		try {
			const response = await axios.post(
				apiUrl,
				{
					action: 'get_ids',
					params: {
						offset: (page - 1) * 50,
						limit: 50,
						...filter,
					},
				},
				{ headers: authHeader }
			);
			const ids = response.data.result as string[];
			const productsResponse = await axios.post(
				apiUrl,
				{
					action: 'get_items',
					params: {
						ids,
					},
				},
				{ headers: authHeader }
			);
			const products = productsResponse.data.result as Product[];
			return products.filter(
				(product, index, self) => index === self.findIndex((p) => p.id === product.id)
			);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				console.error('Unauthorized');
			} else if (error.response && error.response.data && error.response.data.error) {
				console.error(error.response.data.error);
			} else {
				console.error('An error occurred while fetching products');
			}
			throw error;
		}
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setFilter: (state, action: PayloadAction<{ [key: string]: string | number | undefined }>) => {
			state.filter = action.payload;
		},
		setIsFiltering: (state, action: PayloadAction<boolean>) => {
			state.isFiltering = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'idle';
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || null;
			});
	},
});

export const { setPage, setFilter, setIsFiltering } = productsSlice.actions;

export default productsSlice.reducer;
