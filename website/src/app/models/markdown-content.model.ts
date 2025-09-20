export enum AcademicLevel {
  SIXIEME = '6e',
  CINQUIEME = '5e',
  QUATRIEME = '4e',
  TROISIEME = '3e',
  SECONDE = '2d',
  PREMIERE = '1e',
  TERMINALE = 'Te'
}

export interface MarkdownContent {
  title: string;
  content: string;
  level?: AcademicLevel;
}