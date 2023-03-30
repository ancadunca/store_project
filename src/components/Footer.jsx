import { Link } from "react-router-dom";
import "./Footer.style.css";
function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_links">
        <Link to={"/home"}>Home</Link>
        <Link to={"/products"}>Products</Link>
        <div className="footer_copyright">Anca's Store © 2023</div>
      </div>

      <div className="footer_logos">
        <Link to={"#"}>
          <img src="/facebook.svg" />
        </Link>
        <Link to={"#"}>
          <img src="/linkedin.svg" />
        </Link>
        <Link to={"#"}>
          <img src="/twitter.svg" />
        </Link>
        <Link to={"#"}>
          <img src="/pinterest.svg" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
