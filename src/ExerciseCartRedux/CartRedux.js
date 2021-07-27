import React, { Component } from 'react'

// Sử dụng thuer viện connect để lấy dữ liêu từ store về
import {connect} from 'react-redux'

class CartRedux extends Component {
    renderCart = () => {
        let {cart} = this.props
        return cart.map((product, index) => {
            return <tr key={index}>
                <td>{product.maSP}</td>
                <td>{product.tenSP}</td>
                <td>
                    <img src={product.hinhAnh} width="50px" />
                </td>
                <td>{product.giaBan}</td>
                <td>
                    <button className="btn btn-primary" onClick={ ()=>{
                        {this.props.changeQunatity(product.maSP, true)}
                    }}>+</button>
                    <span className="pl-2 pr-2">{product.soLuong}</span>
                    <button className="btn btn-danger" onClick={() => {
                        {this.props.changeQunatity(product.maSP, false)}
                    }}>-</button>
                </td>
                <td>{product.giaBan*product.soLuong}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => {
                        this.props.removeProduct(product.maSP)
                    }}>Xóa</button>
                </td>
            </tr>
        })
    }

    totalAmount = () => {
        return this.props.cart.reduce((sum, product)=>{
            return sum += product.soLuong * product.giaBan
        }, 0).toLocaleString()
    }
    render() {
        return (
            <div>
                {/* Modal */}
                <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cart Shop</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Mã</th>
                                            <th>Tên</th>
                                            <th>Hình Ảnh</th>
                                            <th>Giá Bán</th>
                                            <th>Số Lượng</th>
                                            <th>Thành Tiền</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCart()}
                                    </tbody>
                                    <tfoot>
                                        <th colSpan={5}></th>
                                        <th>Tổng tiền</th>
                                        <th>
                                            {this.totalAmount()}
                                        </th>

                                    </tfoot>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Hàm lấy State redux biến đổi thành props của components
const mapStateToProps = state => { // state là sate tổng của ứng dụng
    return {
        cart: state.stateCart.cart
    }
}

// Hàm gửi dữ liệu lên reducer (store)
const mapDispatchToProps = (dispatch) => {
    return {
        removeProduct: (productIDClick) => {
            // Tạo action 
            let action = {
                type: 'REMOVE_PRODUCT',
                productIDClick
            }
            // Dùng phương thức dispatch để cung cấp dữ liệu lên reducer
            dispatch(action)
        },
        changeQunatity: (productIDClick, isIncrease) => { // Nếu isChange = true tăng số lương - nếu isChange = false giảm số lượng
            let action = {
                type: 'CHANGE_QUANTITY',
                productIDClick,
                isIncrease
            }
            // Dùng phương thức dispatch để cung cấp dữ liệu lên reducer
            dispatch(action)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartRedux)