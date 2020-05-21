export enum TodoCat {
  BE = 'BE',
  FE = 'FE',
}

export class TodoDto {
  id: number;
  completed: string;
  todo: string;
}
