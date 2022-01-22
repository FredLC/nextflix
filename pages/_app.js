import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handleRouteComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router]);
  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
