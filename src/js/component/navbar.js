import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	const {store, actions}= useContext(Context);
	const navigate = useNavigate();
	const token = localStorage.getItem("token")

	const handleLogOut= () => {
		actions.logOut();
		navigate('/')
	};

	const removeFavorite = (indexCat, uid) => {
		let category;
		if (indexCat === 0) {
			category = "people";
		} else if (indexCat === 1) {
			category = "planets";
		} else {
			category = "vehicles";
		}
		actions.removeFav(category, uid);
	};

	return (
		<nav className="navbar navbar-expand-lg bg-light">			
			<div className="container-fluid">
				<Link to="/">
					<img className="navbar-brand text-black ms-5 logostarwars" src="https://logos-marcas.com/wp-content/uploads/2020/11/Star-Wars-Logo.png" />
				</Link>
				{token ?
					<>
						<div className="nav dropdown me-5">
							<a className=" d-flex nav-link dropdown-toggle text-white bg-primary rounded align-items-center" href="#" role="button" data-bs-toggle="dropdown">
								Favorites
								<span className="bg-secondary px-2 ms-1" style={{borderRadius:"30px"}}>{store.favorites[0].length + store.favorites[1].length + store.favorites[2].length}</span>
							</a>
							<ul className="dropdown-menu">
								{store.favorites[0].length === 0 && store.favorites[1].length === 0 && store.favorites[2].length === 0
									? <li className="text-center">(empty)</li>
									: store.favorites.map((elem, indexCat) => (
										(elem.map((item, index) => (
											<li key={index} className="d-flex justify-content-between text-primary">
												{item.name}
												<button onClick={() => removeFavorite(indexCat, item.uid)} className="btn p-0 px-1">
													<i className="fas fa-trash"></i>
												</button>
											</li>
										)))
									))
								}
							</ul>
						</div>
						<div>
							<button className="btn-lg" onClick={handleLogOut}>Log Out</button>
						</div>
					</>
					: (
						<Link to="/login">
							<div>
								<button className="btn-lg">
									Log In
								</button>
							</div> 
						</Link>
					)
				}	
			</div>
		</nav>
	);
};
