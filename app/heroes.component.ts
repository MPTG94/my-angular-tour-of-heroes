import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero }              from './hero';
import { HeroService }       from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  // A consturctor for our 'heroService' variable which is really an
  // instance of the 'HeroService'
  /**
   * A constructor for 'heroService' which is an instance of
   * '{@link HeroService}'
   * @param  {HeroService} privateheroService The 'HeroService'
   * taken from the hero.service.ts file
   * @return {HeroService}                         a HeroService
   * instance to be used in our {@link HeroesComponent}
   */
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  /**
   * A method to get from our 'heroService' variable the list of heroes
   * and load it into the internal heroes variable
   */
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes =>
      this.heroes = heroes);
  }

  /**
   * A method to define what happens when the OnInit lifecycle
   * event is called. When OnInit is called, the {@link getHeroes}
   * method is called and initializes the {@link this.heroes} variable
   */
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}
