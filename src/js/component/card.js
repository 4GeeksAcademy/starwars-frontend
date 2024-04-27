import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/card.css";

export const Card = (props) => {
    const {store, actions}= useContext(Context)
    const isFavorite = store.favorites.includes(props.item.name);
    const category = props.category === "people" ? "characters" :
                     props.category === "planets" ? "planets" :
                     props.category === "vehicles" ? "vehicles" : "";
    let noImageUrl = "";

if (props.category === "planets" && props.item.uid === "1") {
noImageUrl = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
}

	return (
        <div className="card m-3"style={{minWidth:"300px"}}>
            <img className="image"
				src={noImageUrl !== "" ? noImageUrl : `https://starwars-visualguide.com/assets/img/${category}/${props.item.uid}.jpg`}
				alt="image"
			/>
            <div className="card-body bg-light">
                <h5 className="card-title">{props.item.name}</h5>
                <p className="card-text mb-0"> {
                    props.category == "people" ? "Gender: " : 
                    props.category == "planets" ? "Population: " : 
                    props.category == "vehicles" ? "Cargo Capacity: " : "" 
                 }</p>
                <p className="card-text mb-0"> {
                    props.category == "people" ? "Hair color: " : 
                    props.category == "planets" ? "Terrain: " : 
                    props.category == "vehicles" ? "Consumables: " : ""    
                }</p>
                <p className="card-text"> {
                    props.category == "people" ? "Eye-Color: " : 
                    props.category == "planets" ? "Climate: " : 
                    props.category == "vehicles" ? "Crew: " : "" 
                }</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/details/${props.category}/${props.item.uid}`}>
                        <button className="btn text-primary border-primary">Learn More!</button>
                    </Link>
                    
                   {/*  <button className={`corazon btn btn-outline-warning`} onClick={() => actions.favorites(props.item.name)}>
                        <i className={`fa-heart ${isFavorite ? "fas text-warning" : "far"}`}></i>
                    </button> */}
                    
                </div>
            </div>
        </div>	
	);
};
