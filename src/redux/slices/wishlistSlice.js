import { createSlice } from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
    name : "wishlist",
    initialState : [] ,
    reducers : {
        // add product to wishlist cmponent must pass entire product object
        addToWishlist : (state,productByComponentAction)=>{
            state.push(productByComponentAction.payload)
        },
        // remove from wishlist componenet must pass product id.........
        removeWishlistItem : (state,productByComponentAction)=>{
            return state.filter(item=>item.id!=productByComponentAction.payload)

        }
    }

})

export const {addToWishlist,removeWishlistItem} = wishlistSlice.actions
export default wishlistSlice.reducer