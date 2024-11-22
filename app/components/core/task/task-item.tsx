import { useAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useCallback, useMemo } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { todosAtom } from "~/state/todos.state";
import { TaskContent } from "./task-content";
import { TaskDate } from "./task-date";
import { TaskMenu } from "./task-menu";
import { TaskTags } from "./task-tags";
import { TaskTitle } from "./task-title";
import { TaskWrapper } from "./task-wrapper";

interface TaskItemProps {
    parent: string;
    id: string;
    title: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem = ({ parent, id, title, onEdit, onDelete }: TaskItemProps) => {
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

    const itemCompleteAtom = useMemo(
        () =>
            focusAtom(itemAtom, (optic) => optic.optional().prop("completed")),
        [itemAtom]
    );

    const itemDueDateAtom = useMemo(
        () => focusAtom(itemAtom, (optic) => optic.optional().prop("dueDate")),
        [itemAtom]
    );

    const itemTagsAtom = useMemo(
        () => focusAtom(itemAtom, (optic) => optic.optional().prop("tags")),
        [itemAtom]
    );

    const [isComplete, setIsComplete] = useAtom(itemCompleteAtom);
    const dueDate = useAtomValue(itemDueDateAtom);
    const tags = useAtomValue(itemTagsAtom);

    const handleOnChange = () => {
        setIsComplete((prev) => !prev);
    };

    const handleDelete = useCallback(() => {
        onDelete(id);
    }, [onDelete, id]);

    const handleEdit = useCallback(() => {
        onEdit(id);
    }, [onEdit, id]);

    return (
        <TaskWrapper>
            <div className="flex items-top space-x-4 grow p-[0.35rem]">
                <Checkbox
                    id={`task_${id}`}
                    onCheckedChange={handleOnChange}
                    checked={isComplete}
                />

                <TaskContent>
                    <TaskTitle id={id} isComplete={isComplete} title={title} />

                    {dueDate && (
                        <TaskDate date={dueDate} isComplete={isComplete} />
                    )}

                    {tags && <TaskTags tags={tags} />}
                </TaskContent>
            </div>

            <div className="ml-[auto]">
                <TaskMenu onDelete={handleDelete} onEdit={handleEdit} />
            </div>
        </TaskWrapper>
    );
};

export { TaskItem };
