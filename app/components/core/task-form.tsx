import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { TagInput } from "./input/tag-input";

export const TaskFormSchema = z.object({
    title: z.string().min(2, {
        message: "Task must be at least 2 characters.",
    }),
    dueDate: z.date().optional(),
    tags: z
        .array(
            z.object({
                id: z.string(),
                label: z.string(),
                color: z.object({
                    name: z.string(),
                    hex: z.string(),
                }),
            })
        )
        .optional(),
});

interface TaskFormProps {
    onSubmit: (data: z.infer<typeof TaskFormSchema>) => void;
    edit?: {
        id: string;
        payload: z.infer<typeof TaskFormSchema>;
    };
}

export function TaskForm({ onSubmit, edit }: TaskFormProps) {
    const isEditing = edit?.id !== undefined;
    const payload = edit?.payload;

    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: payload ?? {
            title: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Task..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Due date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tags</FormLabel>
                            <TagInput
                                tags={field.value}
                                setTags={field.onChange}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{isEditing ? "Save" : "Create"}</Button>
            </form>
        </Form>
    );
}
