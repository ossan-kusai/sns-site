import { Post } from "../types";
import {
  mockCommentTemplates,
  mockUserNames,
  getInitials,
  generateAvatar,
} from "../data/mockData";

export const generateRandomComment = (post: Post): string => {
  const randomIndex = Math.floor(Math.random() * mockCommentTemplates.length);
  return mockCommentTemplates[randomIndex];
};

export const generateRandomUser = (): { name: string; avatar: string; initials: string } => {
  const name = mockUserNames[Math.floor(Math.random() * mockUserNames.length)];
  return {
    name,
    avatar: generateAvatar(name),
    initials: getInitials(name),
  };
};

export const calculateTrendingScore = (post: Post, ageInMinutes: number): number => {
  // Score based on engagement and decay over time
  const engagementScore = post.likes + post.commentCount * 2 + post.retweetCount * 1.5;
  const decayFactor = Math.max(0, 1 - ageInMinutes / 1440); // Decay over 24 hours
  return engagementScore * (1 + decayFactor);
};

export const getRandomEngagementIncrease = (): {
  likes: number;
  comments: number;
  retweets: number;
} => {
  return {
    likes: Math.floor(Math.random() * 50) + 5,
    comments: Math.floor(Math.random() * 10) + 1,
    retweets: Math.floor(Math.random() * 20) + 2,
  };
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "今";
  if (diffMins < 60) return `${diffMins}分`;
  if (diffHours < 24) return `${diffHours}時間`;
  if (diffDays < 7) return `${diffDays}日`;

  return date.toLocaleDateString("ja-JP");
};
