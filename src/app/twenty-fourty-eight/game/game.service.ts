import { Injectable } from '@angular/core';
import {Item} from "./items";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private size=4; //4x4
  private availableCells: number[]=[];

  private get emptyCells():number[]{
    const notEmptyCells=this.notEmptyCells;
    return this.availableCells.filter(position=>!notEmptyCells.includes(position));

  }

  private get notEmptyCells():number[]{
    return this.items.map(item=>item.row*10+item.col);
  }

  scores=0;
  theEnd=false;
  items:Item[]=[];
  constructor() {
    this.generateAvailableCells();
    this.generateItems();
  }

  resetGame(){
    this.scores=0;
    this.items=[];
    this.theEnd=false;
    this.generateItems();
  }

  left(){
    this.move('row', 'col', false);
  }

  up(){
    this.move('col', 'row', false);
  }

  right(){
    this.move('row', 'col', true);
  }

  down(){
    this.move('col', 'row', true);
  }

  private move(
    dimX: 'col' | 'row' ='row',
    dimY: 'col' | 'row'='col',
    reverse=false){
    if (this.theEnd || !this.canIMove(dimX, false, reverse)){
      return;
    }
    this.clearDeletedItems();

    //this.canDoMove();

    //left
    const mergedItems:Item[]=[];

    for (let x =1; x<=this.size; x++){
      const items=this.items
        .filter(item=>item[dimX]===x)
        .sort((a,b)=> a[dimY] - b[dimY]);
      if (reverse){
        items.reverse();
      }

      let y= reverse ? this.size : 1;
      let merged=false;
      //@ts-ignore
      let prevItem:Item=null;

      for(const item of items){

        if (prevItem){
          if (merged){
            merged=false;
          }
          else if(item.value===prevItem.value){
            reverse ? y++ : y--;
            prevItem.isOnDelete=true;
            item.isOnDelete=true;
            mergedItems.push(({
              value: item.value*2,
              [dimY]:y,
              [dimX]:x
            } as any));
            merged=true;
          }
        }

        item[dimY]=y;
        reverse ? y-- : y++;
        prevItem=item;
      }
    }

    this.scores+=mergedItems.reduce((acc, item)=> acc+item.value, 0);
    this.items=[...this.items, ...mergedItems];

    this.generateItems();

    this.theEnd=this.thisIsTheEnd();
  }

  private clearDeletedItems(){
    this.items=this.items.filter(item=>!item.isOnDelete);
  }

  private generateItems(length:number=2){
    const positions:number[]=this.emptyCells
      .sort(()=>Math.random()-0.5)
      .slice(0, length);
    ;
    this.items=[...this.items, ...positions.map<Item>(position => ({
      value:2,
      col:position%10,
      row:(position-position%10)/10
    }))]
  }

  private thisIsTheEnd(){
    return !this.canIMove('row') || !this.canIMove('col');
  }

  private canIMove(dimX: 'row' | 'col', skipDir:boolean=true, forward=false){
    const dimY=dimX ==='row' ? 'col' : 'row';
    for (let x = 1; x<=this.size; x++){
      const items = this.items
        .filter(item=> !item.isOnDelete && item[dimX]===x)
        .sort((a,b)=>a[dimY]-b[dimY]);

      if (items.length !==this.size){
        if (skipDir){
          return true;
        }
        const length=items.length; //quantity of items
        const lockedPositions:number[]=[];
        const start = forward ? this.size + 1 - length : 1 ;
        const end = forward ? length : this.size;
        for (let i = start; i<= end; i++ ){
          lockedPositions.push(i);
        }

        if (items.find(item =>!lockedPositions.includes(item[dimY]))){
          return true;
        }
      }

      let prevValue=0;
      for (const item of items){
        if (item.value===prevValue){
          return true;
        }
        prevValue=item.value;
      }
    }
    return false;
  }


  private generateAvailableCells(){
    for(let row = 1; row<=this.size; row++){
      for (let col=1; col<=this.size; col++){
        this.availableCells.push(row * 10 + col);
        //11 12 13 14 21 22... где 1ч - строка 1-столбец
      }
    }
  }
}
