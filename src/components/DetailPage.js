/** @format */

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

import News from "./News";
import Slideshow from "./Slider";
import Contact from "./Contact";
import Loader from "./Loader";
import RatingStars from "./RatingStars";

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
			# bikeSale
			# bikeSaleNewPrice
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

function DetailPage() {
	let { id } = useParams();

	const [bigPhoto, setBigPhoto] = useState(0);
	const [comment, setComment] = useState();

	const { loading, error, data, refetch, networkStatus } = useQuery(BIKE, {
		variables: { id },
		// notifyOnNetworkStatusChange: true,
		pollInterval: 500,
	});

	const jwt = localStorage.getItem("token");

	const [createComment] = useMutation(ADD_COMMENT);
	// if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
	if (error) return <div>Error</div>;

	return (
		<section className='DetailPage'>
			{loading ? (
				<Loader />
			) : (
				<React.Fragment>
					<div className='DetailPage-One'>
						<div className='DetailPage-One-Photos'>
							<div className='DetailPage-One-Photos-BigPhoto'>
								<img className='DetailPage-One-Photos-BigPhoto-Img' src={data.bike.bikePhotos[bigPhoto]} />
							</div>
							<div className='DetailPage-One-Photos-SmallPhotos'>
								{data.bike.bikePhotos.map((item, index) => {
									return (
										<div className='DetailPage-One-SmallPhoto' onClick={() => setBigPhoto(index)}>
											<img className='DetailPage-One-SmallPhoto-Img' src={item} />
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
								<p>5</p> <AiFillStar color='#ffa500' size='55px' style={{ margin: "5px" }} />
							</div>
							<div className='BikeCard-One-Data-Data'>Model: {data.bike.bikeModel}</div>
							<div className='BikeCard-One-Data-Data'>Kolekcja: {data.bike.bikeYear}</div>
							<div className='BikeCard-One-Data-Data'>Rama: {data.bike.bikeFrame}</div>
							<div className='DetailPage-Desc-Price'>
								<div className='DetailPage-Desc-Pirce-Cena'>Cena:</div>
								<div className='DetailPage-Desc-Price-Price'>{data.bike.bikePrice} zł</div>
							</div>
							<div className='DetailPage-Desc-ColorTitle'>Wersje kolorystyczne:</div>
							<div className='DetailPage-Desc-Colors'>
								{data.bike.bikeColor.map((item) => {
									return (
										<div className='DetailPage-Desc-Color'>
											{item == "White" ? (
												<div className='DetailPage-Desc-Icon' style={{ backgroundColor: "#f3f3f3" }}></div>
											) : (
												<div className='DetailPage-Desc-Icon' style={{ backgroundColor: item }}></div>
											)}
											<div className='DetailPage-Desc-ColorName'>{item}</div>
										</div>
									);
								})}
							</div>
							{jwt && (
								<div>
									<button class='custom-btn btn-7'>
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
													<img src={comment.commentedBy.photo} width='100%' />
												</div>
												<div className='DetailPage-Two-Comment-Data'>
													<div className='DetailPage-Two-Comment-Top'>
														<div className='DetailPage-Two-Comment-Top-Name'>{comment.commentedBy.name}</div>
														<div className='DetailPage-Two-Comment-Top-Date'>{comment.commentDate}20-20-20</div>
													</div>
													<div className='DetailPage-Two-Comment-Mid'>{comment.comment}</div>
													<div className='DetailPage-Two-Comment-Bottom'>
														<div>
															5 <AiFillStar color='#ffa500' />
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
										src='data:image/png;base64,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'
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
											onChange={(e) => setComment(e.target.value)}
											value={comment}
											style={{ backgroundColor: "#383838", color: "white" }}
											type='text'
											placeholder='Szukaj...'
										/>
										<div className='Contact-InputField-Icon'>
											<RiSendPlaneFill
												onClick={() => {
													createComment({
														variables: { commentData: { comment, inBike: id } },
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
