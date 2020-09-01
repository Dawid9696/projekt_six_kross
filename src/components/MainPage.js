/** @format */

import React from "react";

import News from "./News";
import Slideshow from "./Slider";
import Contact from "./Contact";
import Carousel from "./Carousel";

import { AiOutlineArrowUp } from "react-icons/ai";

function MainPage(props) {
	const ScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<section className='MainPage'>
			<Slideshow />
			<News />
			<Contact />
			<Carousel />
			<div className='scrollTop' onClick={() => ScrollToTop()}>
				<AiOutlineArrowUp size='40px' />
			</div>
		</section>
	);
}

export default MainPage;
