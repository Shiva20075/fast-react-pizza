import { useLoaderData } from "react-router-dom";
import { calcMinutesLeft, formatCurrency, formatDate } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant"; 
export default function Order() {
  const order = useLoaderData();

  // Keep id and cart even if unused
  // eslint-disable-next-line no-unused-vars
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>
        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

// Loader function stays in this file
export async function orderData({ params }) {
  const order = await getOrder(params.id); // return order object directly
  return order;
}
