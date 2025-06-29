import { useEffect, useState } from "react";
import "./App.css";
import getPosts from "./transforms/posts";
import styles from "./styles.module.scss";
import type { MinimalPosts } from "./models/minimalPost";

function App() {
  const [posts, setPosts] = useState<MinimalPosts>([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <h2>{post.title}</h2>
          {post.image && <img src={post.image} alt={post.title} />}
        </div>
      ))}
    </div>
  );
}

export default App;
