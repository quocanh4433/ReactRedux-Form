import React, { Component } from 'react'
import CartRedux from './CartRedux'
import ProductListRedux from './ProductListRedux'
import { connect } from 'react-redux'

class ExerciseCartRedux extends Component {
    renderQuantity = () => {
        return this.props.cart.reduce((sum, prodcutInCart, index) => {
            return sum += prodcutInCart.soLuong
        }, 0).toLocaleString()

    }
    render() {
        return (
            <div className="container">
                <h3 className="m-3 text-center">EXERCISE CART REDUX</h3>
                <div className="text-right mb-3">
                    <span className="btn btn-success" data-toggle="modal" data-target="#modelId">Cart Shop ({this.renderQuantity()})</span>
                </div>
                <ProductListRedux />
                <CartRedux />
            </div>
        )
    }
}

// Hàm lấy giá trị state từ store về biến thành props 
const mapStateToProps = (state) => {
    return {
        cart: state.stateCart.cart
    }

}

export default connect(mapStateToProps)(ExerciseCartRedux)
