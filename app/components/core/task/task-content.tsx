import { ReactNode } from "react";

interface TaskContentProps {
    children: ReactNode;
}

const TaskContent = ({ children }: TaskContentProps) => {
    return (
        <div className="grid gap-3 leading-none grow pt-[1px]">{children}</div>
    );
};

export { TaskContent };
