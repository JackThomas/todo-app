import { PlusIcon } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

const TaskCreator = () => {
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxLength = 2000;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value.slice(0, maxLength));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // Handle send action here
            console.log("Sending:", input);
            setInput("");
        }
    };

    const handleAreaClick = () => {
        textareaRef.current?.focus();
    };

    return (
        <div className="w-full mx-auto">
            <div
                className={`relative bg-gray-50 rounded-lg p-4 border ${
                    isFocused ? "border-blue-500" : "border-gray-200"
                } transition-colors duration-200 cursor-text`}
                onClick={handleAreaClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleAreaClick();
                    }
                }}
            >
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent resize-none outline-none min-h-[100px] pr-16 pb-12"
                        placeholder="Add new task..."
                        rows={1}
                        style={{ height: "auto", minHeight: "24px" }}
                    />
                    <div className="absolute right-0 bottom-0 left-0 flex items-center gap-2 ">
                        <Select>
                            <SelectTrigger className="w-[140px] bg-white h-8 text-xs">
                                <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="source1">
                                    Source 1
                                </SelectItem>
                                <SelectItem value="source2">
                                    Source 2
                                </SelectItem>
                                <SelectItem value="source3">
                                    Source 3
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-gray-600 ml-auto"
                            onClick={() => {
                                console.log("Sending:", input);
                                setInput("");
                            }}
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TaskCreator };
