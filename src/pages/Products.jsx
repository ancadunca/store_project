import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Input,
  InputGroup,
  Row,
  Spinner,
  InputGroupText,
} from "reactstrap";
import ProductComponent from "../components/ProductComponent";
import { useLocation } from "react-router-dom";
import "./Products.style.css";

function Products() {
  const [productsList, setProductsList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);

  //variabile pt filtrare
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [textInput, setTextInput] = useState("");
  const location = useLocation();
  //luam date din API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((productsListAPI) => {
        setProductsList(productsListAPI);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((categoryListAPI) => {
        setCategoryList(categoryListAPI);
      });
  }, []);

  useEffect(() => {
    const categoryHome = location.state;
    if (categoryHome !== null) {
      setSelectedCategory(categoryHome);
    }
  }, []);

  return (
    <>
      {productsList && categoryList ? (
        <div className="container_products ">
          <div className="category_list m-4 mt-0 d-flex flex-column">
            <div className="categories_text">Categories</div>
            {categoryList.map((category, index) => {
              return (
                <Button
                  style={{
                    backgroundColor:
                      category === selectedCategory ? "#D97A2B" : "transparent",
                    color: "#000",
                    border: 0,
                    textAlign: "justify",
                  }}
                  className="button_category mt-2"
                  key={"Categorie_" + index}
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                >
                  {category.toUpperCase()}
                </Button>
              );
            })}
            <Button
              className="mt-2"
              style={{
                display: selectedCategory === null ? "none" : "flex",
                backgroundColor: "#B92727",
                border: 0,
                textAlign: "justify",
              }}
              onClick={() => {
                setSelectedCategory(null);
              }}
            >
              All Products
            </Button>
          </div>
          <div className="products_list">
            <InputGroup>
              <InputGroupText>
                <img
                  className="search_icon"
                  style={{ width: "30px" }}
                  src="/search.svg"
                ></img>
              </InputGroupText>
              <Input
                type="search"
                placeholder="Search..."
                className="input_search w-250"
                value={textInput}
                onChange={(event) => {
                  setTextInput(event.target.value);
                }}
              ></Input>
            </InputGroup>

            <Row xs="1" md="3">
              {productsList
                .filter((product) => {
                  return (
                    selectedCategory === null ||
                    selectedCategory === product.category
                  );
                })
                .filter((product) => {
                  return product.title
                    .toLowerCase()
                    .includes(textInput.toLowerCase());
                })
                .map((product, index) => {
                  return (
                    <ProductComponent
                      product={product}
                      key={"product_" + index}
                    />
                  );
                })}
            </Row>
          </div>
        </div>
      ) : (
        <Spinner> Loading... </Spinner>
      )}

      <Footer />
    </>
  );
}

export default Products;
