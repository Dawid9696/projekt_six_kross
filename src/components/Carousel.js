/** @format */

import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

function Carousel() {
	const { loading, error, data } = useQuery(BIKES);

	console.log(data);

	return (
		<div className='Carousel'>
			<div className='Carousel-Content'>
				{loading ? (
					<p>Loading..</p>
				) : (
					data.bikes.map((item, index) => {
						return (
							<React.Fragment>
								<Rotate variable={index}>
									<Card className='NewsScroll' to={`Rowery/${data.bikes[index].id}`}>
										<CardPhoto cardPhoto={data.bikes[index].bikePhotos[0]}></CardPhoto>
										<CardName>{data.bikes[index].bikeName}</CardName>
										<CardPrice>{data.bikes[index].bikePrice} zł</CardPrice>
									</Card>
								</Rotate>
							</React.Fragment>
						);
					})
				)}
			</div>
		</div>
	);
}

export default Carousel;

const Rotate = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transform-origin: center;
	transform-style: preserve-3d;
	transform: ${(props) => {
		return `rotateY(calc(${props.variable} * 72deg)) translateZ(300px)`;
	}};
`;

const Card = styled.div`
	background-color: white;
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
