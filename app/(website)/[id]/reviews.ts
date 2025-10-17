type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
};

export const dummyReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love this product! The quality is outstanding and it arrived faster than expected.",
    date: "2024-01-15",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    comment:
      "Great value for money. Works exactly as described. Would definitely recommend to others.",
    date: "2024-01-10",
    avatar: "/thoughtful-man.png",
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    comment:
      "Perfect! This exceeded my expectations. The design is beautiful and very functional.",
    date: "2024-01-08",
    avatar: "/woman-2.jpg",
  },
];
