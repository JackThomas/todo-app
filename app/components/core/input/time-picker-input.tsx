import { useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

interface TimePickerInputProps {
    value?: string;
    onChange: (value: string) => void;
    isDisabled?: (time: { hour: number; minute: number }) => boolean;
}

const TimePickerInput = ({
    value,
    onChange,
    isDisabled,
}: TimePickerInputProps) => {
    const [time, setTime] = useState<string>(value ?? "09:00");

    return (
        <Select
            defaultValue={time!}
            onValueChange={(nextValue: string) => {
                setTime(nextValue);
                // if (date) {
                //   const [hours, minutes] = e.split(":");
                //   const newDate = new Date(date.getTime());
                //   newDate.setHours(parseInt(hours), parseInt(minutes));
                //   setDate(newDate);
                //   field.onChange(newDate);
                // }

                onChange(nextValue);
            }}
        >
            <SelectTrigger className="font-normal ">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                        const hour = Math.floor(i / 4);
                        const minute = (i % 4) * 15;
                        const hourString = hour.toString().padStart(2, "0");
                        const minuteString = minute.toString().padStart(2, "0");
                        return (
                            <SelectItem
                                key={i}
                                value={`${hourString}:${minuteString}`}
                                disabled={
                                    isDisabled?.({ hour, minute }) ?? false
                                }
                            >
                                {hourString}:{minuteString}
                            </SelectItem>
                        );
                    })}
                </ScrollArea>
            </SelectContent>
        </Select>
    );
};

export { TimePickerInput };
