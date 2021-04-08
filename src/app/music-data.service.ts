import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

// Assignment 6
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        //console.log('RECIEVE SEARCH STRING ', searchString);
        return this.http.get<any>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }


  addToFavourites(id): Observable<any> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    return this.http.put<[String]>(
      `${environment.userAPIBase}/favourites/${id}`,
      null
    );
  }

  removeFromFavourites(id): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap(() => {
          return this.getFavourites();
        })
      );
  }

  getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites/`)
      .pipe(
        mergeMap((favouritesArray) => {
          return this.spotifyToken.getBearerToken().pipe(
            mergeMap((token) => {
              if (favouritesArray.length <= 0) {
                return new Observable((data) => {
                  data.next({ tracks: [] });
                  // return an empty array if favourites list has no any song
                });
              } else
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
            })
          );
        })
      );
  }
}
