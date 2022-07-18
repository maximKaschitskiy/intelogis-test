import React from "react";

import OrderItem from "../OrderItem/OrderItem";
import "./OrderList.css";

function OrderList({ orders, getValues, locationList, editOrder, currentOrder, setCurrentOrder}) {

  return (
    <div>
      <ul className="list">
        {orders &&
          orders.map((item) => (
            <OrderItem
              key={item.id}
              orders={orders}
              order={item}
              getValues={(order) => getValues(order)}
              setCurrentOrder={(order) => setCurrentOrder(order)}
              currentOrder={currentOrder}
              locationList={locationList}
              editOrder={(order) => editOrder(order)}
            />
          ))}
      </ul>
    </div>
  );
}

export default OrderList;
