// pages/_app.js
import '../styles/globals.css';  // Import global styles, including Tailwind

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
