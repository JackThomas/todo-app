interface ListType {
    id: string;
    title: string;
    description: string;
    items: ItemType[];
}

interface ItemType {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export type { ListType, ItemType };
