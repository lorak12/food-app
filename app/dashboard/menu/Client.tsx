import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Product } from "@prisma/client";
import Link from "next/link";

function Client({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="max-w-[40%] space-y-2">
          <h2 className="text-4xl tracking-tight font-semibold">Produkty</h2>
          <p className="text-muted-foreground">
            Zarządzaj produktami i ich wyświetlaniem na stronie
          </p>
        </div>
        <Link href="/dashboard/menu/new">
          <Button>
            Dodaj nowy produkt <CirclePlus className="w-4 h-4 ml-2 " />
          </Button>
        </Link>
      </div>
      <DataTable data={products} columns={columns} filter="name" />
    </div>
  );
}

export default Client;
