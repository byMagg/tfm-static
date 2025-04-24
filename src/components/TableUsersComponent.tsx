import { usePagination } from "@/hooks/usePagination";
import { usePlayersFromLeague } from "@/hooks/usePlayersFromLeague";
import { type User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { useEffect } from "react";
import { toast } from "sonner";
import { DataTable } from "./DataTable";
import { DeleteModal } from "./DeleteModal";

async function handleDelete({
  id,
  leagueId,
}: {
  id: string;
  leagueId: string;
}) {
  const { data, error } = await actions.removePlayersFromLeague({
    leagueId,
    playerId: [id],
  });

  if (error) {
    toast.error("No se pudo eliminar el jugador");
    return;
  }

  navigate(`/leagues/${leagueId}`);
}

export default function TableUsersComponent({
  playerIds,
  leagueId,
}: {
  playerIds: string[];
  leagueId: string;
}) {
  const { limit, onPaginationChange, page, pagination } = usePagination();

  const { players, count, loading, error } = usePlayersFromLeague({
    playerIds,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const pageCount = Math.round(count / limit);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Display Name",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { original } = row;

        return (
          <div className="flex items-center justify-center">
            <DeleteModal
              onRemove={() => {
                handleDelete({
                  id: original._id,
                  leagueId: leagueId,
                });
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={players}
        pageCount={pageCount}
        loading={loading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
