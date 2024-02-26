import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductRow from './productRows';
import Pagination from './pagination';
import FilterForm from './filterForm';

const ProductsTable: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Бренд</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <ProductRow key={product.id} index={index + 1} product={product} />
                    ))}
                </tbody>
            </table>
            <Pagination />
            <FilterForm />
        </div>
    );
};

export default ProductsTable;