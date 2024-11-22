import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type Color, ColorSelector } from "../color-selector";

interface Tag {
    id: string;
    label: string;
    color?: Color;
}

interface TagInputProps {
    tags?: Tag[];
    setTags: (tags: Tag[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState<Color | undefined>();

    const handleDelete = (id: string) => {
        setTags((tags ?? []).filter((tag) => tag?.id != id));
    };

    const createTag = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (title.trim()) {
                const nextTag: Tag = {
                    id: `${Date.now()}`,
                    label: title.trim(),
                    color,
                };
                setTags([...(tags ?? []), nextTag]);
                setTitle("");
                setColor(undefined);
            }
        },
        [title, color, tags, setTags]
    );

    return (
        <>
            <div>
                <Label htmlFor="title">Tag Title</Label>
                <Input
                    id="label"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter tag title"
                />
            </div>
            <div>
                <Label htmlFor="color">Tag Color</Label>
                <div className="flex items-center space-x-2">
                    <ColorSelector onChange={setColor} />
                </div>
            </div>
            <Button onClick={createTag} className="w-full">
                Add Tag
            </Button>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Created Tags:</h3>
                <div className="space-y-2">
                    {(tags ?? []).map((tag) => (
                        <div
                            key={tag.id}
                            className="flex items-center justify-between p-2 bg-gray-100 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-6 h-6 rounded"
                                    style={{
                                        backgroundColor: tag.color?.hex,
                                    }}
                                ></div>
                                <span>{tag.label}</span>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(tag.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export { TagInput };
