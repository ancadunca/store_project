import { Link } from "react-router-dom";
import "./Navigation.style.css";
import { Alert } from "reactstrap";
import { useState, useEffect } from "react";
function Navigation() {
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [wishlistItems, setWishListItems] = useState("");


  const onDismissAdd = () => setVisibleAdd(false);
  const onDismissDelete = () => setVisibleDelete(false);

  useEffect(() => {
    const numberWishlist = JSON.parse(localStorage.getItem("products"));
    if (numberWishlist) setWishListItems(numberWishlist);
    window.addEventListener("localdataincreased", () => {
      const wishlistNumber = JSON.parse(
        window.localStorage.getItem("products")
      );
      setWishListItems(wishlistNumber);
      setVisibleAdd(true);
      setTimeout(function () {
        setVisibleAdd(false);
      }, 2000);
    });

    window.addEventListener("localdatadecreased", () => {
      const wishlistNumber = JSON.parse(
        window.localStorage.getItem("products")
      );
      setWishListItems(wishlistNumber);
      setVisibleDelete(true);
      setTimeout(function () {
        setVisibleDelete(false);
      }, 2000);
    });
  }, []);

  return (
    <>
      <div className="navbar_store">
        <div className="left_nav_links">
          <Link to={"/home"}>Home</Link>
          <Link to={"/products"}>Products</Link>
        </div>

        <div className="middle_logo">
          <Link to={"/home"}>
            <img alt="logo" src="/logo-store.png" />
          </Link>
        </div>

        <div className="right_nav_links">
          <Link to={"/wishlist"}>Wishlist ({wishlistItems.length})</Link>
        </div>
        <div className="alert_message">
          <Alert color="info" isOpen={visibleAdd} toggle={onDismissAdd}>
            You added a product in your Wishlist!
          </Alert>
          <Alert color="info" isOpen={visibleDelete} toggle={onDismissDelete}>
            You deleted one product from Wishlist!
          </Alert>
        </div>
      </div>
    </>
  );
}

export default Navigation;
