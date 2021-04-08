import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  private id;
  result: Boolean;
  private idSub;
  private albumSub;

  constructor(
    private data: MusicDataService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Album');
    
    this.idSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.albumSub = this.data.getAlbumById(this.id).subscribe((data) => {
      this.album = data;
    });
  }

  addToFavourites(trackID) {
    //console.log("Click")
    this.data.addToFavourites(trackID).subscribe(
      (success) => {
        this.openSnackBar('Adding to Favorites...', 'Done');
      },
      (err) => {
        this.openSnackBar('Unable to add song to Favourites', 'Ok');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.idSub?.unsubscribe();
    this.albumSub?.unsubscribe();
  }
}
