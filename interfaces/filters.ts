import { Course } from '@/interfaces/courses';

export interface Filters {
  query?: (course: Course) => boolean;
  date?: (course: Course) => boolean;
}
