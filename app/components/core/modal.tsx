import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    title: string;
}

const modalVariants = cva("sm:max-w-[425px]");

const Modal = ({ children, title, isOpen, onClose, className }: ModalProps) => (
    <Dialog open={isOpen}>
        <DialogContent
            className={cn(modalVariants(), className)}
            onClose={onClose}
        >
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
);

export { Modal };
