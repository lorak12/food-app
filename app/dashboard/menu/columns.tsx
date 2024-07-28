"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import CellActions from "./CellActions";
import { Check, Cross } from "lucide-react";
import { Product } from "@prisma/client";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nazwa" />
    ),
    cell: ({ row }) => (
      <div className="w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cena" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(price);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "isAvailable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dostępność" />
    ),
    cell: ({ row }) => {
      return (
        <span>
          {row.getValue("isAvailable") ? (
            <Check className="w-4 h-4" />
          ) : (
            <Cross className="w-4 h-4" />
          )}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategoria" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stworzony" />
    ),
    cell: ({ row }) => {
      const rawFormattedDate = format(
        row.getValue("createdAt"),
        " dd MMMM yyyy",
        {
          locale: pl,
        }
      );

      const formattedDate = rawFormattedDate.replace(
        /(\d{2} )(\p{L})/u,
        (match, p1, p2) => p1 + p2.toUpperCase()
      );

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aktualizowany" />
    ),
    cell: ({ row }) => {
      const rawFormattedDate = format(
        row.getValue("updatedAt"),
        " dd MMMM yyyy",
        {
          locale: pl,
        }
      );

      const formattedDate = rawFormattedDate.replace(
        /(\d{2} )(\p{L})/u,
        (match, p1, p2) => p1 + p2.toUpperCase()
      );

      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions row={row} />;
    },
  },
];
