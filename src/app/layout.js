import { Salsa } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { MenuProvider } from "@/components/menu/MenuContext";

const salsa = Salsa({
  variable: "--font-salsa",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Black Penny — Coffee House & Kitchen",
  description:
    "The Black Penny Coffee House & Kitchen — great coffee, food and live music.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${salsa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <MenuProvider>{children}</MenuProvider>
        </CartProvider>
      </body>
    </html>
  );
}
