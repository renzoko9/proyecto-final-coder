import './CartWidget.css'

import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const CartWidget = () => {
  return (
    <div className='cart_count'>
      <ShoppingCartIcon height={24}/>
      <span>5</span>
    </div>
  )
}

export default CartWidget
