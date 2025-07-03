import type { MinimalPost } from "../../models/minimalPost";
import getPosts from "../../transforms/posts";

interface fetchPostsProps {
  setCurrentPost: (post: MinimalPost | null) => void;
  setNextPost: (post: MinimalPost | null) => void;
  after: string;
}

const fetchPosts = async (props: fetchPostsProps) => {
  const { setCurrentPost, setNextPost, after } = props;

  getPosts(after)
    .then((data) => {
      setCurrentPost(data[0] || null);
      setNextPost(data[1] || null);

      localStorage.setItem("after", `t3_${data[0].id}`);
      localStorage.setItem("lastFetchDate", new Date().toDateString());
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
};

export default fetchPosts;
