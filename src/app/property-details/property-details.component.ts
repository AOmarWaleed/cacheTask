import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { FormsModule } from '@angular/forms';
import { StatusFiltrationPipe } from '../pipes/status-filtration.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { JsonPipe } from '@angular/common';
import { Property } from '../interfaces/property';

@Component({
  selector: 'app-property-details',
  imports: [FormsModule, LoaderComponent],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
})
export class PropertyDetailsComponent {
  //! withComponentBinding enabled
  @Input() id!: number;

  propertyData!: Property;

  //! TODO :- USE ASYNC PIPE
  isLoading: boolean = false;
  err: any = null;

  constructor(private _propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getProperty();
  }

  getProperty() {
    console.log('get property');
    this.isLoading = true;
    this._propertyService.getProperty(this.id).subscribe({
      next: (res) => {
        console.log('hi');

        this.propertyData = res;
        this.isLoading = false;
      },

      error: (err) => {
        this.err = err;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
