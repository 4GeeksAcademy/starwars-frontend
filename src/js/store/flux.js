const getState = ({ getStore, getActions, setStore }) => {
	let apiUrl = "https://swapi.tech/api/"
	return {
		store: {
				characters: [],
				planets: [],
				vehicles: [],
				details: {},
				favorites: [],
				isLogged: false,
				favoritesCharacters: [],
				favoritesPlanets: [],
				favoritesVehicles: []
		},
		actions: {
			getCharacters: () => {
				fetch(apiUrl + "people") 
				.then((response) => response.json())
				.then((data) => {
					setStore({characters: data.results})
				})
				.catch((error) => console.log(error))
			},
			getPlanets: () => {
				fetch(apiUrl + "planets") 
				.then((response) => response.json())
				.then((data) => {
					setStore({planets: data.results})
			   })
				.catch((error) => console.log(error))
			},
			getVehicles: () => {
				fetch(apiUrl + "vehicles") 
				.then((response) => response.json())
				.then((data) => {
					setStore({vehicles: data.results})
			   })
				.catch((error) => console.log(error))
			},
			getDetails: (category, uid) => {
				fetch(`https://swapi.tech/api/${category}/${uid}`) 
				.then((response) => response.json())
				.then((data) => setStore({
					details: {
						...data.result.properties,
						description: data.result.description
					}
				}))
				.catch((error) => console.log(error))
			},
			addFav: (name) => {
				let listFav = getStore().favorites
				let newFav = name
				let newListFav = listFav.concat(newFav) 
				setStore({favorites : newListFav})
			},
			removeFav: (name) => {
				let listFav = getStore().favorites
				let newListFav = listFav.filter((item)=> name !== item )
				setStore({favorites : newListFav})
			},
			favorites:(name) => {
				let favNames = getStore().favorites
				if (getStore().favorites.length == 0) {
					getActions().addFav(name)
				} else {
					if (favNames.includes(name)) {
						getActions().removeFav(name)
					} else {
						getActions().addFav(name)
					}
				}
			},
			login: async (email, password) => {
                try {
					const response = await fetch("https://improved-potato-5gqr7gvw45r7c46v5-3000.app.github.dev/login", {
						method: 'POST',
						headers:{
							'Content-Type':'application/json'
						},
						body: JSON.stringify({
							email:email,
							password:password
						})
					});
					if (response.status === 200) {
						const data = await response.json();
						localStorage.setItem("token", data.access_token);
						setStore({
							...getStore(),
							isLogged: true
						});
						return true;
					} else {
						setStore({
							...getStore(),
							isLogged: false
						});
						return false;
					}
                } catch (error) {
					setStore({
						...getStore(),
						isLogged: false
					});
					return false;
                }
            },
			getFavorites: async () => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch("https://improved-potato-5gqr7gvw45r7c46v5-3000.app.github.dev/users/favorites", {
						method: 'GET',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
					if (response.status === 200) {
						const data = await response.json();
						// obtener characters del store y guardarlos en una variable
						// filtrar los characters guardados usando los ids del back
						// guardar en el store como favoritos los filtrados
						const allCharacters = getStore().characters;
						const allPlanets = getStore().planets;
						const allVehicles = getStore().vehicles;
						const backendCharacters = data.results[0];
						const backendPlanets = data.results[1];
						const backendVehicles = data.results[2];
						const filteredCharacters = allCharacters.filter((character) => {
							return backendCharacters.some((beCharacter) => character.uid == beCharacter.character_id);
						});
						const filteredPlanets = allPlanets.filter((planet) => {
							return backendPlanets.some((bePlanet) => planet.uid == bePlanet.planet_id);
						});
						const filteredVehicles = allVehicles.filter((vehicle) => {
							return backendVehicles.some((beVehicle) => vehicle.uid == beVehicle.vehicle_id);
						});
						setStore({
							...getStore(),
							favoritesCharacters: filteredCharacters,
							favoritesPlanets: filteredPlanets,
							favoritesVehicles: filteredVehicles,
						});
					} else {
						return [];
						
					}
                } catch (error) {
                    return [];
                }
            }
		}
	};
};
export default getState;
