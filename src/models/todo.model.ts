import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {
      collection: 'todo'
    },
    strictObjectIDCoercion: true,
  }
})
export class Todo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {
      dataType: 'ObjectId',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    mongodb: {
      fieldName: 'title',
    },
  })
  title: string;

  @property({
    type: 'string',
    mongodb: {
      fieldName: 'description',
    },
  })
  description?: string;

  @property({
    type: 'boolean',
    required: true,
    mongodb: {
      fieldName: 'isCompleted',
    },
  })
  isCompleted: boolean;

  @property({
    type: 'date',
    mongodb: {
      fieldName: 'deadline',
    },
  })
  deadline?: string;


  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
