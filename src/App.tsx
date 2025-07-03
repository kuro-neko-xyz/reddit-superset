import { useEffect, useState } from "react";
import "./App.css";
import type { MinimalPost } from "./models/minimalPost";
import fetchPosts from "./utils/fetchPosts";
import Container from "./components/Container";

function App() {
  const [currentPost, setCurrentPost] = useState<MinimalPost | null>(null);
  const [nextPost, setNextPost] = useState<MinimalPost | null>(null);
  const [initialY, setInitialY] = useState<number>(0);

  useEffect(() => {
    const currentDate = new Date().toDateString();

    if (localStorage.getItem("lastFetchDate") !== currentDate) {
      localStorage.removeItem("after");
    }

    const after = localStorage.getItem("after") || "";

    fetchPosts({
      setCurrentPost,
      setNextPost,
      after: after,
    });
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    setInitialY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - initialY;

    if (Math.abs(deltaY) > 50 && currentPost) {
      if (deltaY < 0) {
        // Swipe up
        const currentPostId = currentPost.id;
        setCurrentPost(nextPost);
        setNextPost(null);

        const after = `t3_${currentPostId}`;

        fetchPosts({
          setCurrentPost,
          setNextPost,
          after: after,
        });
      }
    }
  };

  return (
    <Container
      currentPost={currentPost}
      nextPost={nextPost}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
    />
  );
}

export default App;
