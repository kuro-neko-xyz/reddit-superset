import { useEffect, useState } from "react";
import "./App.css";
import type { MinimalPost } from "./models/minimalPost";
import fetchPosts from "./utils/fetchPosts";
import Container from "./components/Container";

function App() {
  const [currentPost, setCurrentPost] = useState<MinimalPost | null>(null);
  const [nextPost, setNextPost] = useState<MinimalPost | null>(null);
  const [initialY, setInitialY] = useState<number>(0);
  const [timeout, setTimeoutState] = useState<number | null>(null);

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
      timeout: null,
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
          timeout: null,
        });
      }
    }
  };

  const handleWheel = async (event: React.WheelEvent) => {
    if (event.deltaY > 0 && nextPost) {
      // Scroll down
      const currentPostId = currentPost?.id;
      setCurrentPost(nextPost);
      setNextPost(null);

      const after = `t3_${currentPostId}`;

      setTimeoutState(
        await fetchPosts({
          setCurrentPost,
          setNextPost,
          after,
          timeout,
        })
      );
    }
  };

  return (
    <Container
      currentPost={currentPost}
      nextPost={nextPost}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
      handleWheel={handleWheel}
    />
  );
}

export default App;
