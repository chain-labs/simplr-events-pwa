import { Metadata } from "next";
import Hero from "./landing/Hero";
import Quote from "./landing/Quote";
import WordsBoard from "./landing/WordsBoard";
import Newsletter from "./landing/Newsletter";

export const metadata: Metadata = {
	title: "Simplr Events - Coldplay",
};

export default function Home() {
	return (
		<>
			<Hero />
			<Quote />
			<WordsBoard />
			<Newsletter />
		</>
	);
}
