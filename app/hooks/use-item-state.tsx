import { focusAtom } from "jotai-optics";
import { useMemo } from "react";
import { todosAtom } from "~/state/todos.state";

export function useItemState(parent: string, id: string) {
    const itemAtom = useMemo(
        () =>
            focusAtom(todosAtom, (optic) =>
                optic
                    .find((list) => list.id === parent)
                    .optional()
                    .prop("items")
                    .find((item) => item.id === id)
            ),
        [parent, id]
    );

    const isCompleteAtom = useMemo(
        () =>
            focusAtom(itemAtom, (optic) => optic.optional().prop("completed")),
        [itemAtom]
    );

    const dateAtom = useMemo(
        () => focusAtom(itemAtom, (optic) => optic.optional().prop("date")),
        [itemAtom]
    );

    const timeRangeAtom = useMemo(
        () =>
            focusAtom(itemAtom, (optic) => optic.optional().prop("timeRange")),
        [itemAtom]
    );

    const tagsAtom = useMemo(
        () => focusAtom(itemAtom, (optic) => optic.optional().prop("tags")),
        [itemAtom]
    );

    return {
        isCompleteAtom,
        dateAtom,
        timeRangeAtom,
        tagsAtom,
    };
}
