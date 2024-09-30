import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
  const myCart = useSelector(state=>state.cartReducer)
  const myWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()

  const [product,setProduct] = useState({})
  const {id} = useParams()
  // console.log(id);

//to get products from session storage
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])
  // console.log(product);
  
  //to add items to wishlist
  const handleWishlist = (product)=>{
    if(myWishlist?.includes(product)){
      alert("product  already in your wishlist!!!")
    } else{
      dispatch(addToWishlist(product))
    }
  }
  // console.log(product);

  const handleAddToCart = (product)=>{
    const existingProduct = myCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("product quantity is Incrementing")
    }else{
      dispatch(addToCart(product))
    }
  }
  
  return (
    <>
    <Header/>
    <div style={{minHeight:'90vh'}} className="flex justify-center items-center mx-5">
      <div className="grid grid-cols-2 gap-4">
        <img style={{width:'100%',height:'500px'}} src={product?.thumbnail} alt="" />
        <div style={{paddingTop:'100px'}} className='me-3'>
          <h3>PID : {product?.id}</h3>
          <h1 className="text-3xl font-bold my-2">{product?.title}</h1>
          <h4 className='font-bold text-red-500 text-xl mb-2'>$ {product?.price}</h4>
          <p style={{textAlign:'justify'}}><span className='font-bold mb-2'>Description : </span>{product?.description}</p>
          <div className='flex justify-between m-5 p-3'>
            <button onClick={()=>handleWishlist(product)} className='bg-blue-600 text-white p-2 rounded'>Add to wishlist</button>
            <button onClick={()=>handleAddToCart(product)} className='bg-green-600 text-white p-2 rounded'>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default View