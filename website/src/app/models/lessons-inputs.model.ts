export interface InputExercice {
  id: number;
  statement: string;
  solution: string;
}

export interface InputClassEl {
  classname: string;
  chapter: number;
  disclaimer: string | null;
  content?: string;
}

export interface InputLesson {
  title: string;
  classes: InputClassEl[];
  content: string;
  id: string;
  exercises: InputExercice[];
}

export interface InputListLessonsEl {
  id: string;
  title: string;
  classname: string;
  chapter: number;
}

export interface InputListLessons {
  lessons: InputListLessonsEl[];
  classes_sorted: string[];
}