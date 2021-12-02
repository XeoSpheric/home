import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { UserContextProvider } from "utils/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-lightBlack h-screen">
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </div>
  );
}

export default MyApp;
