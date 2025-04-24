import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { leagueAdded } from "@/stores/leagueAdded";
import { actions } from "astro:actions";
import { useState } from "react";
import { toast } from "sonner";

export function Modal({
  buttonLabel,
  title,
  description,
}: {
  buttonLabel?: string;
  title?: string;
  description?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString();

    try {
      if (!name) throw new Error("Name is required");

      const {
        data: { data },
      } = await actions.createLeague({ name });

      if (data) {
        setIsOpen(false);
        leagueAdded.set(true);
        toast.success("League created successfully");
      } else {
        toast.error("Could not create league");
      }
    } catch (error) {
      console.error("Error creating league:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonLabel ?? "Open modal"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title ?? "Edit profile"}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Liga de Cáceres II"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
