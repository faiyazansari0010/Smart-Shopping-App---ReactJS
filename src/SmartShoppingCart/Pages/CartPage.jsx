import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../Slices/cartSlice";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../SmartShoppingMain";

const CartPage = () => {
  const { productList, totalCartItems, totalCartPrice, isItemInCart } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleQuantity = (itemID, type) => {
    if (type == "increase")
      dispatch(updateQuantity({ id: itemID, updateType: "increaseCount" }));
    else {
      dispatch(updateQuantity({ id: itemID, updateType: "decreaseCount" }));
    }
    console.log(productList);
  };

  const profileDetails = useContext(ProfileContext);

  return (
    <>
      <p
        style={{
          padding: "5px 10px",
          borderRadius: "10px",
          background: "green",
          fontSize: "20px",
          position: "relative",
          display: "inline-block",
        }}
      >
        User logged in: {profileDetails.name}
      </p>
      {productList.length === 0 ? (
        <h1>Cart is empty ! ... Please add some item and come back !</h1>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              marginTop: "50px",
              justifyContent: "space-evenly",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        onClick={() => handleQuantity(item.id, "decrease")}
                      >
                        -
                      </button>
                      <span style={{ padding: "10px" }}>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item.id, "increase")}
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        style={{ marginLeft: "10px" }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cartSummary">
              <p>Cart Summary</p>
              <p>Total Items : {totalCartItems}</p>
              <p>Total Price : {totalCartPrice}</p>
            </div>
          </div>
          <NavLink to={"/CheckoutPage"}>
            <button
              onClick={() => dispatch(clearCart())}
              style={{ marginLeft: "210px", marginTop: "30px" }}
            >
              Checkout
            </button>
          </NavLink>
        </>
      )}
    </>
  );
};

export default CartPage;
