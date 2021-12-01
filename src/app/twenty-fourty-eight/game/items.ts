export interface Item{
  value:number;
  row: number;
  col:number;
  //isOnDelete:boolean; //эл-т должен быть удален на сл.цикле, если true
  //при записи выше - isOnDelete - обязательный параметр
  isOnDelete?:boolean;//необязательный параметр
}
