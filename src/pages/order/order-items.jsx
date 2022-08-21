import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "../../components/ui/container";
import { getErrorMessage } from "../../utils/utils";
import getOrderItemsApi from "../../services/order/getOrderItems";

const OrderItems = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const setOrderItems = async (id) => {
    try {
      const orderItemResData = await getOrderItemsApi(id);
      setItems(orderItemResData.items);
      setIsLoading(false);
    } catch (error) {
      const validatorKeys = ["error", "message", "detail", "id"];
      const errorMessage = getErrorMessage(error, validatorKeys);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const { orderId } = params;
    if (orderId) setOrderItems(orderId);
  }, [params]);

  console.log(items);

  return (
    <Container className="min-h-[calc(100vh-200px)] mt-10">
      <p className="font-semibold text-lg text-gray-700 dark:text-white">
        Order Items
      </p>
      <table className="table-auto w-full max-w-[1100px] mt-10 text-gray-700 dark:text-white overflow-auto min-w-[700px]">
        <thead>
          <tr className="text-left">
            <th>Order Item Number</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>$ {item.price.toFixed(2)}</td>
                <td>$ {item.quantity}</td>
                <td>$ {item.discount.toFixed(2)} per</td>
                <td>
                  $ {item.price * item.quantity - item.discount * item.quantity}{" "}
                  per
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={4}></td>
            <td className="font-bold">Grand Total</td>
            <td colSpan={5} className="font-bold">
              ${" "}
              {items
                .reduce(
                  (previousValue, currentValue) =>
                    previousValue +
                    (currentValue.price - currentValue.discount) *
                      currentValue.quantity,
                  0
                )
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default OrderItems;
