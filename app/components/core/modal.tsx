import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

const Modal = ({ children, title, isOpen, onClose }: ModalProps) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]" onClose={onClose}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export { Modal };
