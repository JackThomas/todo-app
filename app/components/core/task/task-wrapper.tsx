import { ReactNode } from "react";

interface TaskWrapperProps {
    children: ReactNode;
}

const TaskWrapper = ({ children }: TaskWrapperProps) => {
    return (
        <div className="rounded-md border p-3 bg-white">
            <div className="flex items-top space-x-2">{children}</div>
        </div>
    );
};

export { TaskWrapper };
