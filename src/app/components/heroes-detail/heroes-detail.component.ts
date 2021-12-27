import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../models/heroe.interface';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {

  heroe!: Heroe;
  showDetail: boolean = false;

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              )  { }

  ngOnInit(): void {
    const identifer = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Indentifier -->', identifer);

    this.heroesService.getHeroeById(identifer!).subscribe((heroe: Heroe) => {

      if (!heroe) {
       return this.router.navigateByUrl('/');
      }

      console.log('Heroe-->', heroe);
      return this.heroe = heroe;

    });
  }

  home() {
    return this.router.navigateByUrl('/');
  }

  toggleShowDetails() {
    this.showDetail = !this.showDetail
  }

}
