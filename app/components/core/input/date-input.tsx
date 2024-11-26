import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface DateInputProps {
    value?: Date;
    onChange?: (value: Date) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
    const handleSelect = useCallback(
        (nextValue: Date | undefined) => {
            if (nextValue) {
                onChange?.(nextValue);
            }
        },
        [onChange]
    );

    const disabled = (date: Date) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() - 1);

        return date < newDate;
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full pl-3 text-left font-normal hover:bg-white-100",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value ? format(value, "PPP") : <span>Select date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleSelect}
                    disabled={disabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export { DateInput };
