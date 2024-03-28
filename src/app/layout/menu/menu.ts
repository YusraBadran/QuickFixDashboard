import { routes } from '../../shared/router/router';

export const menu = [
  {
    label: 'menu.home.title',
    icon: 'pi pi-fw pi-home',
    items: [
      {
        label: 'menu.home.dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: [''],
      },
    ],
  },
  {
    label: 'menu.company.title',
    items: [
      {
        label: 'menu.service.title',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.servicesType],
      },
      {
        label: 'menu.categories.title',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.categories],
      },
      {
        label: 'categoriesItem.title',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.categoriesItem],
      },
    ],
  },
  {
    label: 'menu.setting.title',
    items: [
      {
        label: 'menu.setting.users',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.users],
      },
      {
        label: 'menu.setting.createUser',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.usersCreate],
      },
    ],
  },
];
