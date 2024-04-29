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
			login: async (email, password) => {
                try {
					const response = await fetch("https://congenial-potato-jj57pjrx494qc5vpv-3000.app.github.dev/login", {
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
			favorites: async () => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch("https://congenial-potato-jj57pjrx494qc5vpv-3000.app.github.dev//users/favorites", {
						method: 'GET',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
					if (response.status === 200) {
						const data = await response.json();
						const allCharacters = getStore().characters;
						const allPlanets = getStore().planets;
						const allVehicles = getStore().vehicles;
						const backendCharacters = data.results[0];
						const backendPlanets = data.results[1];
						const backendVehicles = data.results[2];
						const filteredCharacters = allCharacters.filter((character) => {
							return backendCharacters.some((beCharacter) => character.name == beCharacter.character_id);
						});
						const filteredPlanets = allPlanets.filter((planet) => {
							return backendPlanets.some((bePlanet) => planet.name == bePlanet.planet_id);
						});
						const filteredVehicles = allVehicles.filter((vehicle) => {
							return backendVehicles.some((beVehicle) => vehicle.name == beVehicle.vehicle_id);
						});
						setStore({
							...getStore(),
							favorites: [
								filteredCharacters,
								filteredPlanets,
								filteredVehicles
							]
						});
					} else {
						return [];
					}
                } catch (error) {
                    return []; 
                } 
            },
			addFav: async (category, uid) => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`https://congenial-potato-jj57pjrx494qc5vpv-3000.app.github.dev/favorite/${category}/${uid}`, {
						method: 'POST',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});
				 	if (response.status === 201) {
						if (category === "people") {
							let listFav = getStore().favorites[0];
							const allCharacters = getStore().characters;
							const newFav = allCharacters.filter((character) => character.uid === uid);
							const newListFav = listFav.concat(newFav) ;
							setStore({
								...getStore(),
								favorites: [
									newListFav,
									getStore().favorites[1],
									getStore().favorites[2]
								]
							})
						} else if (category === "planets") {
							let listFav = getStore().favorites[1];
							const allPlanets = getStore().planets;
							const newFav = allPlanets.filter((planet) => planet.uid === uid);
							const newListFav = listFav.concat(newFav) ;
							setStore({
								...getStore(),
								favorites: [
									getStore().favorites[0],
									newListFav,
									getStore().favorites[2]
								]
							})
						} else {
							let listFav = getStore().favorites[2];
							const allVehicles = getStore().vehicles;
							const newFav = allVehicles.filter((vehicle) => vehicle.uid === uid);
							const newListFav = listFav.concat(newFav) ;
							setStore({
								...getStore(),
								favorites: [
									getStore().favorites[0],
									getStore().favorites[1],
									newListFav
								]
							})
						}
					} else {
						return [];
					}
                } catch (error) {
                    return []; 
                } 
			},
			removeFav: async (category, uid) => {
				const token = localStorage.getItem("token")
                try {
					const response = await fetch(`https://congenial-potato-jj57pjrx494qc5vpv-3000.app.github.dev/favorite/${category}/${uid}`, {
						method: 'DELETE',
						headers:{
							'Content-Type':'application/json',
							'Authorization': "Bearer " + token
						},
                	});

					if (response.status === 200) {
						if (category === "people") {
							let listFav = getStore().favorites[0];
							const newListFav = listFav.filter((character) => character.uid !== uid);
							setStore({
								...getStore(),
								favorites: [
									newListFav,
									getStore().favorites[1],
									getStore().favorites[2]
								]
							})
						} else if (category === "planets") {
							let listFav = getStore().favorites[1];
							const newListFav = listFav.filter((planet) => planet.uid !== uid);
							setStore({
								...getStore(),
								favorites: [
									getStore().favorites[0],
									newListFav,
									getStore().favorites[2]
								]
							})
						} else {
							let listFav = getStore().favorites[2];
							const newListFav = listFav.filter((vehicle) => vehicle.uid !== uid);
							setStore({
								...getStore(),
								favorites: [
									getStore().favorites[0],
									getStore().favorites[1],
									newListFav
								]
							})
						}
					}
				} catch (error) {
					return []; 
				} 
			}
		}
	};
};
export default getState;
