import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;
  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default Video;
