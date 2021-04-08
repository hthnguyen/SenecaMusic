import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  private id;
  albums: Array<any>;
  artist: any;

  private idSub;
  private albumsSub;
  private artistSub;
  constructor(private data: MusicDataService, private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Artist Discography');
    let idSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.artistSub = this.data.getArtistById(this.id).subscribe((data) => {
      this.artist = data;
    });

    this.albumsSub = this.data
      .getAlbumsByArtistId(this.id)
      .subscribe((data) => {
        this.albums = data.items.filter((value: any, index: any) => {
          return (
            data.items.map((album: any) => album.name).indexOf(value.name) ===
            index
          );
        });
      });
  }

  ngOnDestroy() {
    this.idSub?.unsubscribe();
    this.artistSub?.unsubscribe();
    this.albumsSub?.unsubscribe();
  }
}
