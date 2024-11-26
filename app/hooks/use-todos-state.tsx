import { format } from "date-fns";
import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { isToday } from "~/helpers/date";
import { todosAtom } from "~/state/todos.state";

export function useTodosState() {
    const [lists, setLists] = useAtom(todosAtom);

    const createList = useCallback(
        ({ title }: { title: string }) => {
            const newList = {
                id: nanoid(),
                title,
                description: "",
                items: [],
                featured: false,
            };
            setLists((prev) => [...prev, newList]);
        },
        [setLists]
    );

    const getFeaturedListsAtom = useMemo(() => {
        return focusAtom(todosAtom, (optic) =>
            optic.filter((list) => list?.featured === true)
        );
    }, []);

    const getTodaysTasksAtom = useMemo(() => {
        return focusAtom(todosAtom, (optic) =>
            optic.filter((list) => {
                if (!list?.items) {
                    return false;
                }

                return true;
                return list.items.some((item) =>
                    item.date ? isToday(item.date) : false
                );
            })
        );
    }, []);

    return {
        lists: lists ?? [],
        createList,
        getFeaturedListsAtom,
        getTodaysTasksAtom,
    };
}
