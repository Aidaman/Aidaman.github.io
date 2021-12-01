export const Columns = 10;
export const Rows = 20;
export const BlockSize = 30;
export const LinesPerLevel = 10;

export class Key {
  static readonly Esc = 27;
  static readonly Space = 32;
  static readonly Left = 37;
  static readonly Up = 38;
  static readonly Right = 39;
  static readonly Down = 40;
}

export const Colors = [
  '#CO5COE',
  '#F7E2AB',
  '#C6871E',
  '#28394D',
  '#B19490',
  '#d36718',
  '#C23d2A',
  '#333333'
];

export const Shapes = [
  [ [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],

  [ [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]],

  [ [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]],

  [ [4, 4],
    [4, 4]],

  [ [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]],

  [ [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]],

  [ [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]]

];

export class Points {
  static readonly Single = 100;
  static readonly Double = 300;
  static readonly Triple = 500;
  static readonly Tetris = 800;
  static readonly SoftDrop = 1;
  static readonly HardDop = 2;
}
export class SpidLevel {
  static readonly 0 = 800;
  static readonly 1 = 720;
  static readonly 2 = 630;
  static readonly 3 = 550;
  static readonly 4 = 470;
  static readonly 5 = 380;
  static readonly 6 = 300;
  static readonly 7 = 220;
  static readonly 8 = 130;
  static readonly 9 = 100;
  static readonly 10 = 80;
  static readonly 11 = 80;
  static readonly 12 = 80;
  static readonly 13 = 70;
  static readonly 14 = 70;
  static readonly 15 = 70;
  static readonly 16 = 50;
  static readonly 17 = 50;
  static readonly 18 = 50;
  static readonly 19 = 30;
  static readonly 20 = 30;
  // 29+ is 20ms
}
