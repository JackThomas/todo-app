import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { todosAtom } from "~/state/todos.state";

/**
 * Custom hook to initialise the todosAtom if localStorage item isn't found.
 *
 * This hook retrieves the todos from the local storage and sets the state
 * using the `setTodos` function. If there are no todos in the local storage,
 * it retains the previous state.
 *
 * @returns {void}
 */
export function useInitState() {
    const setTodos = useSetAtom(todosAtom);

    useEffect(() => {
        const localState = localStorage.getItem("todos");
        if (!localState) {
            setTodos((prev) => prev);
        }
    }, [setTodos]);
}
