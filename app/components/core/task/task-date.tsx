import { format, getUnixTime } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import { isToday as isTodayFn } from "~/helpers/date";

interface TaskDateProps {
    date: Date;
    timeRange?: {
        start: string;
        end: string;
    };
    isComplete?: boolean;
}

const TaskDate = ({ date, timeRange, isComplete }: TaskDateProps) => {
    const isToday = isTodayFn(date);
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

    const timeRangeString = useMemo(() => {
        if (timeRange) {
            return `${timeRange.start} - ${timeRange.end} `;
        }

        return "";
    }, [timeRange]);

    return (
        <div className="flex items-center gap-1 transition" style={{ color }}>
            <CalendarIcon size={14} />
            <span className="text-sm">
                {timeRangeString}
                {dateString}
            </span>
        </div>
    );
};

export { TaskDate };
