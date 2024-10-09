import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping, onRemove }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQty);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.qty * parseInt(item.cost.slice(1)),
      0
    );
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, qty: item.qty + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.qty === 1) return;
    dispatch(updateQuantity({ name: item.name, qty: item.qty - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name, qty: item.qty }));
    onRemove(item.name);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.qty * parseInt(item.cost.slice(1), 10);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  disabled={item.qty === 1}
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.qty}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      >
        {totalQty || null}
      </div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
