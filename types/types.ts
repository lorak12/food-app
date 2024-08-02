import { Prisma } from "@prisma/client";

export interface FullProduct {
  id: string;
  name: string;
  toppings: string;
  price: number;
  category: "pizza" | "fastFood" | "other";
  options: {
    id: string;
    name: string;
    options: {
      id: string;
      value: string;
      label: string;
    }[];
  }[];
  tags: {
    id: string;
    name: string;
    textColor: string;
    bgColor: string;
  }[];
  image: {
    id: string;
    url: string;
  };
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

const productWithChildren = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    options: {
      include: {
        options: true,
      },
    },
    tags: true,
    image: true,
    reviews: {
      include: {
        user: true,
      },
    },
  },
});
export type ProductWithChildren = Prisma.ProductGetPayload<
  typeof productWithChildren
>;

const optionWithChildren = Prisma.validator<Prisma.OptionDefaultArgs>()({
  include: {
    options: true,
  },
});

export type OptionWithChildren = Prisma.OptionGetPayload<
  typeof optionWithChildren
>;

const orderItemWithChildren = Prisma.validator<Prisma.OrderItemDefaultArgs>()({
  include: {
    pickedOptions: true,
    product: {
      include: {
        options: true,
      },
    },
    order: true,
  },
});

export type OrderItemWithChildren = Prisma.OrderItemGetPayload<
  typeof orderItemWithChildren
>;
