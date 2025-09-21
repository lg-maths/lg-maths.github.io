export interface InputClassEl {
  classname: string;
  chapter: number;
  disclaimer: string | null;
}

export interface InputLesson {
  title: string;
  classes: InputClassEl[];
  content: string;
  id: number;
}

export interface InputListLessonsEl {
  id: number;
  title: string;
  classname: string;
  chapter: number;
}

export interface InputListLessons {
  lessons: InputListLessonsEl[];
}