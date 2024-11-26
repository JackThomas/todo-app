import { focusAtom } from "jotai-optics";
import { useMemo } from "react";
import { todosAtom } from "~/state/todos.state";

export function useListState(id: string) {
    const listAtom = useMemo(
        () =>
            focusAtom(todosAtom, (optic) =>
                optic.find((list) => list.id === id)
            ),
        [id]
    );

    const titleAtom = useMemo(
        () => focusAtom(listAtom, (optic) => optic.optional().prop("title")),
        [listAtom]
    );

    const itemsAtom = useMemo(
        () => focusAtom(listAtom, (optic) => optic.optional().prop("items")),
        [listAtom]
    );

    const isFeaturedAtom = useMemo(
        () => focusAtom(listAtom, (optic) => optic.optional().prop("featured")),
        [listAtom]
    );

    const colorAtom = useMemo(
        () => focusAtom(listAtom, (optic) => optic.optional().prop("color")),
        [listAtom]
    );

    return {
        titleAtom,
        itemsAtom,
        isFeaturedAtom,
        colorAtom,
    };
}
