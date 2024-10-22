"use client";

import { motion } from "framer-motion";
import { dmSans, forum } from "../fonts";
import Button from "../../components/Button";
import { Icon } from "@iconify-icon/react";

export default function Newsletter() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};
	return (
		<div
			style={{
				backgroundImage: "url('/images/body-gradient.png')",
				backgroundSize: "cover",
			}}
			className={`relative flex gap-[100px] justify-center items-center py-[100px] px-[50px] w-full bg-no-repeat bg-cover bg-center text-[#17378D] font-bold text-[48px] ${forum.className} z-0 w-full overflow-hidden`}
		>
			<div className="flex flex-col gap-[48px] w-[70%]">
				<motion.p
					className={`text-white font-normal mb-2 font-forum tracking-[-2%] leading-[100%] ${forum.className}`}
					variants={itemVariants}
				>
					Your whole experience of attending an event is supposed to
					be fun.
				</motion.p>
				<motion.p
					className={`text-[#FFFEA8] font-normal mb-2 font-forum tracking-[-2%] leading-[100%] ${forum.className}`}
					variants={itemVariants}
				>
					It is supposed to be Simplr.
				</motion.p>
				<motion.p
					className={`text-white font-normal mb-2 font-forum tracking-[-2%] leading-[100%] ${forum.className}`}
					variants={itemVariants}
				>
					We have{" "}
					<motion.span
						initial={{ opacity: 1 }}
						whileInView={{ opacity: 0.33 }}
						transition={{ delay: 1, duration: 1 }}
						className="relative"
					>
						a
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: "100%" }}
							transition={{ delay: 1, duration: 1 }}
							className="h-[2px] w-full absolute top-[0.65em] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
						></motion.div>
					</motion.span>{" "}
					<motion.span className="relative">
						the
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: "100%" }}
							transition={{ delay: 1, duration: 1 }}
							className="h-[2px] w-full absolute top-[1em] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
						></motion.div>
					</motion.span>{" "}
					solution.
				</motion.p>
				<motion.div
					className="md:bg-white rounded-[16px] w-full md:w-[540px]"
					variants={itemVariants}
				>
					<div className="flex md:flex-row flex-col md:items-center md:justify-between md:w-[540px] md:py-1 md:pl-6 md:pr-1 md:gap-x-2 gap-y-2">
						<input
							type="email"
							placeholder="Enter your email for early access..."
							className={`flex-1 rounded-[16px] text-gray-700 md:pr-4 w-full text-[16px] ${dmSans.className} outline-none`}
						/>
						<Button>
							<Icon icon="mdi:ticket" width={32} height={32} />
							Join Waitlist
						</Button>
					</div>
				</motion.div>
				<motion.div
					className={`text-white text-[16px] mb-8 font-sans ${dmSans.className}`}
					variants={itemVariants}
				>
					Oh, btw there are perks and benefits for getting in early.
					<br />
					Just that you’ll find out once you join the waitlist. In an
					email. 😛
				</motion.div>

				<motion.div
					className={`flex justify-center items-center gap-[10px] w-fit text-white text-[16px] mb-8 font-sans ${dmSans.className} italic`}
					variants={itemVariants}
				>
					<img
						src="/images/gold-ticket.png"
						alt="Golden ticket"
						className="w-[48px] h-[48px] inline-block rounded-full"
					/>
					“I need to boost the numbers, let them sign up first. ”{" "}
					<br />- Ani, money and metrics guy on the team.
				</motion.div>
			</div>
			<img
				src="/images/gold-ticket.png"
				alt="Golden ticket"
				className="w-[40%] max-w-[650px] origin-center rotate-[-70deg]"
			/>
		</div>
	);
}
