/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const slideImages = [
	"https://kross.eu/media/cache/filemanager_original/images/wersja_pl/slidery/pro_062020/slider_glowny_desktop_l1.png",
	"https://kross.eu/media/cache/filemanager_original/images/wersja_pl/homepage/slider/slider_4/Slider_darmowa_dostawa_v3_desktop.png",
	"https://kross.eu/media/cache/filemanager_original/images/wersja_pl/homepage/slider/slider_2/rrso_Gowna_Slider_1_desktop.png",
];

const Slideshow = () => {
	const [opacity0, setOpacity0] = useState(1);
	const [opacity1, setOpacity1] = useState(0);
	const [opacity2, setOpacity2] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeout(() => {
				setOpacity0(0);
				setOpacity1(1);
			}, 0);
			setTimeout(() => {
				setOpacity1(0);
				setOpacity2(1);
			}, 5000);
			setTimeout(() => {
				setOpacity2(0);
				setOpacity0(1);
			}, 10000);
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	});

	return (
		<Slider>
			<EachSlide>
				<Slide opacity={opacity0} slide={slideImages[0]}></Slide>
				<Slide opacity={opacity1} slide={slideImages[1]}></Slide>
				<Slide opacity={opacity2} slide={slideImages[2]}></Slide>
			</EachSlide>
		</Slider>
	);
};

export default Slideshow;

const Slider = styled.div`
	margin: 0px;
	padding: 0px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const EachSlide = styled.div`
	position: relative;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 650px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 1s;
`;

const Slide = styled.div`
	position: absolute;
	opacity: ${(props) => props.opacity};
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 650px;
	object-fit: cover;
	background-image: url(${(props) => props.slide});
	background-repeat: no-repeat;
	background-size: cover;
	box-sizing: border-box;
	transition: 1s;
`;
