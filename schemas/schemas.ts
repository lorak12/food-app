import { z } from "zod";

// Enums
const Role = z.enum(["admin", "user"]);
const OrderStatus = z.enum(["pending", "delivered", "cancelled"]);
const Category = z.enum(["pizza", "fastFood", "other"]);

// User Schema
const User = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageUrl: z.string().url().optional(),
  clerkUserId: z.string(),
  role: Role,
});

// Address Schema
const Address = z.object({
  userId: z.string().uuid(),
  buildingNumber: z.number(),
  street: z.string(),
  city: z.string(),
});

// OrderItem Schema
const OrderItem = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int(),
  price: z.number(),
  orderId: z.string().uuid(),
});

// Order Schema
const Order = z.object({
  userId: z.string().uuid(),
  totalPrice: z.number(),
  items: z.array(OrderItem),
  status: OrderStatus,
  addressId: z.string().uuid(),
  user: User.optional(),
  address: Address.optional(),
});

// Review Schema
const Review = z.object({
  title: z.string(),
  content: z.string(),
  rating: z.number().int(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

// Image Schema
const Image = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
});

// OptionItem Schema
const OptionItem = z.object({
  id: z.string().uuid(),
  value: z.string(),
  label: z.string(),
  optionId: z.string().uuid(),
});

// Option Schema
const Option = z.object({
  id: z.string().uuid(),
  name: z.string(),
  options: z.array(OptionItem),
});

// Tag Schema
const Tag = z.object({
  id: z.string().uuid(),
  name: z.string(),
  textColor: z.string(),
  bgColor: z.string(),
  productId: z.string().uuid().optional(),
});

// Product Schema
const Product = z.object({
  name: z.string(),
  toppings: z.string(),
  price: z.number(),
  isAvailable: z.boolean(),
  options: z.array(Option),
  tags: z.array(Tag),
  image: Image,
  category: Category,
});

// News Schema
const News = z.object({
  title: z.string(),
  content: z.string(),
  image: Image,
  userId: z.string().uuid(),
});

// Export all schemas
export const schemas = {
  User,
  Address,
  OrderItem,
  Order,
  Review,
  Image,
  OptionItem,
  Option,
  Tag,
  Product,
  News,
  Role,
  OrderStatus,
  Category,
};
