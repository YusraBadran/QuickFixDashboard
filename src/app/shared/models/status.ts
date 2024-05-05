// status class
export class Status {
  id!: string;
  name!: string;
}

export class StatusReturn {
  // void to return status name
  public getStatusName(value: any): string {
    switch (value) {
      case StatusEnum.Active:
        return 'public.active';
      case StatusEnum.Inactive:
        return 'public.inactive';
      default:
        return 'public.active';
    }
  }
  public getStatusNumber(value: any): number {
    switch (value) {
      case 'Active':
        return StatusEnum.Active;
      case 'نشط':
        return StatusEnum.Active;
      case 'Inactive':
        return StatusEnum.Inactive;
      case 'غير نشط':
        return StatusEnum.Inactive;
      default:
        return StatusEnum.Active;
    }
  }
  public getStatusStyle(value: any): string {
    switch (value) {
      case StatusEnum.Active:
        return 'Primary';
      case StatusEnum.Inactive:
        return 'danger';
      default:
        return 'Primary';
    }
  }

  public getStatusIcon(value: any): string {
    switch (value) {
      case StatusEnum.Inactive:
        return 'pi pi-times-circle';
      case StatusEnum.Active:
        return 'pi pi-check';
      case StatusEnum.WaitingList:
        return 'pi pi-info-circle';
      default:
        return 'pi pi-check';
    }
  }
}

// enum class
export enum StatusEnum {
  Inactive = 0,
  Active = 1,
  Delete = 2,
  Locked = 3,
  WaitingList = 4,
  Public = 5,
  Private = 6,
  Accepted = 7,
  Rejected = 8,
  Cancelled = 9,
  Removed = 10,
}
// status class
