/** @format */

import React, { useState } from "react";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import styled from "styled-components";

import { AiOutlineSortAscending, AiFillStar, AiOutlineArrowUp, AiOutlinePlus } from "react-icons/ai";

import { GiReturnArrow } from "react-icons/gi";
import { FiPackage } from "react-icons/fi";
import { MdLocationOn, MdDirectionsBike } from "react-icons/md";

const BIKES = gql`
	query {
		bikes {
			id
			bikeName
			bikeModel
			bikeFrame
			bikeColor
			bikeYear
			bikePrice
			bikeTransport
			bikePhotos
			bikeSale
			bikeSaleNewPrice
		}
	}
`;

function ShopPage(props) {
	const [checkBoxStatus0, setCheckBoxStatus0] = useState(false);
	const [checkBoxStatus1, setCheckBoxStatus1] = useState(false);
	const [checkBoxStatus2, setCheckBoxStatus2] = useState(false);
	const [checkBoxStatus3, setCheckBoxStatus3] = useState(false);
	const [checkBoxStatus4, setCheckBoxStatus4] = useState(false);

	const ScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const { loading, error, data, refetch, networkStatus } = useQuery(BIKES, {
		pollInterval: 3000,
	});

	if (loading) return <Loader />;
	if (error) return <div>Error</div>;

	const option = [
		{
			type: "Typ",
			drop: checkBoxStatus0,
			toggle: () => setCheckBoxStatus0(!checkBoxStatus0),
			options: [
				...new Set(
					data.bikes
						.map((item, index, array) => {
							return item.bikeType;
						})
						.flat()
				),
			],
		},
		{
			type: "Model",
			drop: checkBoxStatus1,
			toggle: () => setCheckBoxStatus1(!checkBoxStatus1),
			options: [
				...new Set(
					data.bikes
						.map((item, index, array) => {
							return item.bikeModel;
						})
						.flat()
				),
			],
		},
		{
			type: "Kolor",
			drop: checkBoxStatus2,
			toggle: () => setCheckBoxStatus2(!checkBoxStatus2),
			options: [
				...new Set(
					data.bikes
						.map((item, index, array) => {
							return item.bikeColor;
						})
						.flat()
				),
			],
		},
		{
			type: "Kolekcja",
			drop: checkBoxStatus3,
			toggle: () => setCheckBoxStatus3(!checkBoxStatus3),
			options: [
				...new Set(
					data.bikes
						.map((item, index, array) => {
							return item.bikeYear;
						})
						.flat()
				),
			],
		},
		{
			type: "Rama",
			drop: checkBoxStatus4,
			toggle: () => setCheckBoxStatus4(!checkBoxStatus4),
			options: [
				...new Set(
					data.bikes
						.map((item, index, array) => {
							return item.bikeFrame;
						})
						.flat()
				),
			],
		},
	];

	return (
		<section className='ShopPage'>
			<div className='Section-One'>
				<div className='Section-One-Count'>ROAD ({data.bikes.length})</div>
				<div className='Section-One-Path'>Kross / {props.match.path.slice(1, 7)}</div>
			</div>
			<div className='Section-Two'>
				<div>
					<div>
						<GiReturnArrow size='30px' color='grey' />
					</div>
					<div>Gwarancja zwrotu do 100 dni </div>
				</div>
				<div>
					<div>
						<FiPackage size='30px' color='grey' />
					</div>
					<div>Darmowa dostawa od 49 PLN </div>
				</div>
				<div>
					<div>
						<MdLocationOn size='30px' color='grey' />
					</div>
					<div>600 punktów odbioru rowerów </div>
				</div>
				<div>
					<div>
						<MdDirectionsBike size='30px' color='grey' />
					</div>
					<div>Rower gotowy do jazdy </div>
				</div>
			</div>
			<div className='Section-Three'>
				<div className='Section-Three-FilterTab'>
					<div className='Section-Three-Price'>
						<div className='Section-Three-Price-Title'>CENA</div>
						<div className='Section-Three-Price-Filter'>
							<input className='Section-Three-Price-Filter-Input' type='text' placeholder='Od..' />
							<div>-</div>
							<input className='Section-Three-Price-Filter-Input' type='text' placeholder='Do..' />
						</div>
					</div>
					{option.map((item) => {
						return (
							<div className='Section-Three-FilterTab-Card'>
								<div className='Section-Three-FilterTab-Card-Visible' onClick={item.toggle}>
									<div className='Section-Three-FilterTab-Card-Visible-Font'>{item.type}</div>
									<div className='Section-Three-FilterTab-Card-Visible-Icon'>
										<AiOutlinePlus size='25px' />
									</div>
								</div>
								<input className='Section-Three-FilterTab-Card-Switch' type='checkbox' checked={item.drop} />
								<div className='Section-Three-FilterTab-Card-Hidden'>
									{item.options[0] != null &&
										item.options.map((item) => {
											return (
												<div className='Section-Three-FilterTab-Card-Hidden-Card'>
													<input type='checkbox' />
													<div>{item}</div>
												</div>
											);
										})}
								</div>
							</div>
						);
					})}
				</div>
				<div className='Section-Three-Shop'>
					<div className='Section-Three-Shop-SortTab'>
						<div>
							<AiOutlineSortAscending size='30px' style={{ margin: "10px" }} />
						</div>
						<select className='Section-Three-Shop-SortTab-Selection' id='cars' name='cars'>
							<option value='volvo'>Cena rosnąco</option>
							<option value='saab'>Cena malejąco</option>
							<option value='fiat'>Popularne</option>
							<option value='audi'>Najwyżej ocecniane</option>
							<option value='audi'>Wyprzedaż</option>
							<option value='audi'>Darmowa dostawa</option>
						</select>
					</div>
					<div className='Section-Three-Shop-Cards'>
						{loading ? (
							<p>Loading ...</p>
						) : (
							data.bikes.map((bike) => {
								return <BikeCard key={bike.id} item={bike} />;
							})
						)}
					</div>
				</div>
			</div>
			<div className='scrollTop' onClick={() => ScrollToTop()}>
				<AiOutlineArrowUp size='40px' />
			</div>
		</section>
	);
}

