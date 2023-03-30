import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import "./Wishlist.style.css";
import { Link } from "react-router-dom";
function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const productsString = localStorage.getItem("products");
    if (productsString !== null) {
      const products = JSON.parse(productsString);
      setWishlistProducts(products);
    }
  }, []);

  const onDelete = (productId) => {
    const filteredProducts = wishlistProducts.filter((product) => {
      return product.id !== productId;
    });
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    setWishlistProducts(filteredProducts);
    const event = new CustomEvent("localdatadecreased");
    window.dispatchEvent(event);
  };
  return (
    <>
      <div className="wishlist_container">
        <div className="image_section">
          <img
            className="image_wishlist"
            src="https://images.pexels.com/photos/5868247/pexels-photo-5868247.jpeg"
            alt="image_wishlist"
          ></img>
          <div className="text_over_image">
            <h1>Wishlist</h1>
            <Link to={"/home"}>Home</Link> <span> / </span>
            <Link to={"/products"}>Products</Link>
          </div>
        </div>

        <div className="wishlist_table">
          {wishlistProducts.length !== 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {wishlistProducts.map((product, index) => {
                  return (
                    <tr className="mt-4" key={"products" + index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="image_table" src={product.image} />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price + " $"}</td>
                      <td>
                        <button
                          className="erase_button"
                          onClick={() => {
                            onDelete(product.id);
                          }}
                        >
                          <img className="erase_img" src="/delete.svg" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr className="mt-4">
                  <th></th>
                  <td>Total</td>
                  <td></td>
                  <td className="total_price">
                    {wishlistProducts.reduce(
                      (accumulator, currentValue) =>
                        (accumulator = accumulator + currentValue.price),
                      0
                    ) + " $"}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <div className="alert_empty">
              It seems that your wishlist is empty! Visit our{" "}
              <Link to={"/products"}>Products</Link> page and make a wish!
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Wishlist;
