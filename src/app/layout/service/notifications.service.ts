import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { Notification } from '../topbar/model/notification';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private hubConnection: any;
  constructor() {}
  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${env.serverUrl}/notification`, {
          transport: signalR.HttpTransportType.WebSockets,
        })
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Connected to SignalR Hub >>>');
          return resolve(true);
        })
        .catch((error: any) => {
          console.error(error);
          reject(error);
        });
    });
  }

  public listenToNotifications(callback: (notify: Notification) => void): void {
    this.hubConnection.on('SendNotificationAsync', (notify: Notification) => {
      callback(notify);
    });
  }
  public joinGroupFeed(groupName: string) {
    return new Promise((resolve, reject) => {
      this.hubConnection.invoke('AddToGroupAsync', groupName).then(
        () => {
          return resolve(true);
        },
        (err: any) => {
          return reject(err);
        }
      );
    });
  }
}
