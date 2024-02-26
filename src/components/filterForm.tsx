import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/productsSlice';

const FilterForm: React.FC = () => {
    const dispatch = useDispatch();

    const handleFilterChange = (key: string, value: string | number) => {
        dispatch(setFilter({ [key]: value }));
    };

    return (
        <div>
            <input type="text" placeholder="Фильтр по названию" onChange={(e) => handleFilterChange('product', e.target.value)} />
            <input type="number" placeholder="Фильтр по цене" onChange={(e) => handleFilterChange('price', parseFloat(e.target.value))} />
            <input type="text" placeholder="Фильтр по бренду" onChange={(e) => handleFilterChange('brand', e.target.value)} />
        </div>
    );
};

export default FilterForm;