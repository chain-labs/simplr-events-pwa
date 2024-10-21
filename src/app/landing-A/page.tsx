import { Metadata } from "next";
import LandingAComponent from "./component";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Simplr Events - Coldplay",
};

const dmSans = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <body
      className={`${dmSans.className} bg-cover`}
      style={{ backgroundImage: "url('/images/body-gradient.png')" }}
    >
      <LandingAComponent />
    </body>
  );
}
