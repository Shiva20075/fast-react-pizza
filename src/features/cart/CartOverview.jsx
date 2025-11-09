import { Link } from 'react-router-dom';
function CartOverview() {
  return (
    <div   className='bg-blue-500  p-4 text-semibold uppercase text-stone-200 flex justify-between'>
      <p>
        <span >23 - pizzas</span>
        <span >  = $23.45</span>
      </p>
      <Link to="/cart" className='text-red-500'> OPEN CART ---> </Link>
    </div>
  );
}

export default CartOverview;
