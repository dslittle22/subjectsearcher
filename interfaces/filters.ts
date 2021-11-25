import { Course } from '@/interfaces/courses'

export interface Filters {
    queryFilter?: (course: Course) => boolean
  }