import {combineReducers} from 'redux';
import CartReducer from '../redux/CartReducer'

const rootReducer = combineReducers({ // Store tổng của ứng dụng
    stateCart : CartReducer // State giỏ hàng
})

export default rootReducer