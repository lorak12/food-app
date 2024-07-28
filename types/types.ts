export interface FullProduct {
  id: string;
  name: string;
  toppings: string;
  price: number;
  category: "pizza" | "fastFood" | "other";
  sizes: {
    id: string;
    name: string;
    value: string;
  }[];
  tags: {
    id: string;
    name: string;
    textColor: string;
    bgColor: string;
  }[];
  images: {
    id: string;
    url: string;
    isPrimary: boolean;
    productId: string;
  }[];
  reviews: {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
      clerkUserId: string;
      role: "admin" | "user";
    };
  }[];
}
