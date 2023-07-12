import "src/styles/globals.css";
import { trackingProvider } from "../../context/TrackingContext";
import { Navbar, Footer } from "../../components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <trackingProvider>
        <Navbar />
        <Component {...pageProps} />
      </trackingProvider>
      <Footer />
    </>
  );
}
