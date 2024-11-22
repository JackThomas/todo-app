import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { nanoid } from "nanoid";
import { useCallback } from "react";
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
            };
            setLists((prev) => [...prev, newList]);
        },
        [setLists]
    );

    const getListState = useCallback((id: string) => {
        return focusAtom(todosAtom, (optic) =>
            optic.find((list) => list.id === id)
        );
    }, []);

    const getListTitleAtom = useCallback(
        (id: string) => {
            const atom = getListState(id);
            return focusAtom(atom, (optic) => optic.optional().prop("title"));
        },
        [getListState]
    );

    const getListTasksAtom = useCallback(
        (id: string) => {
            const atom = getListState(id);
            return focusAtom(atom, (optic) => optic.optional().prop("items"));
        },
        [getListState]
    );

    return {
        lists: lists ?? [],
        createList,
        getListState,
        getListTitleAtom,
        getListTasksAtom,
    };
}
