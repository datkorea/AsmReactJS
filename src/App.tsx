
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutAdmin from './components/LayoutAdmin'
import ProductList from './components/ProductList'
import ProductAdd from './components/ProductAdd'
import ProductEdit from './components/ProductEdit'
import Signin from './components/Signin'
import Signup from './components/Signup'

function App() {

  return (
    <>
      <Routes>
        <Route path='admin' element={<LayoutAdmin />}> 
          {/* //admin routes */}
          <Route index element={<ProductList />} />
          <Route path="products" element={<ProductList />} />
          <Route path='products/add' element={<ProductAdd />} />
          <Route path='products/:id/edit' element={<ProductEdit />} />
        </Route>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
