import { Inter } from "next/font/google";
import "bulma/css/bulma.min.css";
import "./styles/globals.scss";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Académie TKD CCS Rawdon",
  description: "Taekwondo School in Rawdon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
