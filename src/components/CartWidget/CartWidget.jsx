import { useContext } from 'react';
import './CartWidget.css'

import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {

  const { itemsCart } = useContext(CartContext);

  return (
    <div className='cart_count'>
      <ShoppingCartIcon height={24}/>
      <span>{ itemsCart.length }</span>
    </div>
  )
}

export default CartWidget
