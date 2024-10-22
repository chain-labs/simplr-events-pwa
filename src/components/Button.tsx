import { ButtonHTMLAttributes } from "react";
import { dmSans } from "../app/fonts";

export default function Button({
	children,
	props,
}: {
	children: React.ReactNode;
	props?: ButtonHTMLAttributes<HTMLButtonElement>;
}) {
	return (
		<button
			className={`h-full bg-gradient-to-r from-[#EEFFBC] to-[#FFFC45] p-[6px] text-text-blue text-lg font-bold rounded-full flex items-center shadow-inner-custom w-full md:w-auto ${dmSans.className}`}
			{...props}
		>
			<div className={`justify-center py-[10px] px-[18px] bg-gradient-to-r from-[#DEFF3B] to-[#EEFFBC] rounded-full flex items-center gap-x-2 w-full md:w-auto ${dmSans.className}`}>
				{children}
			</div>
		</button>
	);
}
