import Onecard from "./Onecard";
import "../Style/cards.css";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Cards() {
  const [allcards, setAllcards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const searchValue = useOutletContext().searchValue;

  async function getCards() {
    try {
      const result = await axios.get("http://localhost:8181/cards");
      setAllcards(result.data);
      setFilteredCards(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    if (searchValue == "") {
      setFilteredCards([...allcards]);
    } else {
      let newArray = allcards.filter((onecard) =>
        onecard.description.includes(searchValue)
      );
      setFilteredCards([...newArray]);
    }
  }, [searchValue]);

  return (
    <div id="cards">
      {filteredCards.map((card) => {
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
