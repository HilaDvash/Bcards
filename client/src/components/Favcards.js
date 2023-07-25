import Onecard from "./Onecard";
import "../Style/cards.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Favcards() {
  const [allcards, setAllcards] = useState([]);

  async function getCards() {
      try {
          const options = {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          };
          const result = await axios.get("http://localhost:8181/cards",options);
          let array = [];
          let user = JSON.parse(localStorage.getItem("user"))
          for(let card of result.data){
              for(let like of card.likes){
                if(like == user._id){
                    if(document.getElementById("favoriteIcon"))
                  document.getElementById("favoriteIcon").style.color = "red";
                  array.push(card)
                }
              }
          }
          setAllcards([...array]);
      } catch (error) {
          console.log(error)
      }
    // const response = await fetch(
    //   "http://localhost:8181/cards",
    //   options
    // );
    // const result = await response.json();
    // console.log(result);
    // let array = [];
    // let user = JSON.parse(localStorage.getItem("user"))
    // for(let card of result){
    //     for(let like of card.likes){
    //       if(like == user._id){
    //         // document.getElementById("favoriteIcon").style.color = "red";
    //         array.push(card)
    //       }
    //     }
    // }
    // setAllcards([...array]);
  }

  useEffect(() => {
    getCards();
  }, []);
  return (
    <div id="cards">
      {allcards.map((card) => {
        return (
          <Onecard
            key={card._id}
            favCard={true}
            card={card}
            allcards={allcards}
            setAllcards={setAllcards}
            id={card._id}
            title={card.title}
            p={card.description}
            phone={card.phone}
            adress={card.address.city}
            number={card.bizNumber}
            imageurl={card.image.url}
            imagealt={card.image.alt}
          />
        );
      })}
    </div>
  );
}
