import type { MinimalPost, MinimalPosts } from "../../models/minimalPost";

const getPosts = async (after = ""): Promise<MinimalPosts> => {
  const response = await fetch(
    `https://www.reddit.com/.json?limit=2${after ? `&after=${after}` : ""}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  return json.data.children.map((post: { data: MinimalPost }) => ({
    id: post.data.id,
    title: post.data.title,
    image: post.data.url.match(/^.*\.(jpg|jpeg|png|gif)$/i)
      ? post.data.url
      : null,
    url: post.data.url,
  }));
};

export default getPosts;
