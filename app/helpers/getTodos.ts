import { ListType } from "~/types/list.type";

export const getTodos = () => JSON.parse(localStorage.todos ?? "[]");

export const getList = (id: string) => {
    const todos: ListType[] = getTodos();

    return todos.find((list) => list.id === id);
};
