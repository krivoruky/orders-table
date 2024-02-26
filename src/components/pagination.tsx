import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPage } from '../store/productsSlice';

const Pagination: React.FC = () => {
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.products.page);

    const handlePrevPage = () => {
        dispatch(setPage(page - 1));
    };

    const handleNextPage = () => {
        dispatch(setPage(page + 1));
    };

    return (
        <div>
            <button onClick={handlePrevPage} disabled={page === 1}>Предыдущая страница</button>
            <button onClick={handleNextPage}>Следующая страница</button>
        </div>
    );
};

export default Pagination;