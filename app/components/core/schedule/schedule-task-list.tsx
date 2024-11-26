import { useMemo } from "react";
import { ScheduleTaskItem } from "~/components/core/schedule/schedule-task-item";
import { ScheduleTask } from "~/types/schedule-task.type";

interface ScheduleTaskListProps {
    tasks: ScheduleTask[];
}

const ScheduleTaskList = ({ tasks }: ScheduleTaskListProps) => {
    const startHour = 0;
    const endHour = 24;

    // Convert time string to minutes since start of day
    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    // Convert minutes to percentage of schedule height
    const minutesToPercent = (minutes: number) => {
        const totalMinutes = (endHour - startHour) * 60;
        const relativeMinutes = minutes - startHour * 60;
        return (relativeMinutes / totalMinutes) * 100;
    };

    // Calculate event height and position
    const getEventStyle = (event: ScheduleTask) => {
        const startMinutes = timeToMinutes(event.start);
        const endMinutes = timeToMinutes(event.end);
        const top = minutesToPercent(startMinutes);
        const height = minutesToPercent(endMinutes) - top;

        return {
            top: `${layout[event.id]?.top || top}%`,
            height: `calc(${height}% - 1px)`,
            left: `${layout[event.id]?.left || 0}%`,
            width: `${layout[event.id]?.width || 100}%`,
        };
    };

    // Calculate overlapping events
    const layout = useMemo(() => {
        const calculateLayout = () => {
            const newLayout: {
                [key: string]: { left: number; width: number; top: number };
            } = {};

            // Sort events by start time and then by end time
            const sortedEvents = [...tasks].sort((a, b) => {
                const startDiff =
                    timeToMinutes(a.start) - timeToMinutes(b.start);
                if (startDiff === 0) {
                    return timeToMinutes(a.end) - timeToMinutes(b.end);
                }
                return startDiff;
            });

            // Group overlapping events
            const eventGroups: ScheduleTask[][] = [];
            sortedEvents.forEach((event) => {
                const overlappingGroup = eventGroups.find((group) =>
                    group.some(
                        (groupEvent) =>
                            timeToMinutes(event.start) <
                                timeToMinutes(groupEvent.end) &&
                            timeToMinutes(event.end) >
                                timeToMinutes(groupEvent.start)
                    )
                );

                if (overlappingGroup) {
                    overlappingGroup.push(event);
                } else {
                    eventGroups.push([event]);
                }
            });

            // New function to calculate layout for each group
            const calculateGroupLayout = (group: ScheduleTask[]) => {
                const timeSlots = new Map<string, ScheduleTask[]>();

                group.forEach((event) => {
                    const [startHour, startMinute] = event.start
                        .split(":")
                        .map(Number);
                    const [endHour, endMinute] = event.end
                        .split(":")
                        .map(Number);

                    // Create 15-minute intervals for checking overlaps
                    const start = startHour * 60 + startMinute;
                    const end = endHour * 60 + endMinute;

                    for (let time = start; time < end; time += 15) {
                        const timeKey = `${Math.floor(time / 60)}:${(time % 60)
                            .toString()
                            .padStart(2, "0")}`;
                        if (!timeSlots.has(timeKey)) {
                            timeSlots.set(timeKey, []);
                        }

                        timeSlots.get(timeKey)?.push(event);
                    }
                });

                const timeSlotLengths = [...timeSlots.values()].map(
                    (value) => value.length
                );
                const groupSize = Math.max(...timeSlotLengths);

                // const groupSize = group.length;
                const columnWidth = 100 / groupSize;

                // Sort the group by start time
                group.sort(
                    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
                );

                // Initialize columns
                const columns: ScheduleTask[][] = Array.from(
                    { length: groupSize },
                    () => []
                );

                group.forEach((event) => {
                    // Find the first available column
                    const columnIndex = columns.findIndex(
                        (column) =>
                            !column.some(
                                (columnEvent) =>
                                    timeToMinutes(event.start) <
                                        timeToMinutes(columnEvent.end) &&
                                    timeToMinutes(event.end) >
                                        timeToMinutes(columnEvent.start)
                            )
                    );

                    if (columnIndex !== -1) {
                        columns[columnIndex].push(event);
                    } else {
                        // If no column is available, add to the last column
                        columns[columns.length - 1].push(event);
                    }
                });

                // Calculate layout for each event
                columns.forEach((column, columnIndex) => {
                    column.forEach((event) => {
                        newLayout[event.id] = {
                            left: columnIndex * columnWidth,
                            width: columnWidth,
                            top: minutesToPercent(timeToMinutes(event.start)),
                        };
                    });
                });
            };

            // Calculate layout for each group
            eventGroups.forEach(calculateGroupLayout);

            return newLayout;
        };

        return calculateLayout();
    }, [tasks]);

    return (
        <div className="absolute inset-y-0 left-16 right-0">
            {tasks.map((task) => {
                const { id } = task;
                const style = getEventStyle(task);

                return (
                    <ScheduleTaskItem
                        key={id}
                        {...task}
                        positionStyles={style}
                    />
                );
            })}
        </div>
    );
};

export { ScheduleTaskList };
