import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/index';
import { setPage } from '../store/productsSlice';

const Pagination: React.FC = () => {
	const dispatch = useAppDispatch();
	const page = useAppSelector((state) => state.products.page);

	const handlePrevPageClick = () => {
		if (page > 1) {
			dispatch(setPage(page - 1));
		}
	};

	const handleNextPageClick = () => {
		dispatch(setPage(page + 1));
	};

	return (
		<div>
			<button onClick={handlePrevPageClick} disabled={page === 1}>
				Предыдущая страница
			</button>
			<button onClick={handleNextPageClick}>Следующая страница</button>
		</div>
	);
};

export default Pagination;
