import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

const API_URL = 'http://api.valantis.store:40000/';
const password = 'Valantis';

const generateXAuth = () => {
	const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	return md5(`${password}_${timestamp}`);
};

const sendRequest = async (action, params) => {
	const xAuth = generateXAuth();
	const config = {
		headers: {
			'X-Auth': xAuth,
		},
	};

	try {
		const response = await axios.post(API_URL, { action, params }, config);
		return response.data.result;
	} catch (error) {
		console.error('Произошла ошибка при запросе к API:', error.message);
		return null;
	}
};

const useProducts = () => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const offset = (page - 1) * 50;
			let filteredIds;

			if (Object.keys(filter).length === 0) {
				filteredIds = await sendRequest('get_ids', { offset, limit: 50 });
			} else {
				const filterParams = { ...filter, offset, limit: 50 };
				filteredIds = await sendRequest('filter', filterParams);
			}

			if (filteredIds) {
				const itemsResponse = await sendRequest('get_items', { ids: filteredIds });
				if (itemsResponse) {
					const uniqueProducts = {};
					itemsResponse.forEach(item => {
						if (!uniqueProducts[item.id]) {
							uniqueProducts[item.id] = item;
						}
					});
					setProducts(Object.values(uniqueProducts));
				}
			}
		};

		fetchData();
	}, [page, filter]);

	return { products, page, setPage, filter, setFilter };
};

const ProductsTable = () => {
	const { products, page, setPage, filter, setFilter } = useProducts();

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Название</th>
						<th>Цена</th>
						<th>Бренд</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.product}</td>
							<td>{product.price}</td>
							<td>{product.brand}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => setPage(page - 1)} disabled={page === 1}>Предыдущая страница</button>
			<button onClick={() => setPage(page + 1)}>Следующая страница</button>
			<input type="text" placeholder="Фильтр по названию" onChange={(e) => setFilter({ ...filter, product: e.target.value || undefined })} />
			<input type="text" placeholder="Фильтр по цене" onChange={(e) => setFilter({ ...filter, price: parseFloat(e.target.value) || undefined })} />
			<input type="text" placeholder="Фильтр по бренду" onChange={(e) => setFilter({ ...filter, brand: e.target.value || undefined })} />
		</div>
	);
};

export default ProductsTable;