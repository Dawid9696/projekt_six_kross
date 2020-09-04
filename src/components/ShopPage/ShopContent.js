/** @format */

import React, { useState, useContext } from "react";
import { useQuery, gql, useMutation, fetchMore, NetworkStatus } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "../Loader";

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
			bikePrice
			bikeTransport
			bikePhotos
			bikeSale
			bikeSaleNewPrice
		}
	}
`;

const DELETE_BIKE = gql`
	mutation deleteBike($id: ID!) {
		deleteBike(id: $id) {
			bikeName
		}
	}
`;

const UPDATE_BIKE_SALE = gql`
	mutation updateBike($updateBike: UpdateBikeInput!, $id: ID!) {
		updateBike(updateBike: $updateBike, id: $id) {
			bikeName
		}
	}
`;

function ShopContent(props) {
	const ProviedProfileContext = useContext(MyProfileContext);

	const updateList = () =>
		fetchMore({
			variables: {
				limit: data.bikes.length,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					bikes: [...prev.bikes, ...fetchMoreResult.bikes],
				});
			},
		});

	const [deleteBike] = useMutation(DELETE_BIKE);
	const [updateBike] = useMutation(UPDATE_BIKE_SALE);

	const [sortQuery, setsortQuery] = useState(-1);

	const [saleStatus, setSaleStatus] = useState(false);

	const { loading, error, data, fetchMore, networkStatus, refetch } = useQuery(BIKES, {
		variables: {
			queries: {
				skip: 0,
				limit: 5,
				lowPrice: 0,
				sort: sortQuery,
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
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "cache-and-network",
	});

	const [saleBikePrice, setSaleBikePrice] = useState();

	if (networkStatus === NetworkStatus.fetchMore)
		return (
			<div className='Section-Three-Shop'>
				<Loader />
			</div>
		);
	if (loading || ProviedProfileContext.loading)
		return (
			<div className='Section-Three-Shop'>
				<Loader />
			</div>
		);
	if (error) return <div>Error</div>;

	return (
		<div className='Section-Three-Shop'>
			{data.bikes.length > 0 && (
				<div className='Section-Three-Shop-SortTab'>
					<div>
						<AiOutlineSortAscending size='30px' style={{ margin: "10px" }} />
					</div>
					<select className='Section-Three-Shop-SortTab-Selection' value={sortQuery} onChange={(e) => setsortQuery(parseInt(e.target.value))}>
						<option value={1}>Cena rosnąco</option>
						<option value={-1}>Cena malejąco</option>
					</select>
				</div>
			)}
			<div className='Section-Three-Shop-Cards'>
				{data.bikes.length == 0 ? (
					<p>Brak rowerów o takich parametrach</p>
				) : (
					data.bikes.map((bike) => {
						return (
							<BikeCard
								key={bike.id}
								item={bike}
								// onLoad={() => setTransportStatus(bike.bikeTransport)}
								removeBike={() => deleteBike({ variables: { id: bike.id } })}
								admin={ProviedProfileContext.data.myProfile.admin}
								sale={saleStatus}
								changeSaleStatus={() => setSaleStatus(!saleStatus)}
								changeSaleBikeTrue={() => {
									updateBike({ variables: { id: bike.id, updateBike: { bikeSale: true, bikeSaleNewPrice: saleBikePrice } } });
									refetch();
								}}
								changeSaleBikeFalse={() => {
									updateBike({ variables: { id: bike.id, updateBike: { bikeSale: false } } });
									refetch();
								}}
								changeSaleBikePrice={(newPrice) => {
									setSaleBikePrice(parseInt(newPrice));
								}}
								changeTransport={() => {
									updateBike({ variables: { id: bike.id, updateBike: { bikeTransport: !bike.bikeTransport } } });
									refetch();
								}}
							/>
						);
					})
				)}
				<div
					className='ShopContentFetchMore'
					onClick={() =>
						fetchMore({
							variables: {
								limit: data.bikes.length,
							},
							updateQuery: (prev, { fetchMoreResult }) => {
								if (!fetchMoreResult) return prev;
								return Object.assign({}, prev, {
									bikes: [...prev.bikes, ...fetchMoreResult.bikes],
								});
							},
						})
					}
				>
					Załaduj więcej !
				</div>
			</div>
		</div>
	);
}

export default ShopContent;

const BikeCard = (props) => {
	const { bikeName, bikePhotos, bikePrice, bikeType, bikeModel, bikeYear, bikeTransport, bikeSale, bikeSaleNewPrice, id } = props.item;

	return (
		<div className='BikeCard'>
			<div className='BikeCard-One'>
				<div className='BikeCard-One-Photo'>
					<img className='BikeCard-One-Photo-Img' src={bikePhotos[0]} />
				</div>
				<div className='BikeCard-One-Data'>
					{bikeTransport && <div className='BikeCard-One-Data-Trans'>Darmowa dostawa</div>}
					<div className='BikeCard-One-Data-Path'>
						{bikeType} / {bikeModel}
					</div>
					<div className='BikeCard-One-Data-Path'>{bikeYear}</div>
					<div className='BikeCard-One-Data-Name'>{bikeName}</div>
				</div>
			</div>
			<div className='BikeCard-Two'>
				<div className='BikeCard-Two-Price'>
					{props.admin && (
						<div className='BikeCard-Two-Price-Change'>
							<div className='BikeCard-Two-Price-Change-Option' onClick={props.changeSaleStatus}>
								Przeceń
							</div>
							<input className='BikeCard-Two-Price-Change-Switch' type='checkbox' checked={!props.sale} />
							<div className='BikeCard-Two-Price-Change-Data'>
								<input
									className='BikeCard-Two-Price-Change-Data-Input'
									type='text'
									placeholder='Wpisz nową cenę'
									onChange={(e) => props.changeSaleBikePrice(e.target.value)}
								/>
								<div className='BikeCard-Two-Price-Change-Data-Button' onClick={props.changeSaleBikeTrue}>
									Zapisz
								</div>
								{bikeSale && (
									<div className='BikeCard-Two-Price-Change-Data-Button' onClick={props.changeSaleBikeFalse}>
										Usuń przecenę
									</div>
								)}
							</div>
						</div>
					)}
					{bikeSale ? (
						<div>
							<div style={{ color: "red", textDecoration: "line-through" }}>{bikePrice} zł</div>
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
				{props.admin && (
					<div className='DeleteBike'>
						<GiLoveLetter onClick={props.changeTransport} size='30px' color={bikeTransport ? "Green" : "Grey"} />
						<FcDeleteRow onClick={props.removeBike} size='30px' style={{ margin: "10px" }} />
					</div>
				)}
			</div>
		</div>
	);
};
