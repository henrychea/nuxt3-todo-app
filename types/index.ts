export interface iBaseTodo {
  title: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
    description: string;
    dueDate: string;
}
export interface iTodo extends iBaseTodo {
  id: number;
}
  