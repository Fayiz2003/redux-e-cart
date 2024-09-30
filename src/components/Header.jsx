import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  const myWishlist = useSelector(state=>state.wishlistReducer)
  const myCart = useSelector(state=>state.cartReducer)

  return (
    <nav className='flex w-full bg-yellow-500 fixed top-0 p-5 items-center'>
      <Link className='text-white font-semibold text-2xl' to={'/'}>E Cart <i className="fa-solid fa-truck-fast me-1"></i></Link>
      <ul className='flex-1 text-right'>
        {
          insideHome && 
          <li className='list-none inline-block px-5'>
          <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} style={{width:'300px'}} className='rounded p-1' type="text" placeholder='search products here!' />
          </li>
        } 
        <li className='list-none inline-block px-5'><Link to={'/wishlist'}> <i className='fa-solid fa-heart text-red-600 me-1'></i>Wishlist <span className='bg-black p-1 rounded text-white'>{myWishlist.length}</span> </Link></li>
        <li className='list-none inline-block px-5'><Link to={'/cart'}><i className="fa-solid fa-cart-shopping me-1 text-green-600"></i>Cart <span className='bg-black p-1 rounded text-white'>{myCart.length} </span></Link></li>
      </ul>
    </nav>
  )
}

export default Header