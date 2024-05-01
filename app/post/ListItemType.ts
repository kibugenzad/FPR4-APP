export interface Post {
  _id: string;
  name: string;
  photo?: string | { uri: string };
  icon?: string;
  iconBackground?: string;
  nameColor?: string;
  file?: string[];
  content?: string;
  type?: string;
  route?: string;
  owner?: {
    firstName: string;
    lastName: string;
  };
  liked?: boolean;
  comments: number;
  likes: number;
}
