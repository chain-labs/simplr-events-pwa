import { DM_Sans, Forum } from "next/font/google";

export const forum = Forum({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
	variable: "--forum",
});

export const dmSans = DM_Sans({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--dm-sans",
});