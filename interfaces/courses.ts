export interface Courses {
  courses: Course[];
}

export interface Course {
  crn:          string;
  subj:         string;
  subj_desc:    string;
  dept?:         string;
  dept_desc?:    string;
  sect:         string;
  num:          string;
  title:        string;
  term?:         string;
  credit:       string;
  originsubj?:   string;
  originnum?:    string;
  comment?:      string;
  crosslisting?: Crosslisting[];
  lab:          string;
  distrib:      Curricular[];
  designation:  Curricular[];
  curricular:   Curricular[];
  description:  string;
  rules:        Rules;
  prefmajors?:  Prefm[];
  prefminors?:  Prefm[];
  addlmajmin?:  any[];
  seats:        Seats;
  meetings:     Meetings;
}

export interface Crosslisting {
  subj: string;
  num:  string;
}

export interface Curricular {
  id:   string;
  text: string;
}

export interface Meetings {
  classes: Class[];
  exam:    any[];
}

export interface Class {
  location:    string;
  time:        string;
  schedule:    string;
  instructors: Instructor[];
  date:        string;
}

export interface Instructor {
  id:        string;
  firstname: string;
  lastname:  string;
  middle:    string;
}

export interface Prefm {
  code: string;
  desc: string;
}

export interface Rules {
  permission:   string;
  mmrest?:       string;
  standingrest: string;
  exclusion:    any[];
  prereq:       string;
  coreq?:        string;
  equivalent?:   Equivalent[];
  springpref:   string | undefined;
  fallpref:   string | undefined;
  concurr_preq: string;
  priority:     string;
}

export interface Equivalent {
  equivalent: string;
}

export interface Seats {
  capacity:  number;
  actual:    number;
  remaining: number;
  pending:   number;
  reserved:  number;
  closed:    string;
}