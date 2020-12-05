import React from 'react'
import {connect} from 'react-redux'
import CustomButton from "../custom-button/custom-button.component";

import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from '../../reducers/cart/cart.selectors'
import {createStructuredSelector} from "reselect";
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../../actions/cart.action'

import './cart-dropdown.styles.scss'

const CartDropdown = ({cartItems, history, dispatch}) => {
  return(
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {
          cartItems.length
            ? cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem}/>
            ))
            : (<span className='empty-message'>Your cart is empty</span>)
        }
      </div>
      <CustomButton onClick={() => {
        history.push('/checkout')
        dispatch(toggleCartHidden())
      }
      }>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

// const mapDispatchToProps = dispatch => ({
//   toggleCartHidden: dispatch(toggleCartHidden())
// })

export default withRouter(
  connect(
    mapStateToProps
  )(CartDropdown)
)