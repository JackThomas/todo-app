import { useEffect, useState } from "react";
import { TaskListItem as TaskComponent } from "./task-list-item";
import { Task } from "./task.type";
import { useTasks } from "./useTasks";

const HOURS_TO_DISPLAY = 8; // Number of hours to display in the view

const TaskList = () => {
    const { tasks, addTask, removeTask } = useTasks();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [startHour, setStartHour] = useState(
        Math.floor(currentTime.getHours())
    );

    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = new Date();
            setCurrentTime(newTime);
            setStartHour(Math.floor(newTime.getHours()));
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const handleAddTask = () => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: "New Task",
            startTime: new Date(
                new Date().setHours(
                    startHour + Math.floor(Math.random() * HOURS_TO_DISPLAY),
                    0,
                    0,
                    0
                )
            ),
            endTime: new Date(
                new Date().setHours(
                    startHour + Math.floor(Math.random() * HOURS_TO_DISPLAY),
                    0,
                    0,
                    0
                )
            ),
        };

        // Ensure endTime is after startTime
        if (newTask.endTime <= newTask.startTime) {
            newTask.endTime = new Date(
                newTask.startTime.getTime() + 60 * 60 * 1000
            ); // Add 1 hour
        }

        addTask(newTask);
    };

    const visibleHours = Array.from(
        { length: HOURS_TO_DISPLAY },
        (_, i) => (startHour + i) % 24
    );
    const currentTimePosition =
        (((currentTime.getHours() - startHour + 24) % 24) +
            currentTime.getMinutes() / 60) *
        60;

    const visibleTasks = tasks.filter((task) => {
        const taskStartHour = task.startTime.getHours();
        return (
            taskStartHour >= startHour &&
            taskStartHour < startHour + HOURS_TO_DISPLAY
        );
    });

    return (
        <div className="container mx-auto p-4 pt-0 relative pl-14">
            <div className="relative border border-gray-200 h-[480px] rounded-sm">
                {/* 8 hours * 60 pixels per hour */}
                {visibleHours.map((hour, index) => (
                    <div
                        key={hour}
                        className={`absolute w-full h-[60px] border-gray-100 text-xs text-gray-500 p-2 ${
                            index !== 0 ? "border-t-[1px]" : ""
                        }`}
                        style={{ top: `${index * 60}px` }}
                    >
                        {hour}:00
                    </div>
                ))}
                {visibleTasks.map((task) => (
                    <TaskComponent
                        key={task.id}
                        task={task}
                        onRemove={removeTask}
                        startHour={startHour}
                    />
                ))}
                {currentTimePosition >= 0 &&
                    currentTimePosition < HOURS_TO_DISPLAY * 60 && (
                        <div
                            className="absolute left-0 right-0 border-t-2 border-red-500 z-10"
                            style={{ top: `${currentTimePosition}px` }}
                        >
                            <div className="absolute -top-3 -left-14 bg-red-500 text-white text-[10px] py-1 px-2 rounded-full">
                                {currentTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    )}
            </div>

            <button
                onClick={handleAddTask}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Random Task
            </button>
        </div>
    );
};

export { TaskList };
