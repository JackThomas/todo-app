import { cn } from "~/lib/utils";

const TimeSlots = () => {
    const hours = Array.from({ length: 24 }, (_, i) => {
        return `${i.toString().padStart(2, "0")}:00`;
    });

    return (
        <div className="absolute inset-0 flex flex-col">
            {hours.map((hour, index) => (
                <div key={hour} className={cn("h-[60px] relative")}>
                    <span
                        className={`absolute w-full h-[60px] border-gray-100 text-xs text-gray-500 p-2 ${
                            index !== 0 ? "border-t-[1px]" : ""
                        }`}
                    >
                        {hour}
                    </span>
                </div>
            ))}
        </div>
    );
};

export { TimeSlots };
