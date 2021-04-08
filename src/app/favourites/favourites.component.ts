import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any>;
  private favouritesSub;
  constructor(private data: MusicDataService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Favourite');
    this.favouritesSub = this.data.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id) {
    this.favouritesSub = this.data
      .removeFromFavourites(id)
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }
  ngOnDestroy() {
    this.favouritesSub?.unsubscribe();
  }
}
