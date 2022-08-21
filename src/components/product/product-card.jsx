import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { Minus, Plus } from "react-feather";
import {
  addProductOnCart,
  removeProductFromCart,
  updateCartProduct,
} from "../../redux/slices/cartSlice";

const getCartProduct = (props) => {
  const { cartList, productId } = props;
  return cartList.find((cart) => cart.product.id === productId);
};

const ProductCard = (props) => {
  const { id, name, price, discount, image, className } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.cart.cartList);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const product = getCartProduct({ cartList, productId: id });
    if (product) setQuantity(product.quantity || 0);
    else setQuantity(0);
  }, [cartList, id]);

  const openViewProduct = () => navigate(`/product/${id}/`);

  const addProduct = () => {
    dispatch(
      addProductOnCart({
        product: { id, name, price, discount, image },
        remarks: "",
        quantity: 1,
      })
    );
  };

  const addQuantity = () => {
    const cart = getCartProduct({ cartList, productId: id });
    dispatch(updateCartProduct({ ...cart, quantity: cart.quantity + 1 }));
  };

  const deductQuantity = () => {
    const cart = getCartProduct({ cartList, productId: id });
    if (cart.quantity === 1) {
      dispatch(removeProductFromCart({ productId: id }));
      return;
    }
    dispatch(updateCartProduct({ ...cart, quantity: cart.quantity - 1 }));
  };

  return (
    <div
      className={cn(
        "bg-white shadow-md rounded-3xl max-w-[350px] overflow-hidden dark:bg-darkBg",
        className
      )}
    >
      <img
        src={image}
        alt="product"
        className="h-[270px] w-full bg-gray-200 cursor-pointer"
        onClick={openViewProduct}
      />
      <div className="p-5 border-none outline-none">
        <p className="text-gray-800 dark:text-white">{name}</p>
        <div className="flex justify-between">
          <p className="font-bold mt-2 text-orange-600">
            Rs. {price.toFixed(2)}
          </p>
          <div>
            {quantity ? (
              <div className="flex items-center justify-center rounded-lg border px-2 py-1">
                <Plus
                  size={20}
                  className="cursor-pointer dark:text-white"
                  onClick={addQuantity}
                />
                <p className="text-md dark:text-white select-none text-center min-w-[50px]">
                  {quantity || ""}
                </p>
                <Minus
                  size={20}
                  className="cursor-pointer dark:text-white"
                  onClick={deductQuantity}
                />
              </div>
            ) : (
              <Plus
                className="rounded-md p-1 cursor-pointer text-white bg-primary"
                onClick={addProduct}
              />
            )}
          </div>
        </div>
        {discount ? (
          <del className="text-sm text-gray-600 dark:text-gray-200">
            Rs. {(price + discount).toFixed(2)}
          </del>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
