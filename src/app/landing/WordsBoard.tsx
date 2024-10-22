"use client";

import { forum } from "../fonts";
import { PiRobotDuotone, PiSealWarningDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

export default function WordsBoard() {
	function giveRandomRotation() {
		return Math.random() * 15 * (Math.random() > 0.5 ? 1 : -1);
	}

	const words = [
		"Bots",
		"Scalping",
		"Counterfiets",
		"Fraud",
		"Delivery Delays",
		"Shit Resolution",
		"Lack of Buyer Protection",
		"Artificial Scarcity",
	];
	return (
		<div
			className={`relative flex flex-wrap gap-[100px] justify-center items-center py-[100px] px-[50px] w-full bg-no-repeat bg-cover bg-center text-[#17378D] font-bold text-[64px] ${forum.className} text-center z-0 w-full overflow-hidden`}
		>
			{words.map((word) => (
				<motion.div
					initial={{
						opacity: 0,
						y: "100%",
                        rotate: "0deg"
					}}
					whileInView={{
                        opacity: 1,
                        rotate: `${giveRandomRotation()}deg`,
						y: 0,
					}}
					key={word}
					className="origin-center"
				>
					{word}
				</motion.div>
			))}

			<div
				style={{
					backgroundImage: "url('/images/body-gradient.png')",
					backgroundSize: "cover",
					filter: "saturate(0%) brightness(500%)",
				}}
				className="absolute inset-0 z-[-1]"
			></div>

			<div className="absolute text-[150px] top-0 left-0 origin-center rotate-[-30deg] opacity-[0.33] m-[30px]">
				<PiRobotDuotone />
			</div>

			<div className="absolute text-[150px] bottom-0 right-0 origin-center rotate-[15deg] opacity-[0.33] m-[30px]">
				<PiSealWarningDuotone />
			</div>
		</div>
	);
}
