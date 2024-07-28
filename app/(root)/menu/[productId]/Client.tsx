"use client";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/priceFormatter";

import { FullProduct } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Client({ product }: { product: FullProduct }) {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 gap-10">
        <Card className="relative aspect-square">
          <Image
            className="rounded-lg object-cover"
            src={
              product.images.find((image) => image.isPrimary)?.url ??
              "/pizza.png"
            }
            alt={product.name}
            fill
          />
        </Card>
        <div className="col-span-2 flex flex-col gap-10">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {product.name}{" "}
                <Badge>
                  {product.category.charAt(0).toLocaleUpperCase() +
                    product.category.slice(1)}
                </Badge>{" "}
                {product.tags.map((tag) => (
                  <Badge
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
                    Cena: {formatPrice(product.price)}
                  </span>
                </span>
              </CardDescription>
              <CardContent className="p-0 m-0 gap-4 flex flex-col">
                Składniki: {product.toppings}
                <Tabs defaultValue="0">
                  <TabsList>
                    {product.sizes.map((size, index: number) => (
                      <TabsTrigger value={String(index)}>
                        {size.name} ({size.value})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <Button className="w-fit">
                  Dodaj do koszyka <ShoppingCart className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Opinie na temat produktu</CardTitle>
            </CardHeader>
            <CardContent>
              {product.reviews.map((review) => (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {review.user.firstName
                        ? review.user.firstName + " " + review.user.lastName
                        : "Brak danych"}{" "}
                      <div className="flex">
                        {Array.from({ length: review.rating }).map(() => (
                          <Star
                            className="w-5 h-5"
                            fill="#ffdd00"
                            stroke="#ffdd00"
                          />
                        ))}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      {format(review.createdAt, "dd MMMM yyyy", { locale: pl })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{review.comment}</CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Client;
