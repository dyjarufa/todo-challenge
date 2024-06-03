import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const todoSchema = z.object({
  description: z.string().min(1, "Todo description is required"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export const useTodoForm = (addTodo: (description: string) => void) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit: SubmitHandler<TodoFormValues> = ({ description }) => {
    addTodo(description);
    reset();
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
