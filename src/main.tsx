import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductsPage from './components/ProductsPage';
import { Provider } from 'react-redux';
import { store } from './store/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ProductsPage />
		</Provider>
	</React.StrictMode>
);