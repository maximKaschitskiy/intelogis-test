import React from "react";
import shortid from "shortid";
import "./OrderItem.css";
import pointer from "../Icons/Pointer.svg";
import edit from "../Icons/Edit.svg";
import apply from "../Icons/Apply.svg";

function OrderItem({
  orders,
  order,
  getValues,
  setCurrentOrder,
  currentOrder,
  locationList,
  editOrder
}) {

  const [editing, setEditing] = React.useState(false);
  const [selected, setSelected] = React.useState(order);

  React.useEffect(() => {
    if (order.id !== currentOrder.id) {
      setEditing(false);
    }
  }, [currentOrder, order]);

  function handleEditClick(event) {
    event.stopPropagation();
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  }

  function handleChangeAdress(event) {
    const index = event.target.selectedIndex;
    const el = event.target.childNodes[index];
    const option =  el.getAttribute('name');
    const editedOrder = {...selected, [option]: event.target.value};
    setSelected((prev) => ({...prev, [option]: event.target.value}));
    editOrder(editedOrder);
  }

  return (
    <li
      className={`item ${order.id === currentOrder.id && "item__state_selected"}`}
      onClick={() => {
        if (!editing) {
          getValues(order);
          setCurrentOrder(order);
        }
      }}
    >
      <div className="item__adreses-wrapper">
        <div className="item__adress-wrapper">
          <img className="item__adress-icon" src={pointer} alt={"Map pointer icon"}></img>
          {editing ? (
            <select
              className="item__adress-selector"
              name="adressSelector"
              id="adressSelector"
              onChange={(event)=>handleChangeAdress(event)}
              onClick={(event)=> event.stopPropagation()}
            >
              <>
                <option
                  className="item__adressbook-item"
                  name={"from"}
                  id={shortid.generate()}
                  defaultChecked={true}
                  value={selected.from}
                >
                  {selected.from}
                </option>
                {locationList.map((item, index) => {
                  return (
                    <option
                      className="item__adressbook-item"
                      key={shortid.generate()}
                      name={"from"}
                      id={shortid.generate()}
                      value={item}
                    >
                      {item}
                    </option>
                  );
                })}
              </>
            </select>
          ) : (
            <p className="item__adress-text">{order.from}</p>
          )}
        </div>
        <div className="item__adress-wrapper">
          <img className="item__adress-icon" src={pointer} alt={"Map pointer icon"}></img>
          {editing ? (
            <select
              className="item__adress-selector"
              name="adressSelector"
              id="adressSelector"
              onChange={(event)=>handleChangeAdress(event)}
              onClick={(event)=> event.stopPropagation()}
            >
              <>
                <option
                  className="item__adressbook-item"
                  name={"to"}
                  id={shortid.generate()}
                  defaultChecked={true}
                  value={selected.to}
                >
                  {selected.to}
                </option>
                {locationList.map((item, index) => {
                  return (
                    <option
                      className="item__adressbook-item"
                      key={shortid.generate()}
                      name={"to"}
                      id={shortid.generate()}
                      value={item}
                    >
                      {item}
                    </option>
                  );
                })}
              </>
            </select>
          ) : (
            <p className="item__adress-text">{order.to}</p>
          )}
        </div>
        {order.id === currentOrder.id && (
          <div className="item__edit-wrapper">
            <button
              className="item__edit-button"
              onClick={(event) => handleEditClick(event)}
            >
              <img
                className="item__edit-icon"
                src={editing ? apply : edit}
                alt={"Edit button icon"}
              ></img>
              <p>{editing ? "Apply" : "Edit"}</p>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default OrderItem;
