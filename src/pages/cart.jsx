import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Container from "../components/ui/container";
import CartItem from "../components/cart/cart-item";
import { clearAllCart } from "../redux/slices/cartSlice";
import { getErrorMessage } from "../utils/utils";
import orderApi from "../services/order/orderApi";

const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cartList);

  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    let allDiscount = 0;
    let allTotal = 0;

    cartList.forEach((cart) => {
      allDiscount += cart.quantity * cart.product.discount;
      allTotal += cart.quantity * cart.product.price;
    });

    setDiscount(allDiscount);
    setTotal(allTotal);
  }, [cartList]);

  const clearCart = () => {
    dispatch(clearAllCart());
  };

  const order = async () => {
    if (!cartList.length) return;

    const items = Array.from(cartList, (cart) => {
      return { product: cart.product.id, quantity: cart.quantity };
    });

    try {
      await orderApi({
        items,
        remarks,
      });

      clearCart();
      toast.success("Your order is successful, Please check your email.");
    } catch (error) {
      const errorMessage = getErrorMessage(error, ["remarks"]);
      toast.error(errorMessage);
    }
  };

  if (!cartList.length) {
    return (
      <Container className="min-h-[calc(100vh-200px)] mt-10">
        <div>
          <p className="text-gray-700 dark:text-white">
            Please add at least one product on cart
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="min-h-[calc(100vh-200px)] mt-10">
      <div className="flex gap-5">
        <div className="w-full max-w-[700px]">
          {cartList.map((cart) => (
            <CartItem key={cart.product.id} cart={cart} className="mt-5" />
          ))}
        </div>
        <div className="w-full max-w-[350px] mt-5">
          <div className="shadow p-4 rounded-md dark:bg-[#222222]">
            <p className="font-bold text-lg text-gray-700 dark:text-white">
              Order Info
            </p>
            <div className="flex text-gray-700 dark:text-white">
              <div className="grow font-semibold">
                <p className="mt-3">Total</p>
                <p className="mt-2 ">Discount</p>
                <p className="mt-2">Grand Total</p>
              </div>
              <div className="flex-none font-semibold">
                <p className="mt-3">$ {total.toFixed(2)}</p>
                <p className="mt-2">$ {discount.toFixed(2)}</p>
                <p className="mt-2">$ {(total - discount).toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-10">
              <hr />
              <label
                htmlFor="remarks"
                className="block text-sm text-gray-700 mt-5 dark:text-white"
              >
                Remarks
              </label>
              <input
                type="text"
                className="border rounded-md w-full px-2 py-1 bg-transparent text-gray-700 dark:text-white outline-none"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-5">
              <button
                className="bg-red-700 mt-5 px-5 py-1 rounded-md text-white"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-primary mt-5 px-5 py-1 rounded-md text-white"
                onClick={order}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
