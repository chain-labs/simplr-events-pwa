import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Simplr Events - Coldplay",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en">{children}</html>;
}
