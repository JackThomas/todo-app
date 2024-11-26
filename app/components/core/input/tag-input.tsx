import { PaletteIcon, PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { ColorSelector, type Color } from "~/components/core/color-selector";
import { Tag } from "~/components/core/tag";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { TagType } from "~/types/tag.type";

interface TagInputProps {
    value?: TagType[];
    onChange: (tags: TagType[]) => void;
}

const TagInput = ({ value, onChange }: TagInputProps) => {
    const tags = useMemo(() => value ?? [], [value]);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState<Color | undefined>();
    const colorName = color?.name ?? "slate";

    const handleDelete = (id: string) => {
        const nextTags = (tags ?? []).filter((tag) => tag.id !== id);
        onChange(nextTags);
    };

    const createTag = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (title.trim()) {
                const nextTag: TagType = {
                    id: `${Date.now()}`,
                    label: title.trim(),
                    color,
                };
                onChange([...(tags ?? []), nextTag]);
                setTitle("");
                setColor(undefined);
            }
        },
        [title, color, tags, onChange]
    );

    return (
        <>
            <div className="flex gap-2">
                <Input
                    id="label"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Label"
                />

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            size="icon"
                            className="aspect-square"
                            style={{
                                background: `hsl(var(--color-${colorName}-600))`,
                            }}
                        >
                            <PaletteIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                        <ColorSelector onChange={setColor} />
                    </PopoverContent>
                </Popover>
                <Button
                    size="icon"
                    onClick={createTag}
                    className="aspect-square"
                >
                    <PlusIcon />
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                    <Tag key={tag.id} {...tag} onDelete={handleDelete} />
                ))}
            </div>
        </>
    );
};

export { TagInput };
