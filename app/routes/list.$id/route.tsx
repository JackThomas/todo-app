import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { UIMatch, useLoaderData, useRevalidator } from "@remix-run/react";
import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { EditableTitle } from "~/components/core/editable-title";
import { TaskItem } from "~/components/core/task/task-item";
import { Modal } from "~/components/core/modal";
import { TaskForm, TaskFormSchema } from "~/components/core/task-form";
import { DefaultLayout } from "~/components/layout/default-layout";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getList } from "~/helpers/getTodos";
import { todosAtom } from "~/state/todos.state";

export const meta: MetaFunction = () => {
    return [
        { title: "Todo List - List" },
        { name: "description", content: "" },
    ];
};

export const handle = {
    breadcrumb: (match: UIMatch) => {
        const {
            data: { title, id },
        } = match as { data: { title: string; id: string } };

        return {
            href: `/list/${id}`,
            label: title,
        };
    },
};

export const clientLoader = ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
        throw new Response(null, {
            status: 404,
            statusText: "Not Found",
        });
    }

    const list = getList(params.id);
    return list;
};

export default function Index() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const revalidator = useRevalidator();

    const data = useLoaderData<typeof clientLoader>();
    const id = data?.id ?? "";

    const titleAtom = useMemo(
        () =>
            focusAtom(todosAtom, (optic) =>
                optic
                    .find((list) => list.id === id)
                    .optional()
                    .prop("title")
            ),
        [id]
    );

    const itemsAtom = useMemo(
        () =>
            focusAtom(todosAtom, (optic) =>
                optic
                    .find((list) => list.id === id)
                    .optional()
                    .prop("items")
            ),
        [id]
    );

    const [title, setTitle] = useAtom(titleAtom);
    const titleRef = useRef(title);
    const [items, setItems] = useAtom(itemsAtom);

    const handleCreateTask = (data: z.infer<typeof TaskFormSchema>) => {
        setItems((prev) => [
            ...prev,
            {
                id: nanoid(),
                description: "test",
                completed: false,
                ...data,
            },
        ]);
    };

    const handleUpdateTask = (nextData: z.infer<typeof TaskFormSchema>) => {
        setItems((prev) =>
            prev.map((task) =>
                task.id === editingId ? { ...task, ...nextData } : task
            )
        );
    };

    const handleEditTask = (id: string) => {
        setIsEditing(true);
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (id: string) => {
        setItems((prev) => [...prev.filter((task) => task.id !== id)]);
    };

    const handleTitleChange = (nextTitle: string) => {
        setTitle(nextTitle);
    };

    const handleSubmit = (data: z.infer<typeof TaskFormSchema>) => {
        if (isEditing) {
            handleUpdateTask(data);
        } else {
            handleCreateTask(data);
        }

        onModalClose();
    };

    useEffect(() => {
        if (titleRef.current !== title) {
            revalidator.revalidate();
            titleRef.current = title;
        }
    }, [title, revalidator]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onModalClose = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingId(null);
    };

    return (
        <DefaultLayout>
            <div
                key={`task_list_${id}`}
                className="flex flex-1 flex-col gap-4 p-4 pt-0"
            >
                <EditableTitle
                    initialTitle={title}
                    onChange={handleTitleChange}
                />
                <Separator className="mt-2 mb-1" />

                <div>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        <Plus />
                        <span>New Task</span>
                    </Button>
                </div>

                {items?.map((task) => (
                    <TaskItem
                        key={task.id}
                        parent={id}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        {...task}
                    />
                ))}

                <Modal
                    isOpen={isModalOpen}
                    onClose={onModalClose}
                    title={isEditing ? "Edit Task" : "Create Task"}
                >
                    <TaskForm
                        onSubmit={handleSubmit}
                        {...(isEditing && {
                            edit: {
                                id: editingId!,
                                payload: (items ?? []).find(
                                    (task) => task.id === editingId
                                ),
                            },
                        })}
                    />
                </Modal>
            </div>
        </DefaultLayout>
    );
}
