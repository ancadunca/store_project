import {
  Card,
  CardTitle,
  CardLink,
  CardImg,
  CardImgOverlay,
  Row,
  Spinner,
  ButtonToolbar,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Categories.style.css";

function Categories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((categoryListAPI) => {
        setCategories(categoryListAPI);
      });
  }, []);

  const items_category = [
    {
      src: "https://images.pexels.com/photos/3945687/pexels-photo-3945687.jpeg",
      altText: "suggestive picture",
      key: 1,
    },
    {
      src: "https://images.pexels.com/photos/5370657/pexels-photo-5370657.jpeg",
      altText: "suggestive picture",
      key: 2,
    },
    {
      src: "https://images.pexels.com/photos/5506300/pexels-photo-5506300.jpeg",
      altText: "suggestive picture",
      key: 3,
    },
    {
      src: "https://images.pexels.com/photos/3850783/pexels-photo-3850783.jpeg",
      altText: "suggestive picture",
      key: 4,
    },
  ];

  return (
    <>
      {categories ? (
        <div className="category_container">
          <Row className="row_category row-cols-1 row-cols-md-2 row-cols-xl-4">
            {categories.map((category, index) => {
              return (
                <Col align="center" key={"categorie_" + index}>
                  <Link to="/products/" state={category}>
                    <Card className="m-4 category_card rounded-0">
                      <CardImg
                        className="card_image rounded-0"
                        alt="Card image cap"
                        src={items_category[index].src}
                      />
                      <CardImgOverlay>
                        <CardTitle className="title_category" tag="h3">
                          {category}
                        </CardTitle>
                      </CardImgOverlay>
                    </Card>
                  </Link>
                </Col>
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

export default Categories;
