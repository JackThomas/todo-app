import { format, getUnixTime } from "date-fns";
import { Calendar } from "lucide-react";
import { useMemo } from "react";

interface TaskDateProps {
    date: Date;
    isComplete?: boolean;
}

const TaskDate = ({ date, isComplete }: TaskDateProps) => {
    const isToday =
        format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

    const isTomorrow =
        format(date, "yyyy-MM-dd") ===
        format(
            new Date(new Date().setDate(new Date().getDate() + 1)),
            "yyyy-MM-dd"
        );

    const isPast = getUnixTime(date) < getUnixTime(new Date());

    const color = useMemo(() => {
        if (isComplete) {
            return "hsl(var(--color-slate-500))";
        }
        if (isToday || isPast) {
            return "hsl(var(--color-red-500))";
        }
        if (isTomorrow) {
            return "hsl(var(--color-amber-500))";
        }

        return "";
    }, [isToday, isTomorrow, isPast, isComplete]);

    const dateString = useMemo(() => {
        if (isToday) {
            return "Today";
        }
        if (isTomorrow) {
            return "Tomorrow";
        }
        if (isPast && !isComplete) {
            return "Past due";
        }

        return format(date, "E	do MMM");
    }, [date, isToday, isTomorrow, isPast, isComplete]);

    return (
        <div className="flex items-center gap-1 transition" style={{ color }}>
            <Calendar size={14} />
            <span className="text-sm">{dateString}</span>
        </div>
    );
};

export { TaskDate };
