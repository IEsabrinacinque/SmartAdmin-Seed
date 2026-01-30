import { Component, ViewChild, computed } from '@angular/core';
import { AppLogo } from '@app/components/app-logo';
import { AppMenuComponent } from '@layouts/components/sidenav/components/app-menu/app-menu';
import { SimplebarAngularModule } from 'simplebar-angular';
import { MenuItemType } from '@/app/types/layout';
import { SessionService } from '@/app/core/services/session.service';
import { mapBackendMenuToSidebar } from '@/app/core/menu/menu-mapper';

@Component({
  selector: 'app-sidenav',
  imports: [
    AppLogo,
    AppMenuComponent,
    SimplebarAngularModule
  ],
  templateUrl: './sidenav.html',
  styles: ``
})
export class Sidenav {

  @ViewChild(AppMenuComponent) menuComp!: AppMenuComponent;

  protected filterText = '';
  protected showNoResults = false;

  constructor(private session: SessionService) {}

  // ✅ MENU DINAMICO DAL BACKEND (via sessione)
  protected readonly menuItems = computed<MenuItemType[]>(() => {
    const backendMenu = this.session.menu();
    return mapBackendMenuToSidebar(backendMenu);
  });

  // ===========================
  // 🔍 FILTER
  // ===========================
  get filteredMenuItems(): MenuItemType[] {
    const items = this.menuItems();

    if (!this.filterText.trim()) return items;

    const search = this.filterText.trim().toLowerCase();

    function deepFilter(items: MenuItemType[]): MenuItemType[] {
  return items
    .map(item => {
      const selfMatch = (item.label || '').toLowerCase().includes(search);

      if (selfMatch) {
        return {
          ...item,
          children: item.children ? [...item.children] : undefined,
        };
      }

      if (item.children?.length) {
        const filteredChildren = deepFilter(item.children);
        if (filteredChildren.length) {
          return { ...item, children: filteredChildren };
        }
      }

      return undefined;
    })
    .filter(Boolean) as MenuItemType[];
}

    return deepFilter(items);
  }

  updateFilterText(e: Event) {
    const target = e.target as HTMLInputElement;
    this.filterText = target.value;
    this.showNoResults = !this.filteredMenuItems.length;
    this.menuComp?.expandFilteredPaths(this.filteredMenuItems);
  }
}
