export type Mentor = {
  id: string;
  name: string;
  title: string;
  industry: string;
  skills: string[];
  bio: string;
  image: string;
  imageHint: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  taskDescription: string;
  image: string;
  imageHint: string;
};

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skill: string;
  image: string;
  imageHint: string;
};

export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: string;
};

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};
