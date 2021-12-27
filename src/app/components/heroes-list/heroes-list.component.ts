import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../models/heroe.interface';
import  { finalize } from 'rxjs/operators';
import {  trigger, state, transition, sequence, style, animate, query, stagger, animateChild} from '@angular/animations';

export const fadeOut =
  trigger('fadeOut', [
    state('void', style({ background: 'pink', borderBottomColor: 'pink', opacity: 0, transform: 'translateX(-550px)', 'box-shadow': 'none' })),
    transition('void => *', sequence([
      animate(".5s ease")
    ])),
    transition('* => void', [animate("5s ease")])
  ]);

export const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
        animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);



export const blub =
  trigger('blub', [
    transition(':leave', [
      style({ background: 'pink'}),
      query('*', stagger(-150, [animateChild()]), { optional: true })
    ]),
  ]);

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
  animations: [fadeOut, blub, rowsAnimation],
})
export class HeroesListComponent implements OnInit {


  heroes!: Heroe[] ;
  displayedColumns: string[] = ['id', 'name'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  loading: boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loading = true;
      this.heroesService.getAllHeroes().pipe(
        finalize(() => this.loading = false))
        .subscribe((heroes: Heroe[]) => this.heroes = heroes)

  }


}