export default ShopPage;

const BikeCard = (props) => {
	const { bikeName, bikePhotos, bikePrice, bikeType, bikeModel, bikeYear, bikeTransport, bikeSale, bikeSaleNewPrice, id } = props.item;
	return (
		<div className='BikeCard'>
			<div className='BikeCard-One'>
				<div className='BikeCard-One-Photo'>
					<img className='BikeCard-One-Photo-Img' src={bikePhotos[0]} />
				</div>
				<div className='BikeCard-One-Data'>
					{bikeTransport && <div className='BikeCard-One-Data-Trans'></div>}
					<div className='BikeCard-One-Data-Path'>
						{bikeType} / {bikeModel} / {bikeYear}
					</div>
					<div className='BikeCard-One-Data-Name'>{bikeName}</div>
					{/* <div  className="BikeCard-One-Data-Ratio"> <p>5</p> <AiFillStar color="#ffa500" size="30px" /></div> */}
					<div className='BikeCard-One-Data-Grade'>
						{" "}
						<p>5</p> <AiFillStar color='#ffa500' size='30px' style={{ margin: "5px" }} />
					</div>
				</div>
			</div>
			<div className='BikeCard-Two'>
				<div className='BikeCard-Two-Price'>
					{bikeSale ? (
						<div>
							<div>{bikePrice} zł</div>
							<div>{bikeSaleNewPrice} zł</div>
						</div>
					) : (
						<div>{bikePrice} zł</div>
					)}
				</div>
				<div className='BikeCard-Two-Options'>
					<Link to={`/Rowery/${id}`}>
						<button class='custom-btn btn-7'>
							<span>Sprawdź</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
