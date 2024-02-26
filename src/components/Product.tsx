import React from 'react';

type ProductProps = {
	product: {
		id: string;
		product: string;
		price: number;
		brand: string;
	},
	index: number;
};

const Product: React.FC<ProductProps> = ({ product, index }) => {
	return (
		<tr>
			<td>{index}</td>
			<td>{product.id}</td>
			<td>{product.product}</td>
			<td>{product.price}</td>
			<td>{product.brand}</td>
		</tr>
	);
};

export default Product;