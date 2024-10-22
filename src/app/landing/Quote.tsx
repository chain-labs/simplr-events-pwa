import { forum } from "../fonts";

export default function Quote() {
	return (
		<div
			style={{
				backgroundImage: "url('/images/body-gradient.png')",
				backgroundSize: "cover",
                filter: "saturate(0%) brightness(120%)",
			}}
			className={`py-10 w-full bg-no-repeat bg-cover bg-center text-white font-bold text-[48px] ${forum.className} text-center`}
		>
			The secondary ticket marketplace is {" "} <u>broken</u>.
		</div>
	);
}
