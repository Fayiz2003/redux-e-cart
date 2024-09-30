import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'
const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,loading,error} = useSelector(state=>state.productReducer)
  // console.log(allProducts);
  //pagination
  const [currentPage,setCurrentPage] = useState(1)
  const productPerPage = 8
  const totalPages = Math.ceil(allProducts.length/productPerPage)
  const currentPageLastProductIndex = currentPage * productPerPage
  const currentPageStartProductIndex = currentPageLastProductIndex - productPerPage
  const visibleProductCards = allProducts?.slice(currentPageStartProductIndex,currentPageLastProductIndex)
  
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

 //navigate to next page
  const navigateToNextPage = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  //navigate to previous page
  const navigateToPrevPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <>
      <Header insideHome={true}/>
      <div style={{marginTop:'90px'}} className='container mx-auto px-4'>
        {
          loading ?
          <div style={{height:'60vh'}} className='flex justify-center items-center font-bold'>
            <img width={'100px'} height={'100px'} src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif" alt="" />
            Loading...
          </div>
          :
          <>
             <div className='grid grid-cols-4 gap-4'>
            {
              allProducts.length>0 ?
              visibleProductCards?.map(product=>(
                <div key={product?.id} className='rounded border p-2 shadow'>
                  <img style={{width:'100%', height:'300px'}} src={product?.thumbnail} alt="" />
                  <div className='text-center'>
                    <h3 className='text-xl font-bold mb-2'>{product?.title}</h3>
                    <Link className='bg-blue-500 text-white p-2 inline-block rounded' to={`/${product?.id}/view`}>View more</Link>
                  </div>
                </div>
              ))
              :
              <div className='font-bold text-center mt-5 mb-5 text-red-600'>
                Product Not Found!!!
              </div>
            }
             </div>
             {/* {pagination} */}
             <div className="flex justify-center items-center mt-5 mb-5">
              <span onClick={navigateToPrevPage} style={{cursor:'pointer'}}> <i className="fa-solid fa-backward me-5"></i> </span>
              <span className='font-bold'> {currentPage} of {totalPages}</span>
              <span onClick={navigateToNextPage} style={{cursor:'pointer'}}> <i className="fa-solid fa-forward ms-5"></i> </span>

             </div>
          </>

        }
      </div>
      </>
  )
}

export default Home