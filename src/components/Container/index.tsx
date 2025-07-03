import type { FC } from "react";
import styles from "./styles.module.scss";
import type { MinimalPost } from "../../models/minimalPost";

interface ContainerProps {
  currentPost: MinimalPost | null;
  nextPost: MinimalPost | null;
  handleTouchStart: (event: React.TouchEvent) => void;
  handleTouchMove: (event: React.TouchEvent) => void;
  handleWheel: (event: React.WheelEvent) => void;
}

const Container: FC<ContainerProps> = ({
  currentPost,
  nextPost,
  handleTouchStart,
  handleTouchMove,
  handleWheel,
}) => {
  if (!currentPost || !nextPost) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onWheel={handleWheel}
    >
      <div key={currentPost.id} className={styles.post}>
        {currentPost.image && (
          <img src={currentPost.image} alt={currentPost.title} />
        )}
        <h2>{currentPost.title}</h2>
      </div>
      <div key={nextPost.id} className={styles.post}>
        {nextPost.image && <img src={nextPost.image} alt={nextPost.title} />}
        <h2>{nextPost.title}</h2>
      </div>
    </div>
  );
};

export default Container;
