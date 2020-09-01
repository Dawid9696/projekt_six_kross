/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import ScrollContainer from "react-indiana-drag-scroll";

//ICONS
import { AiFillStar } from "react-icons/ai";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";

const BIKES = gql`
	query {
		bikes {
			id
			bikeName
			bikePrice
			bikePhotos
			bikeSale
			bikeSaleNewPrice
		}
	}
`;

function News() {
	const { loading, error, data } = useQuery(BIKES);

	const [textStyle, setTextStyle] = useState({
		right: "800px",
		opacity: "0",
		transition: "2s",
	});

	useEffect(() => {
		setTimeout(() => setTextStyle({ right: "0px", opacity: "1", transition: "2s" }), 0);
	}, []);

	return (
		<NewsDiv style={textStyle}>
			<div className='NewsHeader'>NOWOŚCI</div>
			<ScrollContainer
				className='scroll-container'
				vertical={false}
				style={{
					padding: "20px",
					width: "1300px",
					display: "flex",
					flexDirection: "row",
				}}
			>
				{loading ? (
					<p>Loading...</p>
				) : (
					data.bikes.map((card) => {
						return (
							<Link className='NewsScroll' to={`Rowery/${card.id}`}>
								<CardPhoto cardPhoto={card.bikePhotos[0]}></CardPhoto>
								<div className='BikeCard-One-Data-Ratio'>
									{" "}
									<p>5</p> <AiFillStar color='#ffa500' size='30px' style={{ margin: "0px" }} />
								</div>
								<CardName>{card.bikeName}</CardName>
								<CardPrice>{card.bikePrice} zł</CardPrice>
							</Link>
						);
					})
				)}
			</ScrollContainer>
		</NewsDiv>
	);
}

export default News;

const NewsDiv = styled.div`
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	width: 100%;
	height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const CardPhoto = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	background-image: url(${(props) => props.cardPhoto});
	background-repeat: no-repeat;
	background-size: contain;
	width: 300px;
	height: 300px;
	background-position: center;
	box-sizing: border-box;
`;

const CardName = styled.div`
	font-size: 19px;
	font-weight: 600;
	color: rgb(73, 73, 73);
	margin: 0px;
	padding: 10px;
	box-sizing: border-box;
	width: 300px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CardPrice = styled.div`
	font-size: 20px;
	font-weight: 500;
	margin: 0px;
	padding: 10px;
	box-sizing: border-box;
	width: 300px;
	height: 25px;
	color: red;
	display: flex;
	justify-content: center;
	align-items: center;
`;
