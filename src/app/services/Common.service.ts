import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private data = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.data.next(data);
  }

  getData() {
    return this.data.asObservable();
  }
}
