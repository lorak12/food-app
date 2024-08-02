"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { OrderItemWithChildren } from "@/types/types";
import { formatPrice } from "@/utils/priceFormatter";
import { CircleX } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartClient({ orderItems }: { orderItems: OrderItemWithChildren[] }) {
  function calculateTotalPrice() {
    return orderItems.reduce((total, item) => total + item.price, 0);
  }
  function calculateTotalQuantity() {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="flex flex-col gap-6 col-span-3">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Koszyk</h1>
          <p className="text-muted-foreground">
            <span className="font-semibold">
              {orderItems.length} przedmiotów{" "}
            </span>{" "}
            w koszyku
          </p>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead>Cena</TableHead>
                  <TableHead>Ilość</TableHead>
                  <TableHead>Cena całkowita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow>
                    <TableCell className="grid grid-cols-3 gap-4 max-w-[400px]">
                      <Image
                        src="/pizza.png"
                        alt="pizza"
                        width="100"
                        height="100"
                      />
                      <div className="col-span-2 flex flex-col justify-center">
                        <span className="text-muted-foreground uppercase">
                          {item.product.category}
                        </span>
                        <p className="font-semibold text-2xl">
                          {item.product.name}
                        </p>
                        {item.pickedOptions.map((option) => (
                          <p className="text-muted-foreground">
                            {
                              item.product.options.find(
                                (x) => x.id == option.optionId
                              )?.name
                            }
                            : {option.label}
                          </p>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatPrice(item.price / item.quantity)}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatPrice(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-col space-y-4">
            <CardTitle>Kod zniżkowy</CardTitle>
            <Input placeholder="Kod" />
            <Button
              onClick={() => {
                toast({
                  title: "Kod nieprawidłowy",
                  description: "Zniżka nie została zaaplikowana",
                  variant: "destructive",
                  action: <CircleX className="w-4 h-4 text-white" />,
                });
              }}
            >
              Użyj kodu
            </Button>
          </div>
          <Separator />
          <CardTitle>Podsumowanie</CardTitle>
          <CardDescription>
            <span className="font-semibold">
              {orderItems.length} przedmiotów{" "}
            </span>{" "}
            w koszyku
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Koszyk</TableCell>
                <TableCell>
                  <span className="font-semibold">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sosy i pudełka</TableCell>
                <TableCell>
                  <span className="font-semibold">
                    +{formatPrice(calculateTotalQuantity() * 3)}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Zniżka</TableCell>
                <TableCell>
                  <span className="font-semibold">-0 zł</span>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Razem</TableCell>
                <TableCell>
                  <span className="font-semibold text-lg">
                    {formatPrice(
                      calculateTotalPrice() + calculateTotalQuantity() * 3
                    )}
                  </span>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default CartClient;
