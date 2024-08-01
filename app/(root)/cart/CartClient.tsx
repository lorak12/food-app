import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";

function CartClient() {
  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="flex flex-col gap-6 col-span-3">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Koszyk</h1>
          <p className="text-muted-foreground">
            <span className="font-semibold">0 przedmiotów </span> w koszyku
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
                <TableRow>
                  <TableCell className="grid grid-cols-3 gap-4 max-w-[400px]">
                    <Image
                      src="/pizza.png"
                      alt="pizza"
                      width="100"
                      height="100"
                    />
                    <div className="col-span-2 flex flex-col justify-center">
                      <span className="text-muted-foreground">PIZZA</span>
                      <p className="font-semibold text-2xl">Margarita</p>
                      <p className="text-muted-foreground">
                        Rozmiar: Duża (40cm)
                      </p>
                      <p className="text-muted-foreground">Ciasto: Cienkie</p>
                    </div>
                  </TableCell>
                  <TableCell>12.99 zł</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>25.98 zł</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="grid grid-cols-3 gap-4 max-w-[400px]">
                    <Image
                      src="/pizza.png"
                      alt="pizza"
                      width="100"
                      height="100"
                    />
                    <div className="col-span-2 flex flex-col justify-center">
                      <span className="text-muted-foreground">PIZZA</span>
                      <p className="font-semibold text-2xl">Gratka</p>
                      <p className="text-muted-foreground">
                        Rozmiar: Średnia (35cm)
                      </p>
                      <p className="text-muted-foreground">Ciasto: Grube</p>
                    </div>
                  </TableCell>
                  <TableCell>8.99 zł</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>8.99 zł</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Podsumowanie</CardTitle>
          <CardDescription>
            <span className="font-semibold">0 przedmiotów </span> w koszyku
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Koszyk</TableCell>
                <TableCell>
                  <span className="font-semibold">75.99 zł</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dostawa</TableCell>
                <TableCell>
                  <span className="font-semibold">+3 zł</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Zniżka</TableCell>
                <TableCell>
                  <span className="font-semibold">-12.99 zł</span>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Razem</TableCell>
                <TableCell>
                  <span className="font-semibold text-lg">60.00 zł</span>
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
