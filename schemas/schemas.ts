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
  buildingNumber: z.coerce.number(),
  street: z.string(),
  city: z.string(),
});

// OrderItem Schema
const OrderItem = z.object({
  productId: z.string().uuid(),
  quantity: z.coerce.number().int(),
  price: z.coerce.number(),
  orderId: z.string().uuid(),
});

// Order Schema
const Order = z.object({
  userId: z.string().uuid(),
  totalPrice: z.coerce.number(),
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
  rating: z.coerce.number().int(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

// Image Schema
const Image = z.object({
  id: z.string().uuid().optional(),
  url: z.string(),
});

// OptionItem Schema
const OptionItem = z.object({
  id: z.string().uuid(),
  value: z.string(),
  label: z.string(),
  price: z.coerce.number(),
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
});

// Product Schema
const Product = z.object({
  name: z.string(),
  toppings: z.string(),
  basePrice: z.coerce.number(),
  isAvailable: z.boolean().optional(),
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

const FormTagSchema = z.object({
  name: z.string().min(1, "Nazwa tagu jest wymagana"),
  textColor: z.string().optional(),
  bgColor: z.string().optional(),
});

const FormOptionSchema = z.object({
  name: z.string().min(1, "Nazwa opcji jest wymagana"),
  options: z.array(
    z.object({
      value: z.string().min(1, "Wartość opcji jest wymagana"),
      label: z.string().min(1, "Etykieta opcji jest wymagana"),
      price: z.number().min(0, "Cena musi być nieujemna"),
    })
  ),
});

const FormProductSchema = z.object({
  name: z.string(),
  toppings: z.string(),
  basePrice: z.coerce.number(),
  isAvailable: z.boolean().optional(),
  options: z.array(Option),
  tags: z.array(Tag),
  category: Category,
  image: Image,
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
  FormOptionSchema,
  FormTagSchema,
  FormProductSchema,
};
