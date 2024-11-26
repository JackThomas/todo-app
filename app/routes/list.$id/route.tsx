import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { UIMatch, useLoaderData, useRevalidator } from "@remix-run/react";
import { useAtom } from "jotai";
import { PaletteIcon, PlusIcon, StarIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ColorSelector } from "~/components/core/color-selector";
import { EditableTitle } from "~/components/core/editable-title";
import { Modal } from "~/components/core/modal";
import { TaskForm, TaskFormSchema } from "~/components/core/task-form";
import { TaskCreator } from "~/components/core/task/task-creator";
import { TaskList } from "~/components/core/task/task-list";
import { TaskListPlaceholder } from "~/components/core/task/task-list-placeholder";
import { DefaultLayout } from "~/components/layout/default-layout";
import { Button } from "~/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { getList } from "~/helpers/getTodos";
import { useListState } from "~/hooks/use-list-state";

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

// export function HydrateFallback() {
//     return <p>Loading Game...</p>;
// }

export default function Index() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const revalidator = useRevalidator();

    const data = useLoaderData<typeof clientLoader>();
    const id = data?.id ?? "";

    const { titleAtom, itemsAtom, isFeaturedAtom, colorAtom } =
        useListState(id);

    const [title, setTitle] = useAtom(titleAtom);
    const titleRef = useRef(title);
    const [items, setItems] = useAtom(itemsAtom);
    const [isFeatured, setIsFeatured] = useAtom(isFeaturedAtom);
    const [color, setColor] = useAtom(colorAtom);
    const colorName = color?.name ?? "slate";

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const onModalClose = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingId(null);
    };

    const handleOnFeatured = () => {
        setIsFeatured((prev) => (prev ? !prev : true));
    };

    // TODO: Add a way to delete the list
    // TODO: Refactor adding a list to use a form LLM style
    // TODO: Add animation for item creation/deletion
    // TODO: Tidy up the UI
    // TODO: Add 404 page for invalid list id

    return (
        <DefaultLayout>
            <div
                key={`task_list_${id}`}
                className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full max-w-4xl mx-auto"
            >
                <EditableTitle
                    initialTitle={title}
                    onChange={handleTitleChange}
                />

                <Separator className="mt-2 mb-1" />

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleOnFeatured}
                        title="Toggle featured"
                    >
                        <StarIcon
                            fill={
                                isFeatured
                                    ? "hsl(var(--color-yellow-400))"
                                    : "hsl(var(--color-slate-200))"
                            }
                            stroke={
                                isFeatured
                                    ? "hsl(var(--color-yellow-400))"
                                    : "hsl(var(--color-slate-200))"
                            }
                            className="transition"
                        />
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                size="icon"
                                className="aspect-square"
                                style={{
                                    background: `hsl(var(--color-${colorName}-600))`,
                                }}
                            >
                                <PaletteIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60">
                            <ColorSelector onChange={setColor} />
                        </PopoverContent>
                    </Popover>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        title="Create new task"
                    >
                        <PlusIcon />
                        <span>New Task</span>
                    </Button>
                </div>

                {items?.length === 0 && <TaskListPlaceholder />}

                {items && items.length > 0 && (
                    <TaskList
                        id={id}
                        items={items}
                        onUpdateItems={setItems}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                    />
                )}
                <TaskCreator />

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
                                payload: {
                                    ...(items ?? []).find(
                                        (task) => task.id === editingId
                                    )!,
                                },
                            },
                        })}
                    />
                </Modal>
            </div>
        </DefaultLayout>
    );
}
