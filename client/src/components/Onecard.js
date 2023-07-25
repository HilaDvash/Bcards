import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Editcard from "./Editcard";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Onecard(props) {
  const [edit, setEdit] = useState(false);
  const [editCard, setEditCard] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user){
      for (let like of props.card.likes) {
        if (like == user._id) {
          document.getElementById(props.id).style.color = "red";
        }
      }
    }
  }, []);

  async function favorite(e) {
    if (props.favCard) {
      let newArray = props.allcards.filter((card) => card._id !== props.id);
      props.setAllcards([...newArray]);
    }
    if (e.target.style.color == "red") {
      e.target.style.color = "black";
    } else {
      e.target.style.color = "red";
    }
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.patch(
        `http://localhost:8181/cards/${props.id}`,
        options
      );
    } catch (error) {
      console.log(error);
    }

    // const response = await fetch(
    //   `http://localhost:8181/cards/${props.id}`,
    //   options
    // );
    // const result = await response.json();
    // console.log(result);
  }
  async function deleteCard() {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.delete(
        `http://localhost:8181/cards/${props.id}`,
        options
      );
      let newArray = props.allcards.filter((card) => card._id !== props.id);
      props.setAllcards([...newArray]);
    } catch (error) {
      console.log(error);
    }
    // const response = await fetch(
    //   `http://localhost:8181/cards/${props.id}`,
    //   options
    // );
    // const result = await response.json();
    // console.log(result);
    // let newArray = props.allcards.filter((card) => card._id !== props.id);
    // props.setAllcards([...newArray]);
  }

  return (
    <div>
      {edit ? (
        <div>
          <Editcard card={editCard} />
        </div>
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="194"
            image={props.imageurl}
            alt={props.imagealt}
          />
          <CardContent>
            <h2>{props.title}</h2>
            <Typography variant="body2" color="text.secondary">
              {props.p}
            </Typography>
            <hr></hr>
            <div className="color">
              <div>
                <span className="span">Phone: </span>
                <span>{props.phone}</span>
              </div>
              <div>
                <span className="span">Adress: </span>
                <span>{props.adress}</span>
              </div>
              <div>
                <span className="span">Card number: </span>
                <span>{props.number}</span>
              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon onClick={(e) => favorite(e)} id={props.id} />
            </IconButton>
            <IconButton aria-label="phone">
              <PhoneIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={deleteCard} />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon
                onClick={() => {
                  setEdit(true);
                  setEditCard(props.card);
                }}
              />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
