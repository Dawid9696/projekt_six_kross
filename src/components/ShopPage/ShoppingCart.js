/** @format */
import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

import Loader from "../Loader";
import { MyProfileContext } from "../Navbar";

const DELETE_FROM_SHOPPINGCART = gql`
	mutation deleteFromShoppingCart($id: ID!) {
		deleteFromShoppingCart(id: $id) {
			name
		}
	}
`;

const Shopping = () => {
	const ProviedProfileContext = useContext(MyProfileContext);
	const [deleteFromShoppingCart] = useMutation(DELETE_FROM_SHOPPINGCART);

	return (
		<div className='Shopping'>
			{ProviedProfileContext.loading ? (
				<Loader />
			) : (
				<React.Fragment>
					<div>
						{ProviedProfileContext.data.myProfile.shoppingCart.length == 0 ? (
							<h1>Twój koszyk jest pusty {ProviedProfileContext.data.myProfile.name}</h1>
						) : (
							<h1>Twój koszyk {ProviedProfileContext.data.myProfile.name}</h1>
						)}
					</div>
					<div className='Shopping-Cards'>
						{ProviedProfileContext.data.myProfile.shoppingCart.map((bike) => (
							<ShoppingCard
								key={bike._id}
								item={bike}
								removeProduct={() => {
									console.log(bike.id);
									deleteFromShoppingCart({ variables: { id: bike.id } });
								}}
							/>
						))}
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Shopping;

const ShoppingCard = (props) => {
	const { bikeName, bikePhotos, id, bikeModel, bikePrice, bikeType, bikeYear } = props.item;
	return (
		<div className='Shopping-Card'>
			<Link to={`/Rowery/${id}`} title={bikeName} className='Shopping-Card-img'>
				<img src={bikePhotos[0]} />
			</Link>
			<div className='Shopping-Card-name'>
				<div>
					<h3 style={{ color: "black" }}>{bikeName}</h3>
				</div>
				<div>
					<p style={{ color: "#888888" }}>{bikeModel}</p>
				</div>
			</div>
			<div className='Shopping-Card-price'>
				<div>
					<h3>Cena: {bikePrice} zł</h3>
				</div>
				<div>
					{bikeType} / {bikeModel} / {bikeYear}
				</div>
				<div className='Shopping-Card-icon'>
					<TiDeleteOutline color='red' size='40px' onClick={props.removeProduct} />
				</div>
			</div>
		</div>
	);
};
