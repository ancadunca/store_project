import { Card, Col } from "reactstrap";
import "./ProductComponent.style.css";
import Skeleton from "react-loading-skeleton";
function ProductComponent({ product }) {
  const addToWishList = () => {
    const productsString = localStorage.getItem("products"); //getting the list from local storage

    if (productsString !== null) {
      const products = JSON.parse(productsString);

      const existNo = products.find((productElement) => {
        // searching for duplicates
        return productElement.id === product.id;
      });

      if (existNo === undefined) {
        //if no duplicates
        products.push(product); //adding products to list
        localStorage.setItem("products", JSON.stringify(products)); //adding updated list to local storage

        const event = new CustomEvent("localdataincreased");
        window.dispatchEvent(event);
      }
    } else {
      //if the list is empty,, we add directly
      const newProducts = [];
      newProducts.push(product);
      localStorage.setItem("products", JSON.stringify(newProducts));

      const event = new CustomEvent("localdataincreased");
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      <Col className="mt-4">
        <Card className="product_card h-100 d-flex flex-column justify-content-between">
          <div>
            <img
              alt="product_image"
              className="card-img-top img-fluid"
              src={product.image}
            />
          </div>
          <div className="text_card m-3 d-flex flex-column justify-content-between">
            <div>
              <div className="product_title mt-2"> {product.title}</div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="price"> {product.price + " $"} </div>
              <button
                className="wishlist_button"
                onClick={() => {
                  addToWishList();
                }}
              >
                ♡ Add to wishlist
              </button>
            </div>
          </div>
        </Card>
      </Col>
    </>
  );
}

export default ProductComponent;
