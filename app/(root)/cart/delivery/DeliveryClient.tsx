"use client";
import { Button } from "@/components/ui/button";
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

import { CircleCheck, CirclePlus, CircleX, HandCoins } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { Address } from "@prisma/client";
import { formatPrice } from "@/utils/priceFormatter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { schemas } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { createAddress } from "@/actions/addressActions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { createOrder } from "@/actions/orderActions";

function DeliveryClient({
  data,
  totalPrice,
}: {
  data: Address[];
  totalPrice: number;
}) {
  const router = useRouter();

  if (totalPrice <= 0) {
    return router.push("/cart");
  }

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection, //pass the row selection state back to the table instance
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    getRowId: (row) => row.id,
  });

  function extractIdFromString(input: string) {
    // Define the regular expression to match the UUID
    const regex = /"([a-f0-9-]{36})":/;

    // Execute the regex on the input string
    const match = input.match(regex);

    // If a match is found, return the first capture group (the UUID)
    // Otherwise, return null
    return match ? match[1] : "";
  }

  const addressForm = useForm<z.infer<typeof schemas.Address>>({
    resolver: zodResolver(schemas.Address),
    defaultValues: {
      phoneNumber: "+48 ",
    },
  });

  const form = useForm<z.infer<typeof schemas.Order>>({
    resolver: zodResolver(schemas.Order),
    defaultValues: {
      addressId: extractIdFromString(
        JSON.stringify(table.getState().rowSelection)
      ),
    },
    reValidateMode: "onChange",
  });

  form.setValue(
    "addressId",
    extractIdFromString(JSON.stringify(table.getState().rowSelection))
  );

  async function onAddressFormSubmit(data: z.infer<typeof schemas.Address>) {
    try {
      await createAddress(data);
      toast({
        title: "Adres został dodany do profilu użytkownika",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Coś poszło nie tak",
        variant: "destructive",
        action: <CircleX className="w-4 h-4 text-white" />,
      });
      console.error(error);
      throw new Error(error);
    }
  }

  async function onSubmit(values: z.infer<typeof schemas.Order>) {
    try {
      const deliveryPrice =
        data.find((x) => x.id === form.getValues("addressId"))?.zipCode ===
        "37-433"
          ? 3
          : 6;
      await createOrder(values, deliveryPrice);
      toast({
        title: "Zamówienie złożone",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
    } catch (error: any) {
      toast({
        title: "Coś poszło nie tak",
        variant: "destructive",
        action: <CircleX className="w-4 h-4 text-white" />,
      });
      console.error(error);
      throw new Error(error);
    }
  }

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-4 gap-10">
          <div className="flex flex-col gap-6 col-span-3">
            <Card>
              <FormField
                name="addressId"
                control={form.control}
                render={() => (
                  <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                    <CardHeader className="flex-row justify-between items-center">
                      <div className="space-y-2">
                        <FormLabel>
                          <CardTitle>Dostawa</CardTitle>
                        </FormLabel>
                        <FormDescription>
                          <CardDescription className="flex gap-2">
                            Wybierz adres dostawy.
                            <FormMessage />
                          </CardDescription>
                        </FormDescription>
                      </div>
                      <Button type="button">
                        <DialogTrigger asChild>
                          <div className="flex items-center gap-2">
                            Dodaj nowy adres <CirclePlus className="w-4 h-4" />
                          </div>
                        </DialogTrigger>
                      </Button>
                      <DialogContent>
                        <Form {...addressForm}>
                          <form
                            onSubmit={addressForm.handleSubmit(
                              onAddressFormSubmit
                            )}
                            className="space-y-2"
                          >
                            <FormField
                              control={addressForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nazwa</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Dom..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={addressForm.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nazwa</FormLabel>
                                  <FormControl>
                                    <PhoneInput
                                      {...field}
                                      defaultCountry="PL"
                                      placeholder="Number telefonu"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={addressForm.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Miejscowość</FormLabel>
                                    <FormControl>
                                      <Input placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={addressForm.control}
                                name="street"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Ulica</FormLabel>
                                    <FormControl>
                                      <Input placeholder="ul." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={addressForm.control}
                                name="houseNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Number domu</FormLabel>
                                    <FormControl>
                                      <Input placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={addressForm.control}
                                name="apartmentNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Numer lokalu (opcjonalne)
                                    </FormLabel>
                                    <FormControl>
                                      <Input placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={addressForm.control}
                                name="floorNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Piętro (opcjonalne)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={addressForm.control}
                                name="zipCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Kod pocztowy</FormLabel>
                                    <FormControl>
                                      <Input placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Dodaj nowy adres
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                  return (
                                    <TableHead key={header.id}>
                                      {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                          )}
                                    </TableHead>
                                  );
                                })}
                              </TableRow>
                            ))}
                          </TableHeader>
                          <TableBody>
                            {table.getRowModel().rows?.length ? (
                              table.getRowModel().rows.map((row) => (
                                <TableRow
                                  key={row.id}
                                  data-state={row.getIsSelected() && "selected"}
                                >
                                  {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={columns.length}
                                  className="h-24 text-center"
                                >
                                  <Button type="button">
                                    <DialogTrigger asChild>
                                      <div className="flex items-center gap-2">
                                        Dodaj nowy adres{" "}
                                        <CirclePlus className="w-4 h-4" />
                                      </div>
                                    </DialogTrigger>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Dialog>
                )}
              />
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Podsumowanie</CardTitle>
              <CardDescription>Podsumowanie zamówienia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Koszyk</TableCell>
                    <TableCell>
                      <span className="font-semibold">
                        {formatPrice(totalPrice)}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dostawa</TableCell>
                    <TableCell>
                      +
                      {formatPrice(
                        data.find((x) => x.id === form.getValues("addressId"))
                          ?.zipCode === "37-433"
                          ? 3
                          : 6
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Razem</TableCell>
                    <TableCell>
                      <span className="font-semibold text-lg">
                        {formatPrice(
                          data.find((x) => x.id === form.getValues("addressId"))
                            ?.zipCode === "37-433"
                            ? 3 + totalPrice
                            : 6 + totalPrice
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <Button className="w-full" size="lg" type="submit">
                Przejdz do płatności <HandCoins className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}

export default DeliveryClient;
