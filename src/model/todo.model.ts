export enum TodoCat {
  BE = 'BE',
  FE = 'FE',
}

export class TodoDto {
  id: string;
  // tslint:disable-next-line: variable-name
  _id: string;
  completed: boolean;
  todo: string;
}
