export default function Header() {
	return (
		<header className="flex justify-between items-center font-switzer font-bold tracking-[0.02em]">
			<div>
				<img src="/images/logo.svg" alt="Simplr Events Logo" />
			</div>
			<nav className="flex items-center gap-[10px] text-brandWhite">
				<a href="/#" className="px-[16px] py-[8px]">
					link your ticket
				</a>
				<a href="/#" className="px-[16px] py-[8px]">
					buy
				</a>
				<a href="/#" className="px-[16px] py-[8px]">
					sell
				</a>
			</nav>
			<div className="flex justify-center items-center gap-[10px]">
				<button className="rounded-full px-[16px] py-[8px]">
					contact us
				</button>
				<button className="rounded-full px-[16px] py-[8px]">
					sign in
				</button>
			</div>
		</header>
	);
}
