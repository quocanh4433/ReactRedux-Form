import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductItemRedux extends Component {
    render() {
        let { product } = this.props
        return (
            <div className="col-4 mb-3">
                <div className="card">
                    <img src={product.hinhAnh} width="100%" height="350px" alt="..." />
                    <div className="bg-dark text-white p-4">
                        <h5>{product.tenSP}</h5>
                        <p>{product.giaBan.toLocaleString()}</p>
                        <button className="btn btn-success" onClick={() => {
                            {this.props.addCart(product)}
                        }}>Xem vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        )
    }
}

// Hàm gửi dữ liệu lên store
const mapDispatchToProps = (dispatch) => { //dispatch là một hàm
    return {
        addCart: (productClick) => {
            let productInCart = { 
                "maSP": productClick.maSP, 
                "tenSP": productClick.tenSP, 
                "soLuong": 1, 
                "giaBan": productClick.giaBan, 
                "hinhAnh": productClick.hinhAnh 
            };
            // Tạo ra action 
            let action = {
                type: 'ADD_TO_CART', //Thuộc tính bắt buộc
                productInCart  // Dữ liệu muốn gửi đi
            };
            // Dùng hàm dispatch từ redux gửi dữ liệu lên reducer
            dispatch(action);
        }
    }
}

export default connect(null, mapDispatchToProps) (ProductItemRedux)