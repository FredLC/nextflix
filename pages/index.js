import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const surfingVideos = await getVideos("surfing");
  const sportsVideos = await getVideos("sports");
  const popularVideos = await getPopularVideos();
  const cookingVideos = await getVideos("cooking");

  return {
    props: {
      surfingVideos,
      sportsVideos,
      popularVideos,
      cookingVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home({
  surfingVideos,
  sportsVideos,
  popularVideos,
  cookingVideos,
  watchItAgainVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username="joe@joe.com" />
        <Banner
          videoId="T_WSXXPQYeY"
          title="Back to the future"
          subtitle="A classic from the 80's"
          imgUrl="/static/back_to_the_future.jpg"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Surfing" videos={surfingVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Sports" videos={sportsVideos} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
          <SectionCards title="Cooking" videos={cookingVideos} size="medium" />
        </div>
      </div>
    </div>
  );
}
