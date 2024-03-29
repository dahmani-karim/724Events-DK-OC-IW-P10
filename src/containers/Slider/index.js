import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData()
  const [index, setIndex] = useState(0)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  )

  // Déclaration d'une variable pour stocker le delay automatique du slider
  let timoutId

  // Récupération du nombre total de slides
  const totalSlides = byDateDesc?.length

  /* Fonction pour passer à la slide suivante
  Ajout du "-1" sur la longueur pour éviter l'index out of range
  Récupération de la valeur dans timoutId */
  const nextCard = () => {
    timoutId = setTimeout(() =>
    setIndex(index < totalSlides - 1 ? index + 1 : 0),5000
  )}

  // Gestion du click sur les boutons radio
  const handleInputClicked = (radioIdx) => {
    setIndex(radioIdx)
    clearTimeout(timoutId) // Reset du timeout en cas de click sur les boutons radio
  }

  useEffect(() => {
    nextCard()
  })

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`${byDateDesc[idx].title}`}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${byDateDesc[radioIdx].title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // gestion de l'indicateur radio checked ou non en fonction de l'index
                  onChange={() => handleInputClicked(radioIdx)} // gestion du click sur les boutons radio
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Slider;