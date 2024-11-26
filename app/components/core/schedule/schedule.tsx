import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { CurrentTimeIndicator } from "~/components/core/schedule/current-time-indicator";
import { ScheduleTaskList } from "~/components/core/schedule/schedule-task-list";
import { TimeSlots } from "~/components/core/schedule/time-slots";
import {
    cloneScrollPosition,
    getCurrentTimePosition,
} from "~/components/core/schedule/utils";
import { useTodosState } from "~/hooks/use-todos-state";
import { ScheduleTask } from "~/types/schedule-task.type";

export function Schedule() {
    const { getTodaysTasksAtom } = useTodosState();
    const lists = useAtomValue(getTodaysTasksAtom);

    const tasks = lists.reduce<ScheduleTask[]>((acc, list) => {
        const parent = list.id;
        const color = list.color;

        const items = list.items
            .filter((item) => item.timeRange !== undefined)
            .map((item) => {
                const { id, title } = item;
                const { start, end } = item.timeRange!;

                return {
                    parent,
                    id,
                    title,
                    start,
                    end,
                    color,
                };
            });
        return [...acc, ...items];
    }, []);

    const scrollMainRef = useRef<HTMLDivElement>(null);
    const scrollFollowerRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState(getCurrentTimePosition());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTimePosition());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (scrollMainRef.current) {
            const scrollPosition = (currentTime.position / 100) * 1440 - 300; // Center the current time
            scrollMainRef.current.scrollTop = scrollPosition;
        }
    }, [currentTime.position, currentTime.currentTime]);

    return (
        <div className="container relative flex mx-auto">
            <div
                onScroll={() =>
                    cloneScrollPosition(
                        scrollFollowerRef.current,
                        scrollMainRef.current
                    )
                }
                ref={scrollFollowerRef}
                className="w-14 overflow-auto no-scrollbar"
            >
                <div className="relative h-[600px] ">
                    <div className="w-full absolute inset-x-0 h-[1440px]">
                        <div>
                            <div
                                className="absolute bg-red-500 text-white text-[10px] py-1 px-2 rounded-full"
                                style={{
                                    top: `${currentTime.position}%`,
                                    transform: "translateY(-12px)",
                                }}
                            >
                                {currentTime.currentTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onScroll={() =>
                    cloneScrollPosition(
                        scrollMainRef.current,
                        scrollFollowerRef.current
                    )
                }
                ref={scrollMainRef}
                className="w-full mx-auto bg-white rounded-sm border border-gray-200 overflow-auto"
            >
                <div className="relative h-[600px] overflow-x-visible ">
                    <div className="absolute inset-x-0 h-[1440px]">
                        <TimeSlots />
                        <CurrentTimeIndicator
                            position={currentTime.position}
                            time={currentTime.currentTime}
                        />
                        <ScheduleTaskList tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
