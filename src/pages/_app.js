import "@/styles/globals.css";
import Footer from "../../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <main>
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
