"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductWithChildren } from "@/types/types";
import { formatPrice } from "@/utils/priceFormatter";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductCard({ data }: { data: ProductWithChildren }) {
  return (
    <Card className="max-w-[300px] max-h-[400px] h-[400px] relative group">
      <Link href={`/menu/${data.id}`}>
        <CardContent className="relative w-[calc(100%-10px)] aspect-square items-center flex justify-center">
          <Image
            src={data.image.url}
            alt={data.name}
            fill
            className="object-cover"
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {data.tags.map((tag) => (
                <Badge
                  style={{ backgroundColor: tag.bgColor, color: tag.textColor }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {data.name}
              <Badge>{formatPrice(data.basePrice)}</Badge>{" "}
            </div>
          </CardTitle>
          <CardDescription className="text-ellipsis truncate line-clamp-2 text-wrap">
            {data.toppings}
          </CardDescription>
        </CardHeader>
      </Link>
      <Button
        className="rounded-full absolute right-5 bottom-5 group-hover:opacity-100 opacity-0 transition z-20"
        size="icon"
        variant="secondary"
        onClick={() => console.log("Dodano do koszyka...")}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ShoppingCart className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent>Dodaj do koszyka</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </Card>
  );
}

export default ProductCard;
