"use client";

import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { RotateCcw } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-options";
import { statuses } from "./constants";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filter: string;
}

export function DataTableToolbar<TData>({
  table,
  filter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtruj..."
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RotateCcw className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
