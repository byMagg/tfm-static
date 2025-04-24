import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { CommandEmpty } from "cmdk";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "./ui/drawer";
import { Form, FormField, FormItem } from "./ui/form";
import { type ComboboxItem, FormSchema } from "./ui/select-form";

export default function AddPlayersForm({ leagueId }: { leagueId: string }) {
  const [players, setPlayers] = useState<ComboboxItem[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: [] },
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data: { data = [] } = {} } = await actions.getUsers();

      const players = data.map((player: any) => ({
        label: player.name,
        value: player._id,
      }));

      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!leagueId) return;

      const { data: actionData, error } = await actions.addPlayersToLeague({
        leagueId,
        playerIds: data.items,
      });

      if (actionData) {
        setOpen(false);
        toast.success("Añadidos jugadores a liga");
      }
    } catch (error) {
      console.error("Error adding players to league:", error);
      toast.error("Error adding players to league.");
    } finally {
      setOpen(false);
    }
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Añadir jugadores</Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby="">
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>Añadir jugadores</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 my-1"
            >
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Command>
                      <CommandInput placeholder="Buscar jugadores..." />
                      <CommandList className="min-h-80">
                        <CommandEmpty>Jugador no encontrado</CommandEmpty>
                        <CommandGroup>
                          {players.map((player) => (
                            <CommandItem
                              value={player.label}
                              key={player.value}
                              onSelect={() => {
                                const currentValues = field.value || [];
                                if (currentValues.includes(player.value)) {
                                  form.setValue(
                                    "items",
                                    currentValues.filter(
                                      (v) => v !== player.value,
                                    ),
                                  );
                                } else {
                                  form.setValue("items", [
                                    ...currentValues,
                                    player.value,
                                  ]);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value.includes(player.value)
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {player.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormItem>
                )}
              />
              <div className="mt-auto flex flex-col gap-2 px-4">
                <Button type="submit">Añadir</Button>
              </div>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
