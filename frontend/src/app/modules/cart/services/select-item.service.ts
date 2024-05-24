import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectItemService {
  private selectedSubject = new BehaviorSubject<any[]>([]);
  selectedItem$ = this.selectedSubject.asObservable();
  constructor() {}

  setSelected(item: any[]) {
    this.selectedSubject.next(item);
  }

  getSelected(): any[] {
    return this.selectedSubject.getValue();
  }
}
