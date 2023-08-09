import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from './menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/menu/all`);
  }

  public addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiServerUrl}/menu/add`, menu);
  }

  public updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiServerUrl}/menu/update`, menu);
  }

  public deleteMenu(menuId: number): Observable<void> { //we dont send any response back in response body
    return this.http.delete<void>(`${this.apiServerUrl}/menu/delete/${menuId}`);
  }
}
