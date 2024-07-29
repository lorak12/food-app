"use client";
import { updateProduct } from "@/actions/productActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { statuses } from "@/components/ui/constants";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronLeft,
  ChevronsUpDown,
  CircleCheck,
  CircleMinus,
  CirclePlus,
  CircleX,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductWithChildren } from "@/types/types";
import { schemas } from "@/schemas/schemas";
import Link from "next/link";

function Client({ product }: { product: ProductWithChildren }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof schemas.FormProductSchema>>({
    resolver: zodResolver(schemas.FormProductSchema),
    defaultValues: {
      name: product.name,
      toppings: product.toppings,
      basePrice: product.basePrice,
      category: product.category,
      tags: [...product.tags],
      options: [...product.options],
      image: product.image,
    },
  });

  async function onSubmit(data: z.infer<typeof schemas.FormProductSchema>) {
    try {
      // await updateProduct(product.id, data);

      toast({
        title: "Produkt został zaktualizowany",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
      router.push("/dashboard/products");
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

  return (
    <div className="flex flex-1 flex-col gap-4  lg:gap-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/menu">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {product.name}
              </h1>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Szczegóły produktu</CardTitle>
                    <CardDescription>
                      Edytuj opis, nazwe, dodawaj zdjęcia oraz więcej.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nazwa</FormLabel>
                            <FormControl>
                              <Input placeholder="Gratka..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="toppings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Składniki</FormLabel>
                            <FormControl>
                              <Input placeholder="sos, ser..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="basePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cena podstawowa</FormLabel>
                            <FormControl>
                              <Input placeholder="0" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Szczegóły</CardTitle>
                    <CardDescription>
                      Tabelka zawierająca np. wymiary lub dostępne dodatki
                    </CardDescription>
                  </CardHeader>
                  <CardContent>Content</CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Dodaj wiersz
                    </Button>
                  </CardFooter>
                </Card>
                <div className="flex gap-4">
                  <Card className="max-w-[50%]">
                    <CardHeader>
                      <CardTitle>Kategoria produktu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">Content</div>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Archiwizacja produktów</CardTitle>
                      <CardDescription>
                        Jeżeli kliknięte produkt nie wyświetla się już na
                        stronie.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div></div>
                      <Button size="sm" variant="secondary">
                        Archiwizuj produkt
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">status</div>
                  </CardContent>
                </Card>

                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Zdjęcia produktu</CardTitle>
                    <CardDescription>
                      Dodawaj i usuwaj zdjęcia produktu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>image</CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Zapisz zmiany</CardTitle>
                    <CardDescription>
                      Zapisz zmiany wprowadzone w formularzu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" type="submit">
                      Aktualizuj produkt
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Client;
