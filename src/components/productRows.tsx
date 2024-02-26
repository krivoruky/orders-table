import React from 'react';
import { Product } from '../store/productsSlice';

type Props = {
    index: number;
    product: Product;
};

const ProductRow: React.FC<Props> = ({ index, product }) => (
    <tr>
        <td>{index}</td>
        <td>{product.id}</td>
        <td>{product.product}</td>
        <td>{product.price}</td>
        <td>{product.brand}</td>
    </tr>
);

export default ProductRow;