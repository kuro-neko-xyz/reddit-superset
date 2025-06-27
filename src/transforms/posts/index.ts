const getPosts = async () => {
  const response = await fetch("https://www.reddit.com/.json");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
};

export default getPosts;
