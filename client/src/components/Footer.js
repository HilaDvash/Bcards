import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Style/footer.css";
export default function Footer() {
  const [logged, setLogged] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) setLogged(true);
    if ((user && user.isBusiness) || (user && user.isAdmin)) setShowCards(true);
  }, []);
  return (
    <div id="footer">
      <div className="footerIcon">
        <InfoIcon />
        <h2 style={{ margin: "0px" }}>About</h2>
      </div>
      {logged ? (
        <div className="footerIcon">
          <FavoriteIcon />
          <h2 style={{ margin: "0px" }}>Favorites</h2>
        </div>
      ) : (
        <></>
      )}
      {showCards ? (
        <div className="footerIcon">
          <Link to="myCards" style={{ color: "black", marginLeft: "20px" }}>
            <PortraitIcon />
          </Link>
          <h2 style={{ margin: "0px" }}>My Cards</h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
