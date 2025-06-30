import { NavLink } from "react-router-dom"

const CheckoutPage = () => {
  return (
    <>
      <h1>Your order has been placed successfully !!!</h1>
      <NavLink to={"/"}>
        <button>Go to Home</button>
      </NavLink>
      
    </>
  )
}

export default CheckoutPage