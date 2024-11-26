import { format } from "date-fns";

export const isToday = (date: Date) =>
    format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
