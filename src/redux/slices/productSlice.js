import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts",async ()=>{
    const result= await axios.get("https://dummyjson.com/products") 
    // console.log(result);
    //to store items to session storage
    sessionStorage.setItem("allProducts",JSON.stringify(result.data.products))
   return result.data.products
})

const productSlice = createSlice({
    name : 'products',
    initialState : {
        allProducts : [],        //it  contains all products
        dummyAllProducts : [],  //it also contains all products,it is used to display products based on the search
        loading : false,
        error : ""
    },
    reducers : {
        //search products
        searchProduct : (state,actionFromHeader)=>{
        state.allProducts = state.dummyAllProducts.filter(item=>item.title.toLowerCase().includes(actionFromHeader.payload))
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchAllProducts.fulfilled,(state,apiResult)=>{
            state.allProducts = apiResult.payload
            state.dummyAllProducts = apiResult.payload
            state.loading = false
            state.error = ""
        })
        builder.addCase(fetchAllProducts.pending,(state,apiResult)=>{
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading = true
            state.error = ""
        }) 
        builder.addCase(fetchAllProducts.rejected,(state,apiResult)=>{
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading = false
            state.error = "API call failed.. please try after sometime!!"
        })    
    }
})

export default productSlice.reducer
export const {searchProduct} = productSlice.actions