import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Columns, Rows, BlockSize, Key, Shapes, Colors, LinesPerLevel, Points, SpidLevel} from "./Constants";
import {IPiece, Tetromino} from "./Tetronimo";
import {ServiceService} from "./service.service";
import {interval, Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-tetris',
  templateUrl: './bebris.component.html',
  styleUrls: ['./bebris.component.css']
})
export class BebrisComponent implements OnInit {
  @ViewChild('board', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('next', {static: true})
  canvasNext!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pauseBtn', {static: true})
  pauseButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('playbtn', {static: true})
  PlayButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('status', {static: true})
  status!: ElementRef<HTMLHeadingElement>;

  private time: { start: number; elapsed: number; level: number } = { start: 0, elapsed: 0, level: 1000 };
  private moves = {
    [Key.Left]: (p: IPiece): IPiece => ({...p, x: p.x - 1}),
    [Key.Right]: (p: IPiece): IPiece => ({...p, x: p.x + 1}),
    //[Key.Up]:    (p: IPiece): IPiece => ({ ...p, y: p.y - 1 }),
    [Key.Down]: (p: IPiece): IPiece => ({...p, y: p.y + 1}),
    [Key.Space]: (p: IPiece): IPiece => ({...p, y: p.y + 1}),
    [Key.Up]: (p: IPiece): IPiece => this.gameService.rotate(p)

  };
  private requestId!: number;
  private clearedLines : number = 0;
  private isPaused: boolean = false;
  private keyEventsEnabled: boolean = true;
  private gameOverRed: boolean = false;

  private $tick: Observable<number> = interval(1000);
  private tickSubscription! : Subscription;

  public score: number = 0;
  public level: number = 0;
  public lines: number = 1;

  public ctx!: CanvasRenderingContext2D;
  public ctxNext!: CanvasRenderingContext2D;

  public board!: number[][];
  public tetromino!: Tetromino;
  public next!: Tetromino;



  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.keyEventsEnabled){
      if (event.keyCode === Key.Esc) {
        this.gameOver();
      } else { // @ts-ignore
        if (this.moves[event.keyCode]) {
          event.preventDefault();
          // @ts-ignore
          let t = this.moves[event.keyCode](this.tetromino);
          if (event.keyCode === Key.Space) {
            while (this.gameService.valid(t, this.board)) {
              this.score += Points.HardDop;
              this.tetromino.move(t);
              t = this.moves[Key.Down](this.tetromino);
            }
          } else if (this.gameService.valid(t, this.board)) {
            this.tetromino.move(t);
            if (event.keyCode === Key.Down) {
              this.score += Points.SoftDrop;
            }
          }
        }
      }
    }

  }

  private draw(ShapeToDraw: IPiece) {
    this.tetromino.move(ShapeToDraw);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.tetromino.draw();
    this.drawBoard();
  }

  constructor(private gameService: ServiceService) {}

  ngOnInit(): void {
    this.initGame();
    this.initNext();
  }

  private initGame() {
    //@ts-ignore
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.canvas.width = Columns * BlockSize;
    this.ctx.canvas.height = Rows * BlockSize;

    this.ctx.scale(BlockSize, BlockSize);

    this.pauseButton.nativeElement.disabled = true;
  }

  private getEmptyBoard(): number[][] {
    return Array.from({length: Rows}, () => Array(Columns).fill(0));
  }

  private initNext() {
    //@ts-ignore
    this.ctxNext = this.canvasNext.nativeElement.getContext('2d');
    // Calculate size of canvas from constants.
    this.ctxNext.canvas.width = 4 * BlockSize;
    this.ctxNext.canvas.height = 4 * BlockSize;

    this.ctxNext.scale(BlockSize, BlockSize);
  }

  public play() {
    this.keyEventsEnabled = true;
    this.canvas.nativeElement.style.backgroundColor = "#FFF"
    this.PlayButton.nativeElement.innerText = 'Restart';
    this.PlayButton.nativeElement.style.padding = '1rem 3rem';
    this.pauseButton.nativeElement.disabled = false;
    this.status.nativeElement.innerText = 'Active';
    if (this.tickSubscription){
      this.status.nativeElement.style.color = '#FFF'
      this.tickSubscription.unsubscribe();
    }

    if (!this.isPaused){
      this.resetGame();
      this.next = new Tetromino(this.ctx);
      this.next.drawNext(this.ctxNext)
      this.tetromino = new Tetromino(this.ctx);
      this.tetromino.draw();
    }

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.animate();
  }

  private resetGame() {
    this.score = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.canvas.nativeElement.classList.remove("game-over");
  }
  private animate(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      this.drop();
    }

    this.draw(this.tetromino);
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }
  private drop() : boolean{
    let t = this.moves[Key.Down](this.tetromino);
    if (this.gameService.valid(t, this.board)) {
      this.tetromino.move(t);
    } else {
      this.freeze();
      this.clearLines();
      this.earnScoreViaLineClear();
      if (this.tetromino.y === 0) {
        this.gameOver();
        return false;
      }
      this.tetromino = this.next;
      this.next = new Tetromino(this.ctx);
      this.next.drawNext(this.ctxNext);
    }
    return true;
  }
  private freeze() {
    this.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.tetromino.y][x + this.tetromino.x] = value;
        }
      });
    });
    console.table(this.board)
  }
  private clearLines() {
    this.clearedLines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        this.clearedLines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(Columns).fill(0));
      }
    });

  }
  private earnScoreViaLineClear(){
    if (this.clearedLines > 0) {
      console.log("Checked");
      this.score += this.gameService.getLinesClearedPoints(this.clearedLines, this.level);
      console.log(this.score);
      this.lines += this.clearedLines;
      console.log(this.lines);
      if (this.lines >= LinesPerLevel) {
        this.level++;
        this.lines -= LinesPerLevel;
        console.log("earned");
        // @ts-ignore
        this.time.level = SpidLevel[this.level];
        console.log("time changed");
      }
    }
  }
  private drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = Colors[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  private gameOver() {
    // this.board = this.getEmptyBoard();
    // this.board = this.clearBoard();
    cancelAnimationFrame(this.requestId);
    this.canvas.nativeElement.classList.add("game-over");
    this.canvas.nativeElement.style.backgroundColor = "#333";
    this.pauseButton.nativeElement.disabled = true;
    this.keyEventsEnabled = false;

    this.tickSubscription = this.$tick.subscribe(()=>{
      this.status.nativeElement.innerText = 'Game Over';
      this.gameOverRed = !this.gameOverRed;
      if (this.gameOverRed){
        this.status.nativeElement.style.color = '#FF00FF'
      }
      else {
        this.status.nativeElement.style.color = '#FF0000'
      }
    })
  }

  public pause() {
    if (this.isPaused){
      this.pauseButton.nativeElement.innerText = 'Pause';
      this.play();
      this.isPaused = !this.isPaused
      this.canvas.nativeElement.style.backgroundColor = "#FFF"
    }
    else{
      this.isPaused = !this.isPaused
      cancelAnimationFrame(this.requestId);
      this.canvas.nativeElement.style.backgroundColor = "#999"
      this.pauseButton.nativeElement.innerText = 'Continue';
      this.status.nativeElement.innerText = 'Paused';
    }
  }
}
