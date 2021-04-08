import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: any;
  private resultSub;
  private querySub;
  constructor(private data: MusicDataService, private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Search by Artist');
    this.querySub = this.route.queryParams.subscribe((query) => {
      this.searchQuery = query['q'];

      this.resultSub = this.data
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          this.results = data.artists.items.filter(
            (data) => data.images.length > 0
          );
          //console.log(this.results.length);
        });
    });
  }

  ngOnDestroy() {
    this.resultSub?.unsubscribe();
    this.querySub?.unsubscribe();
  }
}
