import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roll a Dice - Simple Dice Rolling App",
  description: "A clean, modern dice rolling app with smooth animations and beautiful design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
