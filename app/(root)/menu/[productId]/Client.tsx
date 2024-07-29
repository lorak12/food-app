"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/priceFormatter";
import { ProductWithChildren } from "@/types/types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { schemas } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

interface OptionItem {
  id: string;
  value: string;
  label: string;
  price: number;
  optionId: string;
}

function Client({ product }: { product: ProductWithChildren }) {
  const form = useForm<z.infer<typeof schemas.OrderItem>>({
    resolver: zodResolver(schemas.OrderItem),
    defaultValues: {
      quantity: 1,
      price: product.basePrice,
      pickedOptions: [
        ...product.options.map((option) => ({
          id: option.options[0].id,
          value: option.options[0].value,
          label: option.options[0].label,
          price: option.options[0].price,
          optionId: option.id,
        })),
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pickedOptions",
  });

  async function onSubmit(data: z.infer<typeof schemas.OrderItem>) {
    console.log(data);
  }

  const handleOptionChange = (optionId: string, optionItem: OptionItem) => {
    const pickedOptions = form.getValues("pickedOptions");
    const optionIndex = pickedOptions.findIndex(
      (opt) => opt.optionId === optionId
    );

    if (optionIndex > -1) {
      pickedOptions[optionIndex] = optionItem;
    } else {
      append(optionItem);
    }

    form.setValue("pickedOptions", pickedOptions);
  };

  function getTotalPrice(): number {
    const pickedOptions = form.getValues("pickedOptions");
    const optionsPrice = pickedOptions.reduce(
      (total, option) => total + option.price,
      0
    );
    return optionsPrice + product.basePrice;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-screen flex gap-6 flex-col">
          <div className="grid grid-cols-3 gap-10">
            <Card className="relative aspect-square">
              <Image
                className="rounded-lg object-cover"
                src={product.image.url}
                alt={product.name}
                fill
              />
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {product.name}
                  <Badge>
                    {product.category.charAt(0).toLocaleUpperCase() +
                      product.category.slice(1)}
                  </Badge>
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      style={{
                        backgroundColor: tag.bgColor,
                        color: tag.textColor,
                      }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </CardTitle>
                <CardDescription>
                  <span className="flex justify-between w-full">
                    <span className="font-semibold text-lg text-foreground">
                      Cena: {formatPrice(product.basePrice)}
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 flex flex-col">
                Składniki: {product.toppings}
                <FormField
                  name="quantity"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ilość</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-1 w-fit">
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => {
                              form.setValue(
                                "quantity",
                                Math.max(1, form.getValues("quantity") - 1)
                              );
                            }}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            placeholder="Ilość"
                            {...field}
                            className="w-12"
                          />
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() =>
                              form.setValue(
                                "quantity",
                                form.getValues("quantity") + 1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="pickedOptions"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      {product.options.map((option) => (
                        <div key={option.id} className="flex flex-col">
                          <FormLabel>{option.name}</FormLabel>
                          <FormControl>
                            <Tabs
                              defaultValue={option.options[0]?.value}
                              onValueChange={(value) => {
                                const selectedOption = option.options.find(
                                  (opt) => opt.value === value
                                );
                                if (selectedOption) {
                                  handleOptionChange(option.id, {
                                    id: selectedOption.id,
                                    value,
                                    label: selectedOption.label,
                                    price: selectedOption.price,
                                    optionId: option.id,
                                  });
                                }
                              }}
                            >
                              <TabsList>
                                {option.options.map((opt) => (
                                  <TabsTrigger key={opt.id} value={opt.value}>
                                    {opt.label}
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                            </Tabs>
                          </FormControl>
                        </div>
                      ))}
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <CardTitle>Podsumowanie</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={2} className="w-[150px]">
                        {product.name}
                      </TableCell>
                      <TableCell>{formatPrice(product.basePrice)}</TableCell>
                    </TableRow>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell colSpan={2} className="w-[150px]">
                          {field.label}
                        </TableCell>
                        <TableCell>+{formatPrice(field.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Razem</TableCell>
                      <TableCell className="flex flex-col">
                        <span>
                          {formatPrice(getTotalPrice())}
                          {form.getValues("quantity") > 1
                            ? ` x${form.getValues("quantity")}`
                            : null}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          + {formatPrice(getTotalPrice() * 0.23)} (23% VAT)
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
              <CardFooter className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                <Button className="w-fit" type="submit">
                  Dodaj do koszyka <ShoppingCart className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Opinie na temat produktu</CardTitle>
            </CardHeader>
            <CardContent>
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {review.user.firstName || review.user.email}
                      <span className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, index) => (
                          <Star
                            key={index}
                            className="w-4 h-4 fill-yellow-400"
                          />
                        ))}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>
                        {format(new Date(review.createdAt), "DD mm YYYY", {
                          locale: pl,
                        })}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{review.content}</CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}

export default Client;
