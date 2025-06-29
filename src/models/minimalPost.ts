export interface MinimalPost {
  id: string;
  title: string;
  image: string | null;
  url: string;
}

export type MinimalPosts = MinimalPost[];
