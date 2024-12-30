import { Component, OnInit, HostListener, AfterViewInit, Signal, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { StatusFiltrationPipe } from '../pipes/status-filtration.pipe';
import { FormsModule } from '@angular/forms';
import { GenericSearchPipe } from '../pipes/generic-search.pipe';
import { HighlightTextPipe } from '../pipes/highlight-text.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { Property } from '../interfaces/property';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrl: './property-table.component.css',
  imports: [
    CurrencyPipe,
    StatusFiltrationPipe,
    HighlightTextPipe,
    FormsModule,
    GenericSearchPipe,
    LoaderComponent,
  ],
})
export class PropertyTableComponent implements OnInit , AfterViewInit {
  properties: WritableSignal<Property[]> = signal([]);
  selectedStatus: WritableSignal<string> = signal("all");
  searchText: WritableSignal<string> = signal("");



  private _CACHE_KEY = 'cachedData';
  private _CACHE_POSITION = 'scrollPosition';


  //! start (zero based) = ( currentPage - 1 ) *  pageSize 
  currentPage = 1;
  pageSize = 10;
  //! to prevent infinite requests
  hasMoreData = true;

  //! TODO:- USE ASYNC PIPE
  error: WritableSignal<any> = signal(null);
  isLoading : WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private _cacheService: CacheService
  ) {}

  ngOnInit(): void {
    const cachedData = this._cacheService.getCachedData(this._CACHE_KEY);
    if (cachedData) {
      this.properties.set(  cachedData.properties );
      this.currentPage = cachedData.currentPage;
      this.hasMoreData = cachedData.hasMoreData;
    } else {
      this.loadProperties();
    }
  }

  ngAfterViewInit(): void {
    const cachedScroll = this._cacheService.getCachedData(this._CACHE_POSITION);
    //! TO MAKE SURE CONTENT LOADED
    setTimeout(() => {
      if (cachedScroll) {
        window.scrollTo(0, Number(cachedScroll));
      }
    }, 50);
    
  }

  loadProperties(): void {
    if (this.isLoading() || !this.hasMoreData) {
      return;
    }
    this.isLoading.set( true);
    this.propertyService
      .getProperties(this.currentPage, this.pageSize)
      .subscribe({
        next: (res: any) => {
          this.properties.update((prev)=>{
            return [...prev , ...res];
          }) 
          this.hasMoreData = res.length === this.pageSize;
          this.currentPage++;
          this.isLoading.set(false);

          this._cacheService.setCachedData(this._CACHE_KEY, {
            properties: this.properties(),
            currentPage: this.currentPage,
            hasMoreData: this.hasMoreData,
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set(err);
        },
      });
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.saveScrollPosition();

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.isLoading()
    ) {
      this.loadProperties();
    }
  }

  saveScrollPosition = (): void => {
    this._cacheService.setCachedData(this._CACHE_POSITION, String(window.scrollY));
  };
}
