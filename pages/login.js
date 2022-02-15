import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            console.log({ loggedInResponse });
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong logging you in.");
          }
        }
      } catch (err) {
        console.log("Something went wrong with your magic link: ", err);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;

    setEmail(email);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In to Nextflix</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="email"
            placeholder="Enter your email"
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
