import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateInput } from "~/components/core/input/date-input";
import { TagInput } from "~/components/core/input/tag-input";
import { TimeRangeInput } from "~/components/core/input/time-range-input";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

export const TaskFormSchema = z.object({
    title: z.string().min(2, {
        message: "Task must be at least 2 characters.",
    }),
    date: z.date().optional(),
    timeRange: z
        .object({
            start: z.string(),
            end: z.string(),
        })
        .optional(),
    tags: z
        .array(
            z.object({
                id: z.string(),
                label: z.string(),
                color: z
                    .object({
                        name: z.string(),
                        hex: z.string(),
                    })
                    .optional(),
            })
        )
        .optional(),
});

interface TaskFormProps {
    onSubmit: (data: z.infer<typeof TaskFormSchema>) => void;
    edit?: {
        id: string;
        payload?: z.infer<typeof TaskFormSchema>;
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Due</FormLabel>
                            <DateInput
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="timeRange"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <TimeRangeInput
                                value={field.value}
                                onChange={field.onChange}
                            />
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
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />
                <div className="flex gap-2 justify-end">
                    {/* <Button variant="outline" size="lg" type="cancel"> */}
                    {/* Cancel */}
                    {/* </Button> */}
                    <Button size="lg" type="submit">
                        {isEditing ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
