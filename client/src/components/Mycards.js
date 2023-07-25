import Onecard from "./Onecard";
import "../Style/cards.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Mycards() {
  const [allcards, setAllcards] = useState([]);

  async function getCards() {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.get(
        "http://localhost:8181/cards/my-cards",
        options
      );
      setAllcards(result.data);
    } catch (error) {
      console.log(error);
    }
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
