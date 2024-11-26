import { Color } from "~/components/core/color-selector";
import { TagType } from "./tag.type";

interface ListType {
    id: string;
    title: string;
    description: string;
    items: ItemType[];
    featured?: boolean;
    color?: Color;
}

interface ItemType {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    date?: Date;
    timeRange?: {
        start: string;
        end: string;
    };
    tags?: TagType[];
}

export type { ListType, ItemType };
