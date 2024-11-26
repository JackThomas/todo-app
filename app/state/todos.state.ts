import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import { ListType } from "~/types/list.type";

const initial = [
    {
        id: nanoid(),
        title: "test",
        description: "test",
        items: [
            {
                id: "1_1",
                title: "test",
                description: "test",
                completed: false,
            },
            {
                id: "1_2",
                title: "test",
                description: "test",
                completed: false,
            },
        ],
    },
    {
        id: nanoid(),
        title: "test",
        description: "test",
        items: [
            {
                id: "2_1",
                title: "test",
                description: "test",
                completed: false,
            },
            {
                id: "2_2",
                title: "test",
                description: "test",
                completed: false,
            },
        ],
    },
];

const todosAtom = atomWithStorage<ListType[]>("todos", initial, undefined, {
    getOnInit: true,
});

export { todosAtom };
