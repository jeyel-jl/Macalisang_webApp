import React, { useState, useEffect } from "react";
import './AllProducts.css';
import Adminsidebar from '../Components/AdminSidebar/Adminsidebar';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("x-auth-token");

      try {
        const response = await fetch("http://localhost:3000/api/order/get-orders", {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        });

        const data = await response.json();
        console.log(data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    console.log('Changing status for order:', orderId, 'to', newStatus);  // Add this
    const token = localStorage.getItem("x-auth-token");
  
    try {
      const response = await fetch("http://localhost:3000/api/order/update-order-status", {
        method: "PATCH",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });
  
      const data = await response.json();
      console.log("Status updated:", data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };
  

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="container">
      <Adminsidebar />
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
          {orders.map((order) =>
            order.order_items.map((item) => (
              <tr key={`${order.id}-${item.productId}`}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{item.productId}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="To Ship">To Ship</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
