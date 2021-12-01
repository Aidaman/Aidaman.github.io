import { Component, OnInit } from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AppService} from "../app.service";

export interface IElement {
  viewValue: string,
  content: string,
  value: number
}

@Component({
  selector: 'app-fifteen',
  templateUrl: './fifteen.component.html',
  styleUrls: ['./fifteen.component.css']
})
export class FifteenComponent implements OnInit {
  private IsSolvedAuto: boolean = false;
  private isFirstMove: boolean = false;
  private $tick: Observable<number> = interval(1000);
  private subscription!: Subscription;

  public minutes: number = 0;
  public seconds: number = 0;

  public arr15: IElement[] = [
    {
      viewValue: 'empty',
      content: '',
      value: 0
    },
    {
      viewValue: 'element',
      content: '1',
      value: 1
    },
    {
      viewValue: 'element',
      content: '2',
      value: 2
    },
    {
      viewValue: 'element',
      content: '3',
      value: 3
    },
    {
      viewValue: 'element',
      content: '4',
      value: 4
    },
    {
      viewValue: 'element',
      content: '5',
      value: 5
    },
    {
      viewValue: 'element',
      content: '6',
      value: 6
    },
    {
      viewValue: 'element',
      content: '7',
      value: 7
    },
    {
      viewValue: 'element',
      content: '8',
      value: 8
    },
    {
      viewValue: 'element',
      content: '9',
      value: 9
    },
    {
      viewValue: 'element',
      content: '10',
      value: 10
    },
    {
      viewValue: 'element',
      content: '11',
      value: 11
    },
    {
      viewValue: 'element',
      content: '12',
      value: 12
    },
    {
      viewValue: 'element',
      content: '13',
      value: 13
    },
    {
      viewValue: 'element',
      content: '14',
      value: 14
    },
    {
      viewValue: 'element',
      content: '15',
      value: 15
    },
  ]

  constructor(private router: Router, private appService : AppService) {
  }

  ngOnInit(): void {
    this.Mix();
  }

  //Timer logic
  private count() : void{
    this.seconds++;
    if (this.seconds >= 60) {
      ++this.minutes;
      this.seconds = 0;
    }
  }

  //Game logic
  public SwitchPosition(arg : IElement) : void {
    if (!this.isFirstMove){
      this.isFirstMove = true;
      this.subscription = this.$tick.subscribe( () => {this.count()})
    }

    let correctArr = this.arr15.slice(0).sort((a, b) => a.value-b.value);
    let tmp  =  this.arr15[this.arr15.findIndex(val => val.value == arg.value)];
    let tmpIndex : number  =  this.arr15.findIndex(val => val.value == arg.value);
    let zeroElemIndex : number = this.arr15.findIndex(val => val.value == 0);

    if (tmpIndex == zeroElemIndex+1 || tmpIndex == zeroElemIndex+4 || tmpIndex == zeroElemIndex-1 || tmpIndex == zeroElemIndex-4){
      this.arr15[tmpIndex] = this.arr15[zeroElemIndex];
      this.arr15[zeroElemIndex] = tmp;
    }
    if (this.arr15 === correctArr){
      this.CheckCorrect();
    }
  }

  public Mix() : void {
    for (let i= 0; i <10; i++){
      this.arr15.sort(()=>Math.random() -0.5)
    }
  }

  public Solve() : void {
    this.arr15 = this.arr15.sort((a, b) => a.value-b.value);
    this.IsSolvedAuto = true;

    this.CheckCorrect();
  }

  private CheckCorrect() : any {
    let Checked : boolean = this.arr15 === this.arr15.slice(0).sort((a, b) => a.value-b.value);
    if (this.IsSolvedAuto){
      alert("Okay, you've done, but not with yourself. It took for you " + this.minutes + " mins & " + this.seconds + " secs");
      return;
    }
    else if (!this.IsSolvedAuto && Checked){
      alert("Well done. Good job, now you can rest");
      return;
    }
    alert("Nope it's not done");
  }

  public DirectTo(url: string): void {
    this.router.navigate([url]);
    this.appService.DisplayGrid.next(true);
  }
}
