// status class
export class Status {
  id!: string;
  name!: string;
}

export class StatusReturn {
  // void to return status name
  public getStatusName(value: any): string {
    switch (value) {
      case 1:
        return 'public.active';
      case 0:
        return 'public.inactive';
      default:
        return 'public.active';
    }
  }
  public getStatusNumber(value: any): number {
    switch (value) {
      case 'Active':
        return 1;
      case 'نشط':
        return 1;
      case 'Inactive':
        return 0;
      case 'غير نشط':
        return 0;
      default:
        return 1;
    }
  }
  public getStatusStyle(value: any): string {
    switch (value) {
      case 1:
        return 'Primary';
      case 0:
        return 'danger';
      default:
        return 'Primary';
    }
  }

  public getStatusIcon(value: any): string {
    switch (value) {
      case 0:
        return 'pi pi-times-circle';
      case 1:
        return 'pi pi-check';
      case 2:
        return 'pi pi-info-circle';
      default:
        return 'pi pi-check';
    }
  }
}

// enum class
export enum StatusEnum {
  Active = 1,
  Inactive = 0,
}
// status class
