import { InputExercice } from "./lessons-inputs.model";

export interface LessonToDisplay {
	id: number;
	title: string;
	classname: string;
	content: string;
	disclaimer?: string;
	exercices?: InputExercice[];
}