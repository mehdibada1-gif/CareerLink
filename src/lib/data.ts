import type { Mentor, Project, Credential, Message, ImagePlaceholder } from './types';
import imageData from './placeholder-images.json';

export const placeholderImages: ImagePlaceholder[] = imageData.placeholderImages;

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Jane Doe',
    title: 'Senior Software Engineer at Google',
    industry: 'Technology',
    skills: ['React', 'TypeScript', 'Node.js', 'System Design'],
    bio: '10+ years of experience in building scalable web applications. Passionate about mentoring junior developers and helping them grow their careers.',
    image: placeholderImages.find(p => p.id === 'mentor-1')?.imageUrl ?? 'https://picsum.photos/seed/m1/200/200',
    imageHint: 'woman portrait',
  },
  {
    id: '2',
    name: 'John Smith',
    title: 'Product Manager at Microsoft',
    industry: 'Product Management',
    skills: ['Agile', 'Roadmapping', 'User Research', 'Data Analysis'],
    bio: 'I help aspiring product managers break into the industry by teaching them the core principles of product development and strategy.',
    image: placeholderImages.find(p => p.id === 'mentor-2')?.imageUrl ?? 'https://picsum.photos/seed/m2/200/200',
    imageHint: 'man portrait',
  },
  {
    id: '3',
    name: 'Emily White',
    title: 'UX Design Lead at Airbnb',
    industry: 'Design',
    skills: ['UI/UX', 'Figma', 'Prototyping', 'Design Systems'],
    bio: 'Specializing in user-centered design, I guide designers in creating intuitive and beautiful digital experiences.',
    image: placeholderImages.find(p => p.id === 'mentor-3')?.imageUrl ?? 'https://picsum.photos/seed/m3/200/200',
    imageHint: 'woman smiling',
  },
  {
    id: '4',
    name: 'Michael Brown',
    title: 'Data Scientist at Netflix',
    industry: 'Data Science',
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    bio: 'From data pipelines to predictive models, I can help you navigate the world of data science and machine learning.',
    image: placeholderImages.find(p => p.id === 'mentor-4')?.imageUrl ?? 'https://picsum.photos/seed/m4/200/200',
    imageHint: 'man professional',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard UI',
    description: 'Build a responsive and interactive dashboard for an e-commerce platform using React and a UI component library.',
    skills: ['React', 'UI/UX', 'Data Visualization'],
    taskDescription: 'Your task is to build a responsive sales dashboard. The dashboard should display total revenue, number of orders, and a chart showing sales over the last 7 days. You must also include a list of recent orders with customer names and order statuses. Write the main React component for this dashboard.',
    image: placeholderImages.find(p => p.id === 'project-1')?.imageUrl ?? 'https://picsum.photos/seed/p1/600/400',
    imageHint: 'dashboard chart',
  },
  {
    id: '2',
    title: 'API for a Blog Platform',
    description: 'Design and implement a RESTful API for a simple blog platform with functionalities for creating, reading, updating, and deleting posts.',
    skills: ['Node.js', 'Express', 'API Design', 'Databases'],
    taskDescription: 'You need to create a RESTful API for a blog. The API should have endpoints for: GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, and DELETE /posts/:id. Your submission should be the main Express.js server file that defines these routes and their handlers. Assume you have a functions to interact with a database.',
    image: placeholderImages.find(p => p.id === 'project-2')?.imageUrl ?? 'https://picsum.photos/seed/p2/600/400',
    imageHint: 'code api',
  },
  {
    id: '3',
    title: 'A/B Test Analysis',
    description: 'Analyze the results of a fictional A/B test for a new website feature and provide a recommendation.',
    skills: ['Data Analysis', 'Statistics', 'Python'],
    taskDescription: 'You are given a dataset from an A/B test for a new "Add to Cart" button color. The dataset contains user IDs, group (control/treatment), and whether the user converted (clicked the button). Analyze the data to determine if the new color is significantly better. Explain your methodology and provide a recommendation.',
    image: placeholderImages.find(p => p.id === 'project-3')?.imageUrl ?? 'https://picsum.photos/seed/p3/600/400',
    imageHint: 'analytics graph',
  },
];

export const credentials: Credential[] = [
  {
    id: '1',
    title: 'React Development',
    issuer: 'Careerlink',
    date: '2023-10-15',
    skill: 'React',
    image: placeholderImages.find(p => p.id === 'credential-1')?.imageUrl ?? 'https://picsum.photos/seed/c1/600/400',
    imageHint: 'certificate document',
  },
  {
    id: '2',
    title: 'API Design Principles',
    issuer: 'Careerlink',
    date: '2023-11-01',
    skill: 'API Design',
    image: placeholderImages.find(p => p.id === 'credential-2')?.imageUrl ?? 'https://picsum.photos/seed/c2/600/400',
    imageHint: 'code screen',
  },
];

export const messages: Message[] = [
    { id: 1, text: "Hi! I'm really interested in learning more about system design. Where would be a good place to start?", sender: 'user', timestamp: '10:00 AM' },
    { id: 2, text: "Hello! Great question. I'd recommend starting with 'Designing Data-Intensive Applications' by Martin Kleppmann. It's a fantastic book.", sender: 'mentor', timestamp: '10:01 AM' },
    { id: 3, text: "Awesome, I'll check it out. Are there any online resources or courses you'd suggest as well?", sender: 'user', timestamp: '10:02 AM' },
    { id: 4, text: "Definitely. The 'Grokking the System Design Interview' course on Educative is a very popular and effective resource for practical examples.", sender: 'mentor', timestamp: '10:03 AM' },
];

export const getMentorById = (id: string) => mentors.find(m => m.id === id);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
