import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index';
import { fetchProducts } from '../store/productsSlice';
import ProductsList from './ProductsList';
import Pagination from './Pagination';
import Filter from './Filter';

const ProductsPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const page = useAppSelector((state) => state.products.page);
	const filter = useAppSelector((state) => state.products.filter);
	const isFiltering = useAppSelector((state) => state.products.isFiltering);
	const error = useAppSelector((state) => state.products.error);
	const isFirstLoad = useRef(true);

	useEffect(() => {
		if (isFirstLoad.current || isFiltering) {
			dispatch(fetchProducts({ page, filter }));
		}

		if (isFirstLoad.current) {
			isFirstLoad.current = false;
		}
	}, [dispatch, page, filter, isFiltering]);

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<Filter />
			<ProductsList />
			<Pagination />
		</div>
	);
};

export default ProductsPage;
