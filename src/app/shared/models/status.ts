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
      case StatusEnum.WaitingList:
        return 'public.waitingList';
      case StatusEnum.Public:
        return 'public.public';
      case StatusEnum.Private:
        return 'public.private';
      case StatusEnum.Accepted:
        return 'public.accepted';
      case StatusEnum.Rejected:
        return 'public.rejected';
      case StatusEnum.Cancelled:
        return 'public.private';
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
      case 'Waiting List':
        return StatusEnum.WaitingList;
      case 'قائمة الانتظار':
        return StatusEnum.WaitingList;
      case 'Accepted':
        return StatusEnum.Accepted;
      case 'مقبول':
        return StatusEnum.Accepted;
      case 'Rejected':
        return StatusEnum.Rejected;
      case 'مرفوض':
        return StatusEnum.Rejected;
      case 'Public':
        return StatusEnum.Public;
      case 'عام':
        return StatusEnum.Public;
      case 'Private':
        return StatusEnum.Private;
      case 'خاص':
        return StatusEnum.Private;
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
      case StatusEnum.Public:
        return 'info';
      case StatusEnum.WaitingList:
        return 'warning';
      case StatusEnum.Private:
        return 'warning';
      case StatusEnum.Rejected:
        return 'danger';
      default:
        return 'Primary';
    }
  }

  public getStatusIcon(value: any): string {
    switch (value) {
      case StatusEnum.Active:
        return 'pi pi-check';
      case StatusEnum.Accepted:
        return 'pi pi-check';
      case StatusEnum.Inactive:
        return 'pi pi-times-circle';
      case StatusEnum.Rejected:
        return 'pi pi-times-circle';
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
