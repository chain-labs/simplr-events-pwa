import { dmSans, forum } from "./fonts";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
	title: "Simplr Events - Coldplay",
};



export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={`${forum.variable} ${dmSans.variable}`}>
      <head>
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
					rel="stylesheet"
				/>
			</head>
			<body
				className={`${dmSans.className} bg-cover`}
			>
				{children}
			</body>
		</html>
	);
}
