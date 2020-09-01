/** @format */

import React from "react";
import styled from "styled-components";

//ICONS
import { AiOutlineSearch } from "react-icons/ai";
import { RiMailSendFill } from "react-icons/ri";

function Contact() {
	return (
		<div className='Contact'>
			<div className='Contact-Photo'>
				<img className='Contact-Photo-Img' src='https://kross.eu/assets/images/bike.png' />
			</div>
			<div className='Contact-Form'>
				<h1 style={{ color: "white" }}>Chcesz być na bieżąco?</h1>
				<h7 style={{ color: "white" }}>
					Zapisz się i otrzymuj najświeższe informacje na temat nowych modeli marki KROSS, aktualnych promocji i sukcesów drużyny Kross Racing Team.
				</h7>
				<div className='Contact-InputField'>
					<input className='Contact-SearchInput' type='text' placeholder='Szukaj...' />
					<div className='Contact-InputField-Icon'>
						<RiMailSendFill color='black' size='40px' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
