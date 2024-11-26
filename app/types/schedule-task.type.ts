import { Color } from "~/components/core/color-selector";

export interface ScheduleTask {
    parent: string;
    id: string;
    title: string;
    start: string;
    end: string;
    color?: Color;
}
