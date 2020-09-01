/** @format */

import React, { useState, useContext } from "react";
import { LogoContext } from "../App";
import { Link, useHistory } from "react-router-dom";
//ICONS
import { AiOutlineLogin, AiFillHome, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai";
import { SiShopify } from "react-icons/si";

function Navbar(props) {
	let url = useHistory();
	const [checkBoxStatus, setCheckBoxStatus] = useState(false);
	const Logo = useContext(LogoContext);
	const logOut = () => {
		localStorage.removeItem(" token");
		url.push("/LoginRegister");
		window.location.reload(false);
	};

	const jwt = localStorage.getItem("token");

	return (
		<div className='Navbar'>
			<Link to={"/"} className='Navbar-Logo'>
				<img className='Navbar-Logo-Img' src={Logo} alt='Kross' title='Kross' />
			</Link>
			<div className='Navbar-Home'>
				<Link className='Navbar-Home-Links' to={"/"}>
					<AiFillHome size='50px' color='black' />
				</Link>
				<Link className='Navbar-Home-Links' to={"/Shop"}>
					<SiShopify size='50px' color='black' />
				</Link>
			</div>
			<div className='Navbar-UserPanel'>
				<div className='SearchTabContainer'>
					<input className='CheckField' type='checkbox' checked={checkBoxStatus} />
					<div className='InputField'>
						<input className='SearchInput' type='text' placeholder='Szukaj...' />
						<div onClick={() => setCheckBoxStatus(true)} className='InputField-Icon'>
							<AiOutlineSearch color='black' size='40px' />
						</div>
					</div>
				</div>
				{jwt && (
					<div className='Navbar-Icon'>
						<AiOutlineShoppingCart color='black' size='40px' />
					</div>
				)}
				{jwt ? (
					<div className='Navbar-Icon'>
						<AiOutlineLogout onClick={logOut} color='black' size='40px' />
					</div>
				) : (
					<Link to={"LoginRegister"} className='Navbar-Icon'>
						<AiOutlineLogin color='black' size='40px' />
					</Link>
				)}
			</div>
		</div>
	);
}

export default Navbar;
