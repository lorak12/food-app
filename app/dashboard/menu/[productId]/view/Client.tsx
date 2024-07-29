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
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronLeft,
  ChevronsUpDown,
  CircleCheck,
  CirclePlus,
  CircleX,
} from "lucide-react";
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
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductWithChildren } from "@/types/types";
import { schemas } from "@/schemas/schemas";
import Link from "next/link";
import { Option, Tag } from "@prisma/client";
import { useState } from "react";
import { createTag } from "@/actions/tagsActions";
import { createOption } from "@/actions/optionsActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProduct } from "@/actions/productActions";

function Client({
  product,
  initialOptions,
  initialTags,
}: {
  product: ProductWithChildren;
  initialOptions: Option[];
  initialTags: Tag[];
}) {
  const router = useRouter();
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>(initialTags);
  const [allOptions, setAllOptions] = useState<Option[]>(initialOptions);

  const form = useForm<z.infer<typeof schemas.FormProductSchema>>({
    resolver: zodResolver(schemas.FormProductSchema),
    defaultValues: {
      name: product.name,
      toppings: product.toppings,
      basePrice: product.basePrice,
      category: product.category,
      isAvailable: product.isAvailable,
      tags: [
        ...product.tags.map((tag) => {
          return {
            id: tag.id,
            name: tag.name,
            textColor: tag.textColor,
            bgColor: tag.bgColor,
          };
        }),
      ],
      options: [
        ...product.options.map((option) => {
          return {
            id: option.id,
            name: option.name,
          };
        }),
      ],
      image: product.image,
    },
  });

  const tagForm = useForm<z.infer<typeof schemas.FormTagSchema>>({
    resolver: zodResolver(schemas.FormTagSchema),
    defaultValues: {},
  });

  const optionForm = useForm<z.infer<typeof schemas.FormOptionSchema>>({
    resolver: zodResolver(schemas.FormOptionSchema),
    defaultValues: {
      name: "",
      options: [{ value: "", label: "", price: 0 }],
    },
  });

  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const {
    fields: optionItemFields,
    append: optionItemAppend,
    remove: optionItemRemove,
  } = useFieldArray({
    control: optionForm.control,
    name: "options",
  });

  async function onSubmit(data: z.infer<typeof schemas.FormProductSchema>) {
    try {
      await updateProduct(product.id, data);
      toast({
        title: "Produkt został zaktualizowany",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
      router.push("/dashboard/menu");
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

  async function handleNewTagSubmit(
    data: z.infer<typeof schemas.FormTagSchema>
  ) {
    try {
      const newTag = await createTag(data);

      setAllTags((prevTags) => [...prevTags, newTag]);
      tagAppend(newTag as any);
      setIsTagDialogOpen(false);
      tagForm.reset();
      toast({
        title: "Tag został stworzony",
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

  async function handleNewOptionSubmit(
    data: z.infer<typeof schemas.FormOptionSchema>
  ) {
    try {
      const newOption = await createOption(data);
      setAllOptions((prevOptions) => [...prevOptions, newOption]);
      optionAppend(newOption as any);
      setIsOptionDialogOpen(false);
      optionForm.reset();
      toast({
        title: "Opcja została stworzona",
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
                      Edytuj informacje na temat produktu.
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
                      Zarządzaj tagami oraz opcjami dla danego produktu.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Tags Field */}
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tagi</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    {field.value?.length
                                      ? tagFields.map((tag) => (
                                          <Badge
                                            key={tag.id}
                                            style={{
                                              backgroundColor: tag.bgColor,
                                              color: tag.textColor,
                                            }}
                                          >
                                            {tag.name}
                                          </Badge>
                                        ))
                                      : "Wybierz tag"}
                                  </div>
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Szukaj tagu..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Nie znaleziono tagu.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem>
                                      <Dialog
                                        open={isTagDialogOpen}
                                        onOpenChange={setIsTagDialogOpen}
                                      >
                                        <DialogTrigger asChild>
                                          <div className="flex items-center">
                                            <CirclePlus className="mr-2 h-4 w-4" />
                                            <span>Utwórz tag</span>
                                          </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Nowy tag</DialogTitle>
                                          </DialogHeader>
                                          <Form {...tagForm}>
                                            <form
                                              onSubmit={tagForm.handleSubmit(
                                                handleNewTagSubmit
                                              )}
                                              className="space-y-4"
                                            >
                                              <FormField
                                                control={tagForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Nazwa</FormLabel>
                                                    <FormControl>
                                                      <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                              <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                  control={tagForm.control}
                                                  name="textColor"
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>
                                                        Kolor tekstu
                                                      </FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          type="color"
                                                          className="w-full"
                                                          {...field}
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />
                                                <FormField
                                                  control={tagForm.control}
                                                  name="bgColor"
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>
                                                        Kolor tła
                                                      </FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          type="color"
                                                          {...field}
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                              <DialogFooter>
                                                <Button type="submit">
                                                  Dodaj{" "}
                                                  <CirclePlus className="w-4 h-4 ml-2" />
                                                </Button>
                                              </DialogFooter>
                                            </form>
                                          </Form>
                                        </DialogContent>
                                      </Dialog>
                                    </CommandItem>
                                    {allTags.map((tag) => (
                                      <CommandItem
                                        key={tag.id}
                                        onSelect={() => {
                                          const isTagSelected =
                                            field.value.some(
                                              (t) => t.id === tag.id
                                            );
                                          if (isTagSelected) {
                                            // Remove the tag from the selected tags
                                            const indexToRemove =
                                              field.value.findIndex(
                                                (t) => t.id === tag.id
                                              );
                                            tagRemove(indexToRemove);
                                          } else {
                                            // Add the tag to the selected tags
                                            tagAppend(tag as any);
                                          }
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <Check
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              field.value.some(
                                                (t) => t.id === tag.id
                                              )
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          <Badge
                                            style={{
                                              backgroundColor: tag.bgColor,
                                              color: tag.textColor,
                                            }}
                                            className="ml-2"
                                          >
                                            {tag.name}
                                          </Badge>
                                        </div>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Wybierz tagi które pasują do twojego produktu.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Options Field */}
                    <FormField
                      control={form.control}
                      name="options"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opcje</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !optionFields.length &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <div className="flex gap-2">
                                    {optionFields.length
                                      ? optionFields.map((option) => (
                                          <span key={option.id}>
                                            {option.name}
                                          </span>
                                        ))
                                      : "Wybierz opcje"}
                                  </div>
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Szukaj opcji..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Nie znaleziono opcji.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem>
                                      <Dialog
                                        open={isOptionDialogOpen}
                                        onOpenChange={setIsOptionDialogOpen}
                                      >
                                        <DialogTrigger asChild>
                                          <div className="flex items-center">
                                            <CirclePlus className="mr-2 h-4 w-4" />
                                            <span>Utwórz opcję</span>
                                          </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>
                                              Nowa opcja
                                            </DialogTitle>
                                          </DialogHeader>
                                          <Form {...optionForm}>
                                            <form
                                              onSubmit={optionForm.handleSubmit(
                                                handleNewOptionSubmit
                                              )}
                                              className="space-y-4"
                                            >
                                              <FormField
                                                control={optionForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>
                                                      Nazwa opcji
                                                    </FormLabel>
                                                    <FormControl>
                                                      <Input
                                                        {...field}
                                                        placeholder="np. Rozmiar"
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                              {optionItemFields.map(
                                                (item, index) => (
                                                  <div
                                                    key={item.id}
                                                    className="flex gap-2 items-end"
                                                  >
                                                    <FormField
                                                      control={
                                                        optionForm.control
                                                      }
                                                      name={`options.${index}.value`}
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <FormLabel>
                                                            Wartość
                                                          </FormLabel>
                                                          <FormControl>
                                                            <Input {...field} />
                                                          </FormControl>
                                                          <FormMessage />
                                                        </FormItem>
                                                      )}
                                                    />
                                                    <FormField
                                                      control={
                                                        optionForm.control
                                                      }
                                                      name={`options.${index}.label`}
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <FormLabel>
                                                            Etykieta
                                                          </FormLabel>
                                                          <FormControl>
                                                            <Input {...field} />
                                                          </FormControl>
                                                          <FormMessage />
                                                        </FormItem>
                                                      )}
                                                    />
                                                    <FormField
                                                      control={
                                                        optionForm.control
                                                      }
                                                      name={`options.${index}.price`}
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <FormLabel>
                                                            Cena (dodatkowa)
                                                          </FormLabel>
                                                          <FormControl>
                                                            <Input
                                                              type="number"
                                                              {...field}
                                                              onChange={(e) =>
                                                                field.onChange(
                                                                  parseFloat(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                )
                                                              }
                                                            />
                                                          </FormControl>
                                                          <FormMessage />
                                                        </FormItem>
                                                      )}
                                                    />
                                                    <Button
                                                      type="button"
                                                      onClick={() =>
                                                        optionItemRemove(index)
                                                      }
                                                      variant="destructive"
                                                    >
                                                      X
                                                    </Button>
                                                  </div>
                                                )
                                              )}
                                              <Button
                                                type="button"
                                                onClick={() =>
                                                  optionItemAppend({
                                                    value: "",
                                                    label: "",
                                                    price: 0,
                                                  })
                                                }
                                              >
                                                Dodaj kolejną opcję
                                              </Button>
                                              <DialogFooter>
                                                <Button type="submit">
                                                  Dodaj opcję
                                                </Button>
                                              </DialogFooter>
                                            </form>
                                          </Form>
                                        </DialogContent>
                                      </Dialog>
                                    </CommandItem>
                                    {allOptions.map((option) => (
                                      <CommandItem
                                        key={option.id}
                                        onSelect={() => {
                                          const isOptionSelected =
                                            field.value.some(
                                              (o) => o.id === option.id
                                            );
                                          if (isOptionSelected) {
                                            const indexToRemove =
                                              field.value.findIndex(
                                                (t) => t.id === option.id
                                              );
                                            optionRemove(indexToRemove);
                                          } else {
                                            optionAppend(option as any);
                                          }
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <Check
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              field.value.some(
                                                (t) => t.id === option.id
                                              )
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          <span className="ml-2">
                                            {option.name}
                                          </span>
                                        </div>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Dodaj opcje do twojego produktu (np. rozmiary,
                            dodatki).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Kategoria produktu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategoria</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Wybierz kategorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pizza">Pizza</SelectItem>
                              <SelectItem value="fastFood">
                                Fast Food
                              </SelectItem>
                              <SelectItem value="other">Inne</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Wybierz kategorie w której produkt będzie
                            wyświetlany
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Dostępność produktu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="isAvailable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Dostosuj wyświetlanie produktu
                            </FormLabel>
                            <FormDescription>
                              Jeżeli zaznaczony to produkt będzie wyświetlany na
                              stronie.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Zdjęcia produktu</CardTitle>
                    <CardDescription>
                      Dodawaj i usuwaj zdjęcia produktu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>TODO: dodać upload obrazków</CardContent>
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
