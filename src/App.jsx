import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import View from './pages/View'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Pnf from './pages/Pnf'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/Wishlist' element={<Wishlist/>} />
       <Route path='/Cart' element={<Cart/>} />
       {/* : indicate which is the path parameter of url,path parameter will be stored in variable id */}
       <Route path='/:id/View' element={<View/>} />
       <Route path='/*' element={<Pnf/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
