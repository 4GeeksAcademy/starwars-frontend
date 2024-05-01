import React, {useContext, useEffect} from "react";
import { Card } from "../component/card.js";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

export const Home = () => {
	const {store, actions} = useContext(Context);
	
	useEffect(() => {
		actions.getCharacters();
		actions.getPlanets();
		actions.getVehicles();
	}, []);

	useEffect(() => {
		if (store.characters.length && store.planets.length && store.vehicles.length) {
			actions.favorites();
		} 
	},[store.characters, store.planets, store.vehicles])

	return (
		<>
			<div>
				<h1 className="text-danger ms-5">Characters</h1>
				<div className="d-flex ms-4 flex-nowrap overflow-auto">
					{store.characters.map((item, index) => {
						return (
							<Card key={index} item={item} category="people" />
						);
					})}
				</div>
			</div>
			<div>
				<h1 className="text-danger ms-5">Planets</h1>
				<div className="d-flex ms-4 flex-nowrap overflow-auto">
					{store.planets.map((item, index) => {
						return (
							<Card key={index} item={item} category="planets" />
						);
					})}
				</div>
			</div>
			<div>
				<h1 className="text-danger ms-5">Vehicles</h1>
				<div className="d-flex ms-4 flex-nowrap overflow-auto">
					{store.vehicles.map((item, index) => {
						return (
							<Card key={index} item={item} category="vehicles" />
						);
					})}
				</div>
			</div>
		</>
	);
}
