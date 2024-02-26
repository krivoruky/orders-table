import React from 'react';
import { useAppSelector } from '../store/index';
import Product from './Product';

const ProductsList: React.FC = () => {
	const products = useAppSelector((state) => state.products.products);

	return (
		<table>
			<thead>
				<tr>
					<th>№</th>
					<th>ID</th>
					<th>Название</th>
					<th>Цена</th>
					<th>Бренд</th>
				</tr>
			</thead>
			<tbody>
				{products && products.map((product) => (
					<Product key={product.id} product={product} index={product.index} />
				))}
			</tbody>
		</table>
	);
};

export default ProductsList;
