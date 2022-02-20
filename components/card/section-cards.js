import Card from "./card";
import styles from "./section-cards.module.css";
import cls from "classnames";

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Card
              id={idx}
              imgUrl={video.imgUrl}
              size={size}
              videoId={video.id}
              shouldScale={shouldScale}
              key={idx}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
