import { useEffect, useState } from "react";
import "./App.css";
import getPosts from "./transforms/posts";
import styles from "./styles.module.scss";
import type { MinimalPost } from "./models/minimalPost";

function App() {
  const [currentPost, setCurrentPost] = useState<MinimalPost | null>(null);
  const [nextPost, setNextPost] = useState<MinimalPost | null>(null);
  const [initialY, setInitialY] = useState<number>(0);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setCurrentPost(data[0] || null);
        setNextPost(data[1] || null);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    setInitialY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - initialY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY < 0) {
        // Swipe up
        setCurrentPost(nextPost);
        setNextPost(null);
        const after = `t3_${currentPost.id}`;
        getPosts(after)
          .then((data) => {
            if (data.length > 0) {
              setNextPost(data[1]);
            } else {
              throw new Error("No more posts available");
            }
          })
          .catch((error) => {
            console.error("Error fetching next posts:", error);
          });
      }
    }
  };

  if (!currentPost || !nextPost) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
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
}

export default App;
