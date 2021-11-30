import { Course } from '@/interfaces/courses';
import { type } from 'os';

export interface Filters {
  query?: (course: Course) => boolean;
  date?: (course: Course) => boolean;
}

export type QueryDropdown = 'title' | 'professor'