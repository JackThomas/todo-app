import { cn } from "~/lib/utils";

const Logo = () => (
    <div className="flex">
        <div
            className={cn(
                "bg-black text-white text-[18px] h-[30px] font-semibold rounded-[4px] px-2 py-2 leading-[1.1] shrink-0 flex items-center gap-[8px]"
            )}
        >
            <span>Todo</span>
            <span
                className={cn(
                    "bg-white text-black text-[10px] rounded-[2px] px-[3px] pt-[1px] font-bold uppercase"
                )}
            >
                List
            </span>
        </div>
    </div>
);

export { Logo };
