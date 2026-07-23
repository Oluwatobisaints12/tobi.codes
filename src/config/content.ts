import shoppayImg from '@/app/assets/images/shoppay.jpg';
import pennytotsImg from '@/app/assets/images/pennytots.png';
import willFrontendImg from '@/app/assets/images/willFrontend.png';
import willAdminImg from '@/app/assets/images/willAdmin.png';
import greatAnosikeImg from '@/app/assets/images/great.png';

export interface TextSegment {
  text: string;
  type?: 'blue' | 'orange' | 'purple' | 'green' | 'pink';
  href?: string; // Optional URL for clickable highlighted items
}

export interface Project {
  title: string;
  number: string;
  tags: string[];
  image: string;
  year: string;
  url: string;
}

export interface Hobby {
  name: string;
  emoji: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface PortfolioConfig {
  name: string;
  titleName: {
    first: string;
    tag: string;
  };
  tagline: {
    part1: string;
    scriptWord: string;
    part2: string;
  };
  subtext: string;
  location: string;
  timezone: string;
  email: string;
  bioParagraphs: TextSegment[][];
  hobbies: Hobby[];
  socials: SocialLink[];
  projects: Project[];
}

export const PORTFOLIO_CONTENT: PortfolioConfig = {
  name: "T.Code",
  titleName: {
    first: "T.",
    tag: "‹Code›"
  },
  tagline: {
    part1: "Hi, I'm T.Code, a",
    scriptWord: "creative",
    part2: "developer"
  },
  subtext: "I bring value to web development projects by merging technical expertise with creativity and aesthetics.",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "tobijoshua919@gmail.com",
 bioParagraphs: [
  [
    { text: "I'm T.Code, a " },
    { text: "Full-Stack & Mobile Developer", type: "blue", href: "#work" },
    { text: " with over 3 years of experience crafting high-performance " },
    { text: "digital experiences.", type: "orange" }
  ],
  [
    { text: "I bridge the gap between design and scalable architecture. On the frontend, I specialize in building crisp, responsive interfaces using " },
    { text: "Next.js", type: "orange" },
    { text: " and " },
    { text: "React Native / Expo", type: "purple" },
    { text: " for cross-platform mobile apps." }
  ],
  [
    { text: "Behind the scenes, I engineer robust backend APIs and systems with " },
    { text: "Node.js", type: "green" },
    { text: " and " },
    { text: "Express", type: "pink" },
    { text: ", ensuring every application is secure, fast, and scalable." }
  ],
  [
    { text: "I thrive on " },
    { text: "collaborations", type: "orange" },
    { text: " with high-performing teams, design studios, and ambitious clients to bring complex ideas into intuitive " },
    { text: "web & mobile solutions.", type: "blue" }
  ]
],
  hobbies: [
    { name: "Swimming", emoji: "🏊" },
    { name: "Dog walk", emoji: "🐕" },
    { name: "Cooking", emoji: "🍳" },
    { name: "Outing", emoji: "🚗" }
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/oluwatobi-onifade-37679528a" },
    { name: "Instagram", url: "https://www.instagram.com/oluwatobi_for_christ" },
    { name: "X (Twitter)", url: "https://x.com/oluwatobi665595?s=11" },
    { name: "GitHub", url: "https://github.com/Oluwatobisaints12" }
  ],
  projects: [
    {
      title: "Quikaar",
      number: "02",
      tags: ["html", "javascript", "css"],
      image: shoppayImg.src,
      year: "2025",
      url: "https://quikaar.com/"
    },
    {
      title: "Pennytots",
      number: "04",
      tags: ["html", "javascript", "css"],
      image: pennytotsImg.src,
      year: "2024",
      url: "https://app.pennytots.com/"
    },
    {
      title: "Will it Survive",
      number: "01",
      tags: ["html", "javascript", "css"],
      image: willFrontendImg.src,
      year: "2025",
      url: "https://will-it-survive.pennytots.com"
    },
    {
      title: "Will it Survive Admin",
      number: "01",
      tags: ["html", "javascript", "css"],
      image: willAdminImg.src,
      year: "2025",
      url: "https://will-it-survive-admin.pennytots.com"
    },
    {
      title: "Great Anosike",
      number: "03",
      tags: ["html", "javascript", "css"],
      image: greatAnosikeImg.src,
      year: "2024",
      url: "https://www.greatanosike.com"
    }
  ]
};
