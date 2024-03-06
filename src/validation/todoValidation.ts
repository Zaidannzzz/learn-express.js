export const validateTodo = (data: any) => {
  console.log("=> masuk validateTodo");

  const { title, description, dueDate, isProgress, isCompleted } = data;

  if (!title || typeof title !== "string") {
    return "Invalid or missing title field";
  }

  if (!description || typeof description !== "string") {
    return "Invalid or missing description field";
  }

  if (!isProgress && typeof isProgress !== "boolean") {
    return "Invalid or missing isProgress field";
  }

  if (!isCompleted && typeof isCompleted !== "boolean") {
    return "Invalid or missing isCompleted field";
  }
};
