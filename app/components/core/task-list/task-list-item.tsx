import { Task as TaskType } from "./task.type";

interface TaskProps {
    task: TaskType;
    onRemove: (id: string) => void;
    startHour: number;
}

const TaskListItem = ({ task, onRemove, startHour }: TaskProps) => {
    const taskStartHour = task.startTime.getHours();
    const taskStartMinutes = task.startTime.getMinutes();
    const startPosition =
        (((taskStartHour - startHour + 24) % 24) + taskStartMinutes / 60) * 60;
    const duration =
        (task.endTime.getTime() - task.startTime.getTime()) / (1000 * 60 * 60);

    return (
        <div
            className="absolute left-12 right-0 p-2.5 overflow-hidden text-sm bg-blue-200 rounded-sm shadow z-20 border flex flex-col"
            style={{
                top: `${startPosition}px`,
                height: `${duration * 60}px`,
                backgroundColor: task.color || "hsl(var(--color-blue-200))",
                borderColor: task.color || "hsl(var(--color-blue-500))",
                color: task.color || "hsl(var(--color-blue-900))",
            }}
        >
            <div className="font-semibold mb-[auto]">{task.title}</div>
            <div className="text-[10px] leading-none">
                {task.startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}{" "}
                -{" "}
                {task.endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
            <button
                onClick={() => onRemove(task.id)}
                className="absolute top-1 right-1 text-xs text-gray-500 hover:text-gray-700"
            >
                ×
            </button>
        </div>
    );
};

export { TaskListItem };
