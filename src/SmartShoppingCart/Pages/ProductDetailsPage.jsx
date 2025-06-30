import { useParams } from "react-router-dom";
import productInfo from "../productInfoFile.json";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Slices/cartSlice";
import { NavLink } from "react-router-dom";

const ProductDetailsPage = () => {
  const { productList, totalCartItems, totalCartPrice, isItemInCart } =
    useSelector((state) => state.cart);
  const { productID } = useParams();
  const dispatch = useDispatch();

  const getCurrentItem = (id) => {
    for (let i = 0; i < productInfo.length; i++) {
      if (id === productInfo[i].id) {
        return productInfo[i];
      }
    }
  };

  const handleCartBtn = (item) => {
    for (let i = 0; i < totalCartItems; i++) {
      if (item.id === productList[i]?.id) {
        dispatch(removeFromCart(item.id));
        return;
      }
    }
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const currentItem = getCurrentItem(productID);
  return (
    <div style={{display:"flex",
  flexDirection: "column",
  alignItems: "center"}}>
      
      <img src={currentItem.imageUrl} alt={`${currentItem.name} image`} />

      <p>{currentItem.name}</p>

      <p>Price: {currentItem.price}</p>
      <p>Description: {currentItem.Desc}</p>
      <p>Benefits: {currentItem.Benefits}</p>
      <p>Expiry: {currentItem.Expiry}</p>

      <button
        onClick={(e) => {
          handleCartBtn(currentItem);
        }}
      >
        {isItemInCart[currentItem.id] === true
          ? "Remove from Cart"
          : "Add To Cart"}
      </button>
      <NavLink to={"/"}>
        <button style={{marginTop:"20px"}}>{`< Go Back`}</button>
      </NavLink>
      <div style={{ marginTop: "20px"}}>
        <NavLink to={"/CartPage"}>
          <button>Go To Cart</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
