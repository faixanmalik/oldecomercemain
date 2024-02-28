import React, { useState } from "react";
import { LuClock2 } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import FilledButton from "@/components/buttons/FilledButton";
import Spinner from "@/components/Spinner";
import { Calendar } from "@/components/ui/calendar";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import { CiCalendarDate } from "react-icons/ci";
import { Button } from "@/components/ui/button";

export default function EditPublishmentDateDialog({
  onSave,
  icon,
}: {
  icon: React.ReactNode;
  onSave: (dateRange: Date | undefined) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await onSave(date);
      setOpen(false);
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 w-7 h-7">
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Schedule online store publishment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col py-4 gap-4">
          <div className="flex flex-col md:flex-row gap-4 px-4">
            <Input
              id="single-date"
              type="date"
              placeholder="Date (YYYY-MM-DD)"
              icon={<CiCalendarDate size={16} className="text-gray-500" />}
              onChange={() => {}}
            />
            <Input
              id="time"
              type="time"
              placeholder="Time"
              icon={<LuClock2 size={16} className="text-gray-500" />}
              onChange={() => {}}
            />
          </div>
          <Calendar
            initialFocus
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            mode="single"
          />
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          {loading ? (
            <Spinner />
          ) : (
            <FilledButton onClick={handleSave}>
              Schedule publishing
            </FilledButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
