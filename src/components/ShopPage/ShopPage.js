/** @format */

import React, { useState, useContext } from "react";
import ShopPageContent from "./ShopContent";

import { GiReturnArrow, GiLoveLetter } from "react-icons/gi";
import { FiPackage } from "react-icons/fi";
import { MdLocationOn, MdDirectionsBike } from "react-icons/md";
import FilterTab from "./FilterTab";

function ShopPage() {
	return (
		<section className='ShopPage'>
			<div className='Section-Two'>
				<div>
					<div>
						<GiReturnArrow size='30px' color='grey' />
					</div>
					<div>Gwarancja zwrotu do 100 dni</div>
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
				<FilterTab />
				<ShopPageContent />
			</div>
		</section>
	);
}

export default ShopPage;
