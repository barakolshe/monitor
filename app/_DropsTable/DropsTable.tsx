import { Button } from "@/components/ui/Button/Button";
import { FunctionComponent } from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import DataTable from "@/components/shared/DataTable/DataTable";
import { Rocket } from "@/types/rockets/Rocket.interface";
import { ColumnDef, Row } from "@tanstack/react-table";
import { getDate, getTime } from "@/lib/timeUtils";
import CellContainer from "./CellContainer/CellContainer";

interface DropsTableProps {
  data: Rocket[];
}

const DropsTable: FunctionComponent<DropsTableProps> = ({ data }) => {
  console.log({ data });

  const columns: ColumnDef<Rocket>[] = [
    {
      id: "time",
      accessorFn: (originalRow) => getTime(originalRow.timestamp),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <CellContainer>{row.getValue("time")}</CellContainer>;
      },
    },
    {
      id: "date",
      accessorFn: (originalRow) => getDate(originalRow.timestamp),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <CellContainer>{row.getValue("date")}</CellContainer>,
    },
    {
      id: "area",
      accessorKey: "area",
      header: ({ column }) => {
        return (
          <Button
            className="justify-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Area
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <CellContainer>{row.getValue("area")}</CellContainer>,
    },
    {
      id: "location",
      accessorKey: "location",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Location
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <CellContainer>{row.getValue("location")}</CellContainer>
      ),
    },
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <CellContainer>{row.getValue("title")}</CellContainer>,
    },
  ];
  return <DataTable columns={columns} data={data}></DataTable>;
};

export default DropsTable;
