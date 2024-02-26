import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import ProductsTable from './components/productsTable.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<React.StrictMode>
			<ProductsTable />
		</React.StrictMode>
	</Provider>,
)
