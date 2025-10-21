import { Form } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { redirect } from "react-router-dom";
import { useNavigation } from "react-router-dom"; 

// Phone number validation
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const fakeCart = [
  { pizzaId: 12, name: "Mediterranean", quantity: 2, unitPrice: 16, totalPrice: 32 },
  { pizzaId: 6, name: "Vegetale", quantity: 1, unitPrice: 13, totalPrice: 13 },
  { pizzaId: 11, name: "Spinach and Mushroom", quantity: 1, unitPrice: 15, totalPrice: 15 },
];

export default function CreateOrder() {
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      {/* ✅ no onSubmit here */}
      <Form method="post">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <input type="tel" name="phone" required />
        </div>

        <div>
          <label>Address</label>
          <input type="text" name="address" required />
        </div>

        <div>
          <input type="checkbox" name="priority" id="priority" />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <button disabled={isSubmitting}>{isSubmitting ? "Placing Order...." : "Order now"}</button>
      </Form>
    </div>
  );
}

// ✅ The route action runs automatically on Form submit
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (!isValidPhone(data.phone)) {
    throw new Error("Invalid phone number");
  }

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`); // ✅ will now navigate automatically
}
