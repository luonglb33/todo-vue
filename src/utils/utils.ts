import type { Todo } from '../models/Todo';
import { categoryList } from '../constants/constants';
export const filterTodoHandler = (list: Todo[], category: string) => {
  switch (category) {
    case categoryList.ACTIVE:
      return list.filter((item) => !item.isCompleted);
    case categoryList.COMPLETED:
      return list.filter((item) => item.isCompleted);
    default:
      return list;
  }
};
