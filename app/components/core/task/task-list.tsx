import type {
    DraggableProvided,
    DroppableProvided,
    DropResult,
} from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { memo, ReactElement } from "react";
import { TaskItem } from "~/components/core/task/task-item";
import { reorder } from "~/helpers/reorder";
import { ItemType } from "~/types/list.type";

interface TaskListProps {
    id: string;
    items: ItemType[];
    onUpdateItems: (items: ItemType[]) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface DraggableTaskItemProps {
    parent: string;
    item: ItemType;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    index: number;
}

const DraggableTaskItem = ({
    parent,
    item,
    onEdit,
    onDelete,
    index,
}: DraggableTaskItemProps) => {
    const { id } = item;

    return (
        <Draggable draggableId={id} index={index}>
            {(provided: DraggableProvided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                >
                    <TaskItem
                        parent={parent}
                        {...item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            )}
        </Draggable>
    );
};

const TaskList = (props: TaskListProps) => {
    const { id, items, onEdit, onDelete } = props;
    return items.map((item: ItemType, index: number) => (
        <DraggableTaskItem
            key={item.id}
            parent={id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
        />
    ));
};

// Ensuring the whole list does not re-render when the droppable re-renders
const TaskListMemo = memo<TaskListProps>(TaskList);

function TaskListDraggable(props: TaskListProps): ReactElement {
    const { items, onUpdateItems } = props;

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const nextItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        onUpdateItems(nextItems);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <TaskListMemo {...props} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export { TaskListDraggable as TaskList };
