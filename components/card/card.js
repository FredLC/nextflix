import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";
import Link from "next/link";

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  size = "medium",
  id,
  videoId,
  shouldScale = true,
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    );
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  const shouldHover = shouldScale && { whileHover: { ...scale } };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
      >
        <Link href={`/video/${videoId}`}>
          <Image
            onError={handleOnError}
            src={imgSrc}
            alt="netflix show"
            layout="fill"
            className={styles.cardImg}
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default Card;
