import { useDispatch } from "react-redux";
import cn from "classnames";
import { Delete, Minus, Plus } from "react-feather";
import {
  removeProductFromCart,
  updateCartProduct,
} from "../../redux/slices/cartSlice";

const CartItem = (props) => {
  const { cart, className = "" } = props;
  const dispatch = useDispatch();

  const addQuantity = () => {
    dispatch(
      updateCartProduct({
        ...cart,
        quantity: cart.quantity + 1,
      })
    );
  };

  const deductQuantity = () => {
    if (cart.quantity === 1) return;
    dispatch(updateCartProduct({ ...cart, quantity: cart.quantity - 1 }));
  };

  const removeProduct = () => {
    dispatch(removeProductFromCart({ productId: cart.product.id }));
  };

  return (
    <div className={cn(className)}>
      <div className="flex gap-5 text-gray-700 dark:text-white">
        <div className="flex items-center gap-5 min-w-[300px]">
          <img src={cart.product.image} alt="product" className="w-[80px]" />
          <p className="font-bold text-md">{cart.product.name}</p>
        </div>
        <div className="flex items-center gap-3 text-sm min-w-[150px]">
          <p>${cart.product.price}</p>
          <del className="text-gray-500">
            ${cart.product.price + cart.product.discount}
          </del>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center justify-center rounded-lg border px-2 py-1">
            <Plus
              size={20}
              className="cursor-pointer dark:text-white"
              onClick={addQuantity}
            />
            <p className="text-md dark:text-white select-none text-center min-w-[50px]">
              {cart.quantity || ""}
            </p>
            <Minus
              size={20}
              className="cursor-pointer dark:text-white"
              onClick={deductQuantity}
            />
          </div>
          <div className="pl-5">
            <Delete
              size={18}
              className="cursor-pointer"
              onClick={removeProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
