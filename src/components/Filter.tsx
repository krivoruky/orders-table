import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setIsFiltering } from '../store/productsSlice';

const Filter: React.FC = () => {
	const dispatch = useDispatch();
	const filter = useSelector((state) => state.products.filter);
	const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout | null>(null);

	const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (filterTimeout) {
			clearTimeout(filterTimeout);
		}
		setFilterTimeout(
			setTimeout(() => {
				dispatch(setIsFiltering(true));
				dispatch(setFilter({ ...filter, [event.target.name]: event.target.value }));
			}, 2000)
		);
	}, [dispatch, filter, filterTimeout]);

	return (
		<>
			<input
				type="text"
				name="product"
				placeholder="Фильтр по названию"
				onChange={handleFilterChange}
			/>
			<input
				type="number"
				name="price"
				placeholder="Фильтр по цене"
				onChange={handleFilterChange}
			/>
			<input
				type="text"
				name="brand"
				placeholder="Фильтр по бренду"
				onChange={handleFilterChange}
			/>
		</>
	);
};

export default Filter;
