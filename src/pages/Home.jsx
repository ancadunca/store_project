import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import CarouselComponent from "../components/CarouselComponent";
import Categories from "../components/Categories";
import TrendingProducts from "../components/TrendingProducts";

function Home() {
  return (
    <>
      <CarouselComponent />
      <Categories />
      <TrendingProducts />
      <Footer />
    </>
  );
}

export default Home;
