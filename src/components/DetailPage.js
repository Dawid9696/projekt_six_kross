/** @format */

import React, { useState, useContext } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

//ICONS
import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

//COMPONENTS
import Loader from "./Loader";
import { MyProfileContext } from "./Navbar";

const BIKE = gql`
	query bike($id: ID!) {
		bike(id: $id) {
			id
			bikeName
			bikeModel
			bikeFrame
			bikeDesc
			bikeColor
			bikeYear
			bikePrice
			bikePhotos
			bikeComments {
				comment
				commentedBy {
					name
					surname
					photo
				}
			}
		}
	}
`;

const ADD_COMMENT = gql`
	mutation createComment($commentData: CreateCommentInput!) {
		createComment(commentData: $commentData) {
			comment
		}
	}
`;

const ADD_TO_SHOPPINGCART = gql`
	mutation addToShoppingCart($id: ID!) {
		addToShoppingCart(id: $id) {
			name
		}
	}
`;

function DetailPage() {
	const ProviedProfileContext = useContext(MyProfileContext);
	let { id } = useParams();
	const [bigPhoto, setBigPhoto] = useState(0);
	const [comment, setComment] = useState();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { loading, error, data, refetch, networkStatus } = useQuery(BIKE, {
		variables: { id },
		pollInterval: 500,
	});
	const jwt = localStorage.getItem("token");
	const [createComment] = useMutation(ADD_COMMENT);
	const [addToShoppingCart] = useMutation(ADD_TO_SHOPPINGCART);
	if (error) return <div>Error</div>;

	return (
		<section className='DetailPage'>
			{loading ? (
				<Loader />
			) : (
				<React.Fragment>
					<Modal
						isOpen={modalIsOpen}
						shouldCloseOnOverlayClick={true}
						shouldCloseOnEsc={true}
						onRequestClose={() => setModalIsOpen(false)}
						closeTimeoutMS={150}
						onAfterOpen={() => console.log("OPEN MODAL")}
						className='Modal'
						overlayClassName='ModalOverlay'
					>
						<div className='Modal-Title'>
							<div className='Modal-Title-Text'>Dodałeś do koszyka:</div>
							<div className='Modal-Title-Name'>{data.bike.bikeName}</div>
						</div>
						<div>
							<BikeCard key={data.bike.id} item={data.bike} />
						</div>
						<div className='Modal-Button'>Przejdz do koszyka</div>
						<div className='Modal-Button-Close' onClick={() => setModalIsOpen(false)}>
							Zamknij
						</div>
					</Modal>
					<div className='DetailPage-One'>
						<div className='DetailPage-One-Photos'>
							<div className='DetailPage-One-Photos-BigPhoto'>
								<img
									className='DetailPage-One-Photos-BigPhoto-Img'
									src={data.bike.bikePhotos[bigPhoto]}
								/>
							</div>
							<div className='DetailPage-One-Photos-SmallPhotos'>
								{data.bike.bikePhotos.map((item, index) => {
									return (
										<div
											className='DetailPage-One-SmallPhoto'
											onClick={() => setBigPhoto(index)}
										>
											<img
												className='DetailPage-One-SmallPhoto-Img'
												src={item}
											/>
										</div>
									);
								})}
							</div>
						</div>

						<div className='DetailPage-Desc'>
							<div className='DetailPage-Desc-Ratio'>
								<div className='BikeCard-One-Data-Trans'>Darmowa dostawa</div>
							</div>
							<div className='BikeCard-One-Data-Name'>{data.bike.bikeName}</div>
							<div className='BikeCard-One-Data-Ratio'>
								{" "}
								<p>5</p>{" "}
								<AiFillStar color='#ffa500' size='55px' style={{ margin: "5px" }} />
							</div>
							<div className='BikeCard-One-Data-Data'>Model: {data.bike.bikeModel}</div>
							<div className='BikeCard-One-Data-Data'>Kolekcja: {data.bike.bikeYear}</div>
							<div className='BikeCard-One-Data-Data'>Rama: {data.bike.bikeFrame}</div>
							<div className='DetailPage-Desc-Price'>
								<div className='DetailPage-Desc-Pirce-Cena'>Cena:</div>
								<div className='DetailPage-Desc-Price-Price'>
									{data.bike.bikePrice} zł
								</div>
							</div>
							<div className='DetailPage-Desc-ColorTitle'>Wersje kolorystyczne:</div>
							<div className='DetailPage-Desc-Colors'>
								{data.bike.bikeColor.map((item) => {
									return (
										<div className='DetailPage-Desc-Color'>
											{item == "White" ? (
												<div
													className='DetailPage-Desc-Icon'
													style={{
														backgroundColor:
															"#f3f3f3",
													}}
												></div>
											) : (
												<div
													className='DetailPage-Desc-Icon'
													style={{
														backgroundColor: item,
													}}
												></div>
											)}
											<div className='DetailPage-Desc-ColorName'>
												{item}
											</div>
										</div>
									);
								})}
							</div>
							{jwt && (
								<div>
									<button
										class='custom-btn btn-7'
										onClick={() => {
											addToShoppingCart({
												variables: {
													id: data.bike.id,
												},
											});
											setModalIsOpen(true);
										}}
									>
										<span>Dodaj do koszyka</span>
									</button>
								</div>
							)}
						</div>
					</div>
					<div className='DetailPage-Two'>
						<div className='DetailPage-Two-Title'>Opis</div>
						<div className='DetailPage-Two-Desc'>{data.bike.bikeDesc}</div>
					</div>
					{jwt && (
						<div className='DetailPage-Three'>
							<div className='DetailPage-Two-Title'>Opinie</div>
							<div className='DetailPage-Two-Comments'>
								{data.bike.bikeComments.length == 0 ? (
									<h3>Brak komentarzy</h3>
								) : (
									data.bike.bikeComments.map((comment) => {
										return (
											<div className='DetailPage-Two-Comment'>
												<div className='createComment-userPhoto'>
													<img
														src={
															comment
																.commentedBy
																.photo
														}
														width='100%'
													/>
												</div>
												<div className='DetailPage-Two-Comment-Data'>
													<div className='DetailPage-Two-Comment-Top'>
														<div className='DetailPage-Two-Comment-Top-Name'>
															{
																comment
																	.commentedBy
																	.name
															}
														</div>
														<div className='DetailPage-Two-Comment-Top-Date'>
															{
																comment.commentDate
															}
															20-20-20
														</div>
													</div>
													<div className='DetailPage-Two-Comment-Mid'>
														{
															comment.comment
														}
													</div>
													<div className='DetailPage-Two-Comment-Bottom'>
														<div>
															5{" "}
															<AiFillStar color='#ffa500' />
														</div>
													</div>
												</div>
											</div>
										);
									})
								)}
							</div>
							<div className='createComment'>
								<div className='createComment-userPhoto'>
									<img
										src={ProviedProfileContext.data.myProfile.photo}
										width='100%'
									/>
								</div>
								<div>
									<div class='rating rating2'>
										<a href='#5' title='Give 5 stars'>
											★
										</a>
										<a href='#4' title='Give 4 stars'>
											★
										</a>
										<a href='#3' title='Give 3 stars'>
											★
										</a>
										<a href='#2' title='Give 2 stars'>
											★
										</a>
										<a href='#1' title='Give 1 star'>
											★
										</a>
									</div>

									<div className='Contact-InputField'>
										<input
											className='Contact-SearchInput'
											onChange={(e) =>
												setComment(e.target.value)
											}
											value={comment}
											style={{
												backgroundColor: "#383838",
												color: "white",
											}}
											type='text'
											placeholder={`Szukaj ${ProviedProfileContext.data.myProfile.name}...`}
										/>
										<div className='Contact-InputField-Icon'>
											<RiSendPlaneFill
												onClick={() => {
													createComment({
														variables: {
															commentData: {
																comment,
																inBike: id,
															},
														},
													});
												}}
												color='black'
												size='40px'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}{" "}
				</React.Fragment>
			)}
		</section>
	);
}

export default DetailPage;

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
			</div>
		</div>
	);
};
