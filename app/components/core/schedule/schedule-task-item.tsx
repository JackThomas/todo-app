import { useAtom } from "jotai";
import { ClockIcon } from "lucide-react";
import { Color } from "~/components/core/color-selector";
import { Checkbox } from "~/components/ui/checkbox";
import { useItemState } from "~/hooks/use-item-state";

interface ScheduleTaskItemProps {
    positionStyles: React.CSSProperties;
    parent: string;
    id: string;
    title: string;
    start: string;
    end: string;
    color?: Color;
}

const ScheduleTaskItem = ({
    positionStyles,
    parent,
    id,
    title,
    start,
    end,
    color,
}: ScheduleTaskItemProps) => {
    console.log({ color });
    const { isCompleteAtom } = useItemState(parent, id);
    const [isComplete, setIsComplete] = useAtom(isCompleteAtom);
    const colorName = color?.name ?? "slate";

    const handleOnComplete = () => {
        setIsComplete((prev) => !prev);
    };

    return (
        <div
            className="absolute left-0 right-0 transition-all duration-200"
            style={positionStyles}
        >
            <div className="relative h-full mx-1">
                <div
                    className="relative h-full rounded-sm pl-[2px] transition-colors overflow-hidden"
                    style={{
                        background: `hsl(var(--color-${colorName}-100))`,
                    }}
                >
                    <div
                        className="absolute left-0 top-0 bottom-0 w-[2px] z-[3]"
                        style={{
                            background: `hsl(var(--color-${colorName}-500))`,
                        }}
                    />
                    <div className="flex p-2 gap-2">
                        <div className="flex pt-[2px]">
                            <Checkbox
                                checked={isComplete}
                                onCheckedChange={handleOnComplete}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3
                                className="font-medium text-sm"
                                style={{
                                    color: `hsl(var(--color-${colorName}-900))`,
                                }}
                            >
                                {title}
                            </h3>
                            <p
                                className="flex items-center text-xs gap-1"
                                style={{
                                    color: `hsl(var(--color-${colorName}-700))`,
                                }}
                            >
                                <ClockIcon className="w-3 h-3" />
                                {start} – {end}
                            </p>
                        </div>
                    </div>

                    <div
                        className="absolute left-0 right-0 bottom-0 h-[15px] z-[2] bg-gradient-to-t"
                        style={
                            {
                                "--tw-gradient-from": `hsl(var(--color-${colorName}-100))`,
                                "--tw-gradient-to": "rgb(255 255 255 / 0)",
                                "--tw-gradient-stops":
                                    "var(--tw-gradient-from), var(--tw-gradient-to)",
                            } as React.CSSProperties
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export { ScheduleTaskItem };
