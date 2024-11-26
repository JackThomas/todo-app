interface TaskTitleProps {
    id: string;
    isComplete?: boolean;
    title: string;
}

const TaskTitle = ({ id, isComplete, title }: TaskTitleProps) => {
    return (
        <div>
            <div className="relative inline-block">
                <label
                    htmlFor={`task_${id}`}
                    className={`peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        isComplete ? "opacity-50" : ""
                    }`}
                >
                    {title}
                </label>

                <span
                    className={`absolute inset-0 flex opacity-70 items-center transition-all duration-500 ease-in-out overflow-hidden pointer-events-none ${
                        isComplete ? "w-full" : "w-0"
                    }`}
                    aria-hidden="true"
                >
                    <span className="h-[2px] w-full bg-current"></span>
                </span>
            </div>
        </div>
    );
};

export { TaskTitle };
