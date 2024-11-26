import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { TaskContent } from "~/components/core/task/task-content";
import { TaskDate } from "~/components/core/task/task-date";
import { TaskMenu } from "~/components/core/task/task-menu";
import { TaskTags } from "~/components/core/task/task-tags";
import { TaskTitle } from "~/components/core/task/task-title";
import { TaskWrapper } from "~/components/core/task/task-wrapper";
import { Checkbox } from "~/components/ui/checkbox";
import { useItemState } from "~/hooks/use-item-state";

interface TaskItemProps {
    parent: string;
    id: string;
    title: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem = ({ parent, id, title, onEdit, onDelete }: TaskItemProps) => {
    const { isCompleteAtom, dateAtom, timeRangeAtom, tagsAtom } = useItemState(
        parent,
        id
    );

    const [isComplete, setIsComplete] = useAtom(isCompleteAtom);
    const date = useAtomValue(dateAtom);
    const timeRange = useAtomValue(timeRangeAtom);
    const tags = useAtomValue(tagsAtom);

    const handleOnComplete = () => {
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
                    onCheckedChange={handleOnComplete}
                    checked={isComplete}
                />

                <TaskContent>
                    <TaskTitle id={id} isComplete={isComplete} title={title} />

                    {date && (
                        <TaskDate
                            date={date}
                            timeRange={timeRange}
                            isComplete={isComplete}
                        />
                    )}

                    {tags && <TaskTags tags={tags} />}
                </TaskContent>
            </div>

            <div className="ml-auto">
                <TaskMenu onDelete={handleDelete} onEdit={handleEdit} />
            </div>
        </TaskWrapper>
    );
};

export { TaskItem };
