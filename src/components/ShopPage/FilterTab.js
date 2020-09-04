/** @format */

import React, { useState, useContext } from "react";
import { useQuery, gql, useMutation, fetchMore, NetworkStatus } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import ShopPageContent from "./ShopContent";

import { AiOutlineSortAscending, AiFillStar, AiOutlineArrowUp, AiOutlinePlus } from "react-icons/ai";

import { GiReturnArrow, GiLoveLetter } from "react-icons/gi";
import { FiPackage } from "react-icons/fi";
import { MdLocationOn, MdDirectionsBike } from "react-icons/md";
import { FcDeleteRow } from "react-icons/fc";
import { GrDeliver } from "react-icons/gr";
import { MyProfileContext } from "../Navbar";

const BIKES = gql`
	query bikes($queries: QueryAllBikesInput) {
		bikes(queries: $queries) {
			id
			bikeName
			bikeModel
			bikeFrame
			bikeColor
			bikeYear
			bikeType
		}
	}
`;

function FilterTab(props) {
	const ProviedProfileContext = useContext(MyProfileContext);

	const [checkBoxStatus0, setCheckBoxStatus0] = useState(false);
	const [checkBoxStatus1, setCheckBoxStatus1] = useState(false);
	const [checkBoxStatus2, setCheckBoxStatus2] = useState(false);
	const [checkBoxStatus3, setCheckBoxStatus3] = useState(false);
	const [checkBoxStatus4, setCheckBoxStatus4] = useState(false);

	const [lowPriceQuery, setlowPriceQuery] = useState(0);

	const [highPriceQuery, setHighPriceQuery] = useState(20000);

	const { loading, error, data, fetchMore, networkStatus } = useQuery(BIKES, {
		variables: {
			queries: {
				skip: 0,
				limit: 5,
				lowPrice: 0,
				sort: 1,
				highPrice: 20000,
				// sales: true,
				// transport: true,
				// popular: true,
				// type: ["Szosowe"],
				// model: ["Road"],
				// color: ["Red"],
				// // frame: ["Tytan"],
				// year: [2019],
			},
		},
		// pollInterval: 500,
		fetchPolicy: "cache-and-network",
	});

	if (loading || ProviedProfileContext.loading) return "Refe";
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
		<div className='Section-Three-FilterTab'>
			<div className='Section-Three-Price'>
				<div className='Section-Three-Price-Title'>CENA</div>
				<div className='Section-Three-Price-Filter'>
					<input
						className='Section-Three-Price-Filter-Input'
						onChange={(e) => setlowPriceQuery(parseInt(e.target.value))}
						type='text'
						placeholder='Od..'
					/>
					<div>-</div>
					<input
						className='Section-Three-Price-Filter-Input'
						onChange={(e) => setHighPriceQuery(parseInt(e.target.value))}
						type='text'
						placeholder='Do..'
					/>
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
	);
}

export default FilterTab;
