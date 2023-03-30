import { useEffect, useState } from "react";
import { Spinner, Row } from "reactstrap";
import ProductComponent from "./ProductComponent";
import "./TrendingProducts.style.css";
function TrendingProducts() {
  const [trendingList, setTrendingList] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((trendingListAPI) => setTrendingList(trendingListAPI));
  }, []);

  return (
    <>
      {trendingList ? (
        <div className="trending_container w-75 m-auto">
          <div className="trending_text">
            <h2>Trending Products</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <Row
            xs="1"
            md="2"
            lg="4"
            className="row row-cols-1 row-cols-md-3 g-4"
          >
            {trendingList.map((product, index) => {
              return (
                <ProductComponent product={product} key={"product_" + index} />
              );
            })}
          </Row>
        </div>
      ) : (
        <Spinner> Loading... </Spinner>
      )}
    </>
  );
}

export default TrendingProducts;
