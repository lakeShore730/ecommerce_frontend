import { useEffect, useState } from "react";
import cn from "classnames";
import Container from "../../components/ui/container";
import { getDate } from "../../utils/utils";
import getAllOrder from "../../services/order/getAllOrderApi";
import { Link } from "react-router-dom";

const Orders = () => {
  const [order, setOrder] = useState({
    isLoading: true,
    refetch: false,
    hasNextPage: true,
    page: 1,
    data: [],
  });

  const setOrderData = async () => {
    if (order.page !== 1 && !order.hasNextPage) return;

    try {
      const orderResData = await getAllOrder({
        page: order.page,
      });

      setOrder({
        ...order,
        data: [...order.data, ...orderResData.results],
        isLoading: false,
        hasNextPage: orderResData.next,
      });
    } catch (error) {
      console.log(error.response.data);
      setOrder({
        ...order,
        hasNextPage: false,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    if (order.hasNextPage) setOrderData();
  }, [order]);

  return (
    <Container className="min-h-[calc(100vh-200px)] mt-10">
      <p className="font-semibold text-lg text-gray-700 dark:text-white">
        Order List
      </p>

      {order.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="table-auto w-full max-w-[1000px] mt-10 text-gray-700 dark:text-white overflow-auto min-w-[600px]">
            <thead>
              <tr className="text-left">
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>#1</td>
                    <td>{getDate(item.created_at)}</td>
                    <td>
                      <div
                        className={cn(
                          "inline-block rounded-md text-sm px-1 opacity-75 text-white",
                          {
                            "bg-green-600": item.is_delivered,
                            "bg-red-600": item.is_cancelled,
                            "bg-yellow-600":
                              !item.is_delivered && !item.is_cancelled,
                          }
                        )}
                      >
                        {item.is_cancelled
                          ? "Cancelled"
                          : item.is_delivered
                          ? "Delivered"
                          : "Pending"}
                      </div>
                    </td>
                    <td>$ 200</td>
                    <td>
                      <Link
                        className="inline-block underline"
                        to={`/orders/${item.id}`}
                      >
                        View items
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {order.hasNextPage && !order.isLoading ? (
            <div className="flex mt-5 justify-center w-full max-w-[1000px]">
              <p
                className="cursor-pointer underline text-gray-600 dark:text-white"
                onClick={() => setOrder({ ...order, page: order.page + 1 })}
              >
                Load more
              </p>
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default Orders;
