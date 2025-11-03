export interface List {
  title: string;
  subtitle: string;
  date: string;
  id: number;
}
export type ShowList=List[]
export interface newDataProps {
  title: string;
  subtitle: string;
}

export interface FormProps {
  id?: number;
  initialValues?: newDataProps;
}