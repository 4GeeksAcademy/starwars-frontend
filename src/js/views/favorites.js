import React, {useContext, useEffect, useState} from "react";
import { Card } from "../component/card.js";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

export const Favorites = () => {
    const {actions, store} = useContext(Context);

    useEffect(() => {
		actions.getFavorites();
	}, []);

    return ( 
        <>
             <div>
                <h1 className="text-danger ms-5">Characters</h1>
                <div className="d-flex ms-4 flex-nowrap overflow-auto">
                    {store.favoritesCharacters.map((favorite, index) => {
                        return (
                            <Card key={index} item={favorite} category="characters" />
                        );
                    })}
                </div>
            </div>
            <div>
                <h1 className="text-danger ms-5">Planets</h1>
                <div className="d-flex ms-4 flex-nowrap overflow-auto">
                    {store.favoritesPlanets.map((favorite, index) => {
                        return (
                            <Card key={index} item={favorite} category="planets" />
                        );
                    })}
                </div>
            </div>
            <div>
                <h1 className="text-danger ms-5">Vehicles</h1>
                <div className="d-flex ms-4 flex-nowrap overflow-auto">
                    {store.favoritesVehicles.map((favorite, index) => {
                        return (
                            <Card key={index} item={favorite} category="vehicles" />
                        );
                    })}
                </div>
            </div>
        </>
        
    );
};