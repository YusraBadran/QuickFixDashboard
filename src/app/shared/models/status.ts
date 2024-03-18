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
        return 'pi pi-check';
      case 1:
        return 'pi pi-times-circle';
      case 2:
        return 'pi pi-info-circle';
      default:
        return 'pi pi-check';
    }
  }
  public getUnitTypeName(value: any): string {
    switch (value) {
      case 0:
        return 'units.public';
      case 1:
        return 'units.private';
      default:
        return 'units.public';
    }
  }
  public getUnitTypeStyle(value: any): string {
    switch (value) {
      case 0:
        return 'info';
      case 1:
        return 'warning';
      default:
        return 'info';
    }
  }
  public getUnitTypeNumber(value: any): number {
    switch (value) {
      case 'Public':
        return 0;
      case 'عام':
        return 0;
      case 'Private':
        return 1;
      case 'خاص':
        return 1;
      default:
        return 0;
    }
  }
}

// enum class
export enum StatusEnum {
  Active = 0,
  Inactive = 1,
}
// status class
