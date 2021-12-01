import {BlockSize, Colors, Shapes} from "./Constants";

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}
export class Tetromino implements IPiece{
  color!: string;
  shape!: number[][];
  x!: number;
  y!: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }

  private spawn() {
    const rnd = this.randomTetromino(6);
    this.shape = Shapes[rnd];
    this.color = Colors[rnd];

    this.x = 3;
    this.y = 0;
  }
  public draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          //this.ctx.scale(BlockSize, BlockSize
        }
      });
    });
  }

  public drawNext(ctxNext: CanvasRenderingContext2D) {
    ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
    ctxNext.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          ctxNext.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  public move(t: IPiece){
    this.y = t.y;
    this.x = t.x;
    this.shape = t.shape;
  }

  randomTetromino(amountOfShapes: number): number {
    return Math.floor(Math.random() * amountOfShapes);
  }
}
