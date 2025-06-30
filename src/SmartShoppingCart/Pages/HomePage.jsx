import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Slices/cartSlice";
import { NavLink } from "react-router-dom";
import productInfo from "../productInfoFile.json";
import { useContext } from "react";
import { ProfileContext } from "../SmartShoppingMain";

const HomePage = () => {
  const { productList, totalCartItems, totalCartPrice, isItemInCart } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleCartBtn = (item) => {
    for (let i = 0; i < totalCartItems; i++) {
      if (item.id === productList[i]?.id) {
        dispatch(removeFromCart(item.id));
        return;
      }
    }
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const profileDetails = useContext(ProfileContext);
  const paraStyle = {
    margin: "0px",

  }
  return (
    <div className="homePageContainer">
      <div
        className="headerBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <p style={{ marginLeft: "40px", fontSize: "1.5rem" }}>
          Smart Shopping Cart
        </p>

        <input
          name="productSearch"
          type="text"
          placeholder="Search product..."
          style={{ height: "20px", width: "40%" }}
        />
        <div className="cartSummary">
          <p>Cart Summary</p>
          <p>Total Items : {totalCartItems}</p>
          <p>Total Price : {totalCartPrice}</p>
        </div>
      </div>
      <div style={{ marginLeft: "auto", width: "100px" }}>
        <NavLink to={"/CartPage"}>
          <button>Go To Cart</button>
        </NavLink>
      </div>
      <p
        style={{
          padding: "5px 10px",
          borderRadius: "10px",
          background: "green",
          fontSize: "20px",
          position: "relative",
          top: "-100px",
          left: "40px",
          display: "inline-block",
        }}
      >
        User logged in: {profileDetails.name}
      </p>
      <NavLink to={"/ProfilePage"}>
        <button
          style={{
            fontSize: "20px",
            position: "relative",
            display: "inline-block",
            top: "-50px",
            left: "-220px",
            borderRadius: "10px",
          }}
        >
          Your Profile
        </button>
      </NavLink>

      <div
        className="products"
        style={{
          marginTop:"-50px",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "5px",
        }}
      >
        {productInfo.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={`/ProductDetailsPage/${item.id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom:"10px"
                }}
              >
                <img src={item.imageUrl} alt={`${item.name} image`} />

                <p style={paraStyle}>{item.name}</p>

                <p>Price: {item.price}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCartBtn(item);
                  }}
                >
                  {isItemInCart[item.id] === true
                    ? "Remove from Cart"
                    : "Add To Cart"}
                </button>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
