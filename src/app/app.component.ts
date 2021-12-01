import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ViewChild('BackToMain', {static: true})
  // MainBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('playground', {static: true})
  playground!: ElementRef<HTMLDivElement>;

  title = 'eeeeeeeeeeeeeee';
  public mainButtonSrc: string = "./assets/main.png";
  public twentyFourtyEightImg: string = "./assets/TwentyFourtyEight.png";
  public tetrisImg: string = "./assets/Tetris.png";
  public fifteenImg: string  = "./assets/fifteenBtn.png";
  public ticTacToeImg: string = "./assets/TicTacToeBtn.png";

  constructor(private router: Router, public appService:AppService){
  }

  ngOnInit(): void {
    // this.MainBtn.nativeElement.click();
    requestAnimationFrame(this.DirectToMain.bind(this));
  }

  public DirectTo(url: string): void {
    this.router.navigate([url]);
    this.appService.DisplayGrid.next(false);
  }

  public DirectToMain() {
    this.router.navigate(['']);
    this.appService.DisplayGrid.next(true);
  }

  public mainHover() {
    this.mainButtonSrc = "./assets/main-hover.png";
  }

  public mainUnhover() {
    this.mainButtonSrc = "./assets/main.png";
  }

  TFEHover() {
    this.twentyFourtyEightImg = "./assets/TwentyFourtyEight-hover.png";
  }

  TFEUnhover() {
    this.twentyFourtyEightImg = "./assets/TwentyFourtyEight.png";
  }

  TetrisHover() {
    this.tetrisImg = "./assets/Tetris-hover.png";
  }

  TetrisUnhover() {
    this.tetrisImg = "./assets/Tetris.png";
  }

  FifteenHover() {
    this.fifteenImg = "./assets/fifteenBtn-hover.png";
  }

  FifteenUnhover() {
    this.fifteenImg = "./assets/fifteenBtn.png";
  }

  TicTacToeHover() {
    this.ticTacToeImg = "./assets/TicTacToeBtn-hover.png";
  }

  TicTacToeUnhover() {
    this.ticTacToeImg = "./assets/TicTacToeBtn.png";
  }
}
