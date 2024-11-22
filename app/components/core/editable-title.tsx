"use client";

import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Pencil, Check } from "lucide-react";

interface EditableTitleProps {
    initialTitle?: string;
    onChange?: (title: string) => void;
}

const EditableTitle = ({
    initialTitle = "Default Title",
    onChange,
}: EditableTitleProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsEditing(false);
            onChange?.(title);
        },
        [title, onChange, setIsEditing]
    );

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = useCallback(() => {
        setIsEditing(false);
        onChange?.(title);
    }, [title, onChange]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div
            className="flex items-center gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <form onSubmit={handleSubmit}>
                {isEditing ? (
                    <Input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="text-2xl mr-2"
                    />
                ) : (
                    <h1
                        className="text-2xl font-bold mr-2"
                        onDoubleClick={handleDoubleClick}
                    >
                        {title}
                    </h1>
                )}
            </form>
            <Button
                variant="ghost"
                size="icon"
                onClick={isEditing ? handleSaveClick : handleEditClick}
                aria-label={isEditing ? "Save title" : "Edit title"}
                className={`transition duration-200 ${
                    isEditing || isHovering ? "opacity-100" : "opacity-0"
                }`}
            >
                {isEditing ? (
                    <Check className="h-4 w-4" />
                ) : (
                    <Pencil className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};

export { EditableTitle };
