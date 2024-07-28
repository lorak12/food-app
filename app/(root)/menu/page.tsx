import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ProductCard from "./ProductCard";
import { FullProduct } from "@/types/types";

export const products: FullProduct[] = [
  {
    id: "1",
    name: "Margherita",
    toppings: "Tomato, Mozzarella, Basil",
    price: 19.99,
    category: "pizza",
    sizes: [
      { id: "size1", name: "Small", value: "25cm" },
      { id: "size2", name: "Medium", value: "30cm" },
      { id: "size3", name: "Large", value: "35cm" },
    ],
    tags: [
      {
        id: "tag1",
        name: "Vegetarian",
        textColor: "#ffffff",
        bgColor: "#4caf50",
      },
    ],
    images: [
      { id: "img1", url: "/pizza.png", isPrimary: true, productId: "1" },
    ],
    reviews: [
      {
        id: "rev1",
        userId: "user1",
        rating: 5,
        comment: "Best pizza ever!",
        createdAt: "2024-01-01T12:00:00Z",
        user: {
          id: "user1",
          email: "user1@example.com",
          firstName: "John",
          lastName: "Doe",
          imageUrl: "/pizza.png",
          clerkUserId: "clerk1",
          role: "user",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Pepperoni",
    toppings: "Tomato, Mozzarella, Pepperoni",
    price: 22.99,
    category: "pizza",
    sizes: [
      { id: "size1", name: "Small", value: "25cm" },
      { id: "size2", name: "Medium", value: "30cm" },
      { id: "size3", name: "Large", value: "35cm" },
    ],
    tags: [
      { id: "tag2", name: "Spicy", textColor: "#ffffff", bgColor: "#ff5722" },
    ],
    images: [
      { id: "img2", url: "/pizza.png", isPrimary: true, productId: "2" },
    ],
    reviews: [
      {
        id: "rev2",
        userId: "user2",
        rating: 4,
        comment: "Very tasty, but a bit greasy.",
        createdAt: "2024-02-15T12:00:00Z",
        user: {
          id: "user2",
          email: "user2@example.com",
          firstName: "Jane",
          lastName: "Smith",
          imageUrl: "/pizza.png",
          clerkUserId: "clerk2",
          role: "user",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Four Seasons",
    toppings: "Tomato, Mozzarella, Ham, Artichokes, Mushrooms, Olives",
    price: 25.99,
    category: "pizza",
    sizes: [
      { id: "size1", name: "Small", value: "25cm" },
      { id: "size2", name: "Medium", value: "30cm" },
      { id: "size3", name: "Large", value: "35cm" },
    ],
    tags: [
      { id: "tag3", name: "Meat", textColor: "#ffffff", bgColor: "#ff9800" },
    ],
    images: [
      { id: "img3", url: "/pizza.png", isPrimary: true, productId: "3" },
    ],
    reviews: [
      {
        id: "rev3",
        userId: "user3",
        rating: 5,
        comment: "A great combination of flavors!",
        createdAt: "2024-03-10T12:00:00Z",
        user: {
          id: "user3",
          email: "user3@example.com",
          firstName: "Michael",
          lastName: "Johnson",
          imageUrl: "/pizza.png",
          clerkUserId: "clerk3",
          role: "user",
        },
      },
    ],
  },
  {
    id: "4",
    name: "BBQ Chicken",
    toppings: "BBQ Sauce, Mozzarella, Chicken, Red Onions, Cilantro",
    price: 24.99,
    category: "pizza",
    sizes: [
      { id: "size1", name: "Small", value: "25cm" },
      { id: "size2", name: "Medium", value: "30cm" },
      { id: "size3", name: "Large", value: "35cm" },
    ],
    tags: [
      { id: "tag4", name: "Chicken", textColor: "#ffffff", bgColor: "#8bc34a" },
    ],
    images: [
      { id: "img4", url: "/pizza.png", isPrimary: true, productId: "4" },
    ],
    reviews: [
      {
        id: "rev4",
        userId: "user4",
        rating: 4,
        comment: "Delicious, but the BBQ sauce was too sweet for me.",
        createdAt: "2024-04-05T12:00:00Z",
        user: {
          id: "user4",
          email: "user4@example.com",
          firstName: "Emily",
          lastName: "Davis",
          imageUrl: "/pizza.png",
          clerkUserId: "clerk4",
          role: "user",
        },
      },
    ],
  },
  {
    id: "5",
    name: "Hawaiian",
    toppings: "Tomato, Mozzarella, Ham, Pineapple",
    price: 23.99,
    category: "pizza",
    sizes: [
      { id: "size1", name: "Small", value: "25cm" },
      { id: "size2", name: "Medium", value: "30cm" },
      { id: "size3", name: "Large", value: "35cm" },
    ],
    tags: [
      { id: "tag5", name: "Sweet", textColor: "#ffffff", bgColor: "#ffc107" },
    ],
    images: [
      { id: "img5", url: "/pizza.png", isPrimary: true, productId: "5" },
    ],
    reviews: [
      {
        id: "rev5",
        userId: "user5",
        rating: 3,
        comment: "Good, but I'm not a fan of pineapple on pizza.",
        createdAt: "2024-05-20T12:00:00Z",
        user: {
          id: "user5",
          email: "user5@example.com",
          firstName: "David",
          lastName: "Martinez",
          imageUrl: "/pizza.png",
          clerkUserId: "clerk5",
          role: "user",
        },
      },
    ],
  },
];

function Page() {
  return (
    <Tabs defaultValue="pizzas">
      <TabsList>
        <TabsTrigger value="pizzas">Pizza</TabsTrigger>
        <TabsTrigger value="fast-food">Fast Food</TabsTrigger>
      </TabsList>
      <TabsContent
        value="pizzas"
        className="grid grid-cols-5 gap-6 place-content-center"
      >
        {products.map((product) => (
          <ProductCard data={product} />
        ))}
      </TabsContent>
      <TabsContent value="fast-food">Fast food content</TabsContent>
    </Tabs>
  );
}

export default Page;
