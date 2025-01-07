import React, { useState, useEffect } from "react";
import './AllProducts.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("x-auth-token");

      try {
        const response = await fetch("http://localhost:3000/api/order/admin/get-all-orders", {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        });

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="container">
      <h1>All Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              {order.order_items.map((item) => (
                <React.Fragment key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{order.status}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
