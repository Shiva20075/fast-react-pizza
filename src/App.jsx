import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { getData } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder";
import Order, { orderData } from "./features/order/Order";  
import AppLayout from "./ui/AppLayout";
import './index.css';



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: getData, errorElement: <Error /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder />, action: createOrderAction },
      { path: "/order/:id", element: <Order />, loader: orderData },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
