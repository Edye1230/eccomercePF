import React from 'react';
import Table from "./DatatableOrders";
import { useSelector } from "react-redux";
import { getOrder } from '../../../../redux/action';
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';

const Orders = () => {
  const clickhandler = (name) => console.log("delete", name);
  const allOrder = useSelector((state) => state.order);
  const dispatch = useDispatch();
  console.log('order', allOrder)

  const handleRefresh = () => {
    dispatch(getOrder())
  };

  return (
    <div className="App">
      <div>
        <div className="refresOrder">
          <Button variant="outline-primary" size="lg" onClick={() => handleRefresh()}>Refrescar</Button>
        </div>
        <Table data={allOrder.map(el => {
          return (
            {
              client: el.client,
              products: el.products,
              total_purchase: `$${el.total_purchase}`,
              status: el.status,
              date: el.createdAt.slice(0, 10)
            }
          )
        })}
          click={clickhandler}
        />
      </div>
    </div>
  );
};
export default Orders;
