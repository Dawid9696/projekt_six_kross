/** @format */

import React from "react";

import News from "./News";
import Slideshow from "./Slider";
import Contact from "./Contact";
import Carousel from "./Carousel";

import { AiOutlineArrowUp } from "react-icons/ai";

function MainPage(props) {
	console.log("RENDER PARENT");
	return (
		<section className='MainPage'>
			<Slideshow />
			<News />
			<Contact />
			<Carousel />
		</section>
	);
}

export default MainPage;
