import {combineReducers} from 'redux';
import { BaiTapQuanLyNguoiDungReducer } from './reducer/BaiTapQuanLiNguoiDungReducer';


const rootReducer = combineReducers({ // Store tổng của ứng dụng
    BaiTapQuanLyNguoiDungReducer
})

export default rootReducer