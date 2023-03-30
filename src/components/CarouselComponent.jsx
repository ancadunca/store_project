import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./CarouselComponent.style.css";
const items = [
  {
    src: "https://images.pexels.com/photos/5868249/pexels-photo-5868249.jpeg",
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: "https://images.pexels.com/photos/5868131/pexels-photo-5868131.jpeg",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: "https://images.pexels.com/photos/5868120/pexels-photo-5868120.jpeg",
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
];

function CarouselComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const previousIndex =
      activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(previousIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="carousel_item"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });
  return (
    <>
      <div className="carousel_container">
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
        <div className="carousel_description">
          <div className="description_title">
            <h1>Ready for shopping?</h1>
          </div>

          <p className="description_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <Link to={"/products"}>
            <button className="description_button">DISCOVER NOW</button>
          </Link>
        </div>
        <div className="description_title_after">
          <h1>Ready for shopping?</h1>
        </div>
      </div>
    </>
  );
}

export default CarouselComponent;
