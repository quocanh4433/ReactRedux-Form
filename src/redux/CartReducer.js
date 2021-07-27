// Setup State giỏ hàng
const stateCart = {
    cart: [
        // { "maSP": 1, "tenSP": "VinSmart Live", "soLuong": 0, "giaBan": 5700000, "hinhAnh": "./img/vsphone.jpg" },
    ]
}

const CartReducer = (state = stateCart, action) => {
    switch(action.type) {
        case 'ADD_TO_CART': {
            let index = state.cart.findIndex(prdCart => prdCart.maSP === action.productInCart.maSP);
            if ( index != -1) {
                state.cart[index].soLuong += 1;
            } else {
                state.cart.push(action.productInCart);
            }
            // setState trong redux

            // Biến state củ thành state mới bằng rest param để tạo vùng nhớ mới
            // KHi có vùng nhớ mới thì giao diện mới render lại
            // Nếu không state.cart vẫn có thêm phần tử mới nhưng gioa diện không render lại
            state.cart = [...state.cart]
            return {... state}

            // Nếu xét theo kiểu này thì giao diện sẽ không render lại
            // return state
        }; break;
        case 'REMOVE_PRODUCT': {
            let cartUpdate = [...state.cart]

            // Tìm ra phần tử cần xóa dựa vào mã sản phẩm
            let index = cartUpdate.findIndex( prdCart => prdCart.maSP === action.productIDClick)

            if (index !== -1) {
                cartUpdate.splice(index,1)
            }

            // Cập nhật lại giỏ hàng
            state.cart = cartUpdate
            return {...state}
        }; break;
        case 'CHANGE_QUANTITY': {
            let cartUpdate = [...state.cart]

            // Tìm ra phần tử cần xóa dựa vào mã sản phẩm
            let index = cartUpdate.findIndex( prdCart => prdCart.maSP === action.productIDClick)

            if (index !== -1) {
                if (action.isIncrease) {
                    cartUpdate[index].soLuong += 1;
                } else {
                    if (cartUpdate[index].soLuong > 1) {
                        cartUpdate[index].soLuong -= 1;
                    } else {
                        alert('Số lượng tối thiểu là 1 sản phẩm')
                    }
                }
            }
            // Cập nhật lại giỏ hàng
            state.cart = cartUpdate
            return {...state}
        }; break;
        
        default: return {... state}
    }
}

export default CartReducer