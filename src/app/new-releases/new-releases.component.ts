import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<any>;
  private releasesSub;
  constructor(private data: MusicDataService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Seneca Music');
    this.releasesSub = this.data.getNewReleases().subscribe((data) => {
      this.releases = data.albums.items;
    });
  }

  ngOnDestroy() {
    this.releasesSub?.unsubscribe();
  }
}
