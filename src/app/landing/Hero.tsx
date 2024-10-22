"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import Button from "../../components/Button";
import { dmSans, forum } from "../fonts";

export default function Hero() {
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
			style={{ backgroundImage: "url('/images/body-gradient.png')" }}
			className="flex justify-center items-center py-10 w-full bg-no-repeat bg-cover bg-center"
		>
			<motion.div
				style={
					{
						// backgroundImage: "url('/images/event-gradient.png')",
						// borderRadius: "50%",
						// aspectRatio: "1 / 1",
					}
				}
				className="md:p-10 flex flex-col bg-cover bg-center bg-no-repeat relative w-full max-w-[1200px]"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="flex flex-col  gap-[32px] w-full px-[16px]">
					<motion.div
						className="flex justify-center md:justify-start items-center space-x-2 mb-4"
						variants={itemVariants}
					>
						<img src="/images/logo.png" alt="Simplr Events Logo" />
						<span className="text-red-500 text-[32px]">❤️</span>
						<span
							className={`text-white text-[32px] ${forum.className}`}
						>
							COLDPLAY
						</span>
					</motion.div>
					<div className="flex flex-col md:text-start text-center gap-[8px]">
						<motion.h1
							className={`md:text-[64px] text-[60px] text-white mb-2 font-forum tracking-[-3%] leading-[100%] ${forum.className}`}
							variants={itemVariants}
						>
							Tickets are now{" "}
							<motion.span
								initial={{ opacity: 1 }}
								animate={{ opacity: 0.33 }}
								transition={{ delay: 1, duration: 1 }}
								className="relative"
							>
								sold out
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: "100%" }}
									transition={{ delay: 1, duration: 1 }}
									className="h-[2px] w-full absolute top-[0.65em] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
								></motion.div>
							</motion.span>{" "}
							available!
						</motion.h1>

						<motion.p
							className={`text-[#FFFEA8] md:text-[32px] text-[24px] font-normal mb-2 font-forum tracking-[-2%] leading-[100%] ${forum.className}`}
							variants={itemVariants}
						>
							Be it a concert or conference, there&apos;s always{" "}
							<br />
							someone selling an extra ticket. <br />
							Grabbing that just got soo much Simplr.
						</motion.p>

						<motion.p
							className={`text-white text-[16px] mb-8 font-sans ${dmSans.className}`}
							variants={itemVariants}
						>
							Simplr, the secondary ticket marketplace <br /> for
							verified, transparent & easy purchase of tickets.
						</motion.p>
					</div>

					<motion.div
						className="md:bg-white rounded-[16px] w-full md:w-[540px]"
						variants={itemVariants}
					>
						<div className="flex md:flex-row flex-col md:items-center md:justify-between md:w-[540px] md:py-1 md:pl-6 md:pr-1 md:gap-x-2 gap-y-2">
							<input
								type="email"
								placeholder="Enter your email for early access..."
								className="flex-1 rounded-[16px] text-gray-700 p-4 md:pr-4 w-full outline-none"
							/>
							<Button>
								<Icon
									icon="mdi:ticket"
									width={32}
									height={32}
								/>
								Join Waitlist
							</Button>
						</div>
					</motion.div>
					<motion.div
						variants={itemVariants}
						className="ml-auto h-[300px] w-full max-w-[500px]"
					>
						<img
							src="/images/coldplay-event-card.png"
							alt="Simplr Events Logo"
						/>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
