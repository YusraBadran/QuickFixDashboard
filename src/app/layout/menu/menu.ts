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
        label: 'menu.company.title',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.company],
      },
      {
        label: 'menu.company.create',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.companyCreate],
      },
      // {
      //   label: 'menu.branch.create',
      //   icon: 'pi pi-fw pi-home',
      //   routerLink: [routes.branches],
      // },
      // {
      //   label: 'menu.service.title',
      //   icon: 'pi pi-fw pi-home',
      //   routerLink: [routes.services],
      // },
      {
        label: 'menu.units.title',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.units],
      },
      {
        label: 'menu.categories.title',
        icon: 'pi pi-fw pi-home',
        routerLink: [routes.categories],
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
