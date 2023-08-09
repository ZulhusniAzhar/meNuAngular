import { Component, OnInit } from '@angular/core';
import { Menu } from './Menu/menu';
import { MenuService } from './Menu/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meNuAngular';
  public menus: Menu[] = [];
  public editMenu: Menu = {
    id: 0,
    name: '',
    restaurant: '',
    price: 0.0,
    rate: 0,
    imageUrl: '',
    comment: '',
  };
  public deleteMenu: Menu = {
    id: 0,
    name: '',
    restaurant: '',
    price: 0.0,
    rate: 0,
    imageUrl: '',
    comment: '',
  };

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.getMenus();
  }

  public getMenus(): void {
    this.menuService.getMenus().subscribe(
      (response: Menu[]) => {
        this.menus = response;
        console.log(this.menus);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMenu(addForm: NgForm) {
    document.getElementById('add-menu-form')?.click();
    this.menuService.addMenu(addForm.value).subscribe(
      (response: Menu) => {
        console.log(response);
        this.getMenus();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMenu(menu: Menu): void {
    this.menuService.updateMenu(menu).subscribe(
      (response: Menu) => {
        console.log(response);
        this.getMenus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMenu(menuId: number): void {
    this.menuService.deleteMenu(menuId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMenus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMenus(key: string): void {
    console.log(key);
    const results: Menu[] = [];
    for (const menu of this.menus) {
      if (menu.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || menu.restaurant.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || menu.comment.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(menu);
      }
    }
    this.menus = results;
    if (results.length === 0 || !key) {
      this.getMenus();
    }
  }

  public onOpenModal(menu: Menu, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addMenuModal');
    }
    if (mode == 'edit') {
      this.editMenu = menu;
      button.setAttribute('data-target', '#updateMenuModal');
    }
    if (mode == 'delete') {
      this.deleteMenu = menu;
      button.setAttribute('data-target', '#deleteMenuModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
