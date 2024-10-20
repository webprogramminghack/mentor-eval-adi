export interface todoHttpData{
    id:string,
    title:string,
    todo:string,
    completed:boolean,
    date:Date
}

export interface createTodoHttpData{
    title:string,
    completed:boolean
}

export interface updateTodoHttpData{
    title:string,
    completed:boolean
}

export interface TodoResponse {
    todos: todoHttpData[]; // Array of Todo items
    hasNextPage: boolean;
    nextPage?: number; // Optional if not always present
}