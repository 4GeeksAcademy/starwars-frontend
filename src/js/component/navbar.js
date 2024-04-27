import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	const {store, actions}= useContext(Context)
	return (
		<nav className="navbar navbar-expand-lg bg-light">			
			<div className="container-fluid">
				<Link to="/">
					<img className="navbar-brand text-black ms-5 logostarwars" src="https://logos-marcas.com/wp-content/uploads/2020/11/Star-Wars-Logo.png" />
				</Link>
				{store.isLogged
					? null
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
				{!store.isLogged
					? null
					: (
						<>
							<Link to="/users/favorites">
								<div>
									<button className="btn-lg">
										MY FAVORITES
									</button>
								</div> 
							</Link>
							{/* <li className="nav dropdown me-5">
								<a className=" d-flex nav-link dropdown-toggle text-white bg-primary rounded align-items-center" href="#" role="button" data-bs-toggle="dropdown">
									Favorites
									<span className="bg-secondary px-2 ms-1" style={{borderRadius:"30px"}}>{store.favorites.length}</span>
								</a>
								<ul className="dropdown-menu">
									{store.favorites.length === 0 
										? <li className="text-center">(empty)</li>
										: store.favorites.map((item, index) => (
											<li key={index} className="d-flex justify-content-between text-primary">
												{item}
												<button onClick={() => actions.removeFav(item)} className="btn p-0 px-1">
													<i class="fas fa-trash"></i>
												</button>
											</li>
										))
									}
								</ul>
							</li> */}
						</>
					)
				}
			</div>
		</nav>
	);
};
