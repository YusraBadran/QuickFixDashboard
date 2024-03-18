import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AddressRequest } from './model/address-request';

@Component({
  selector: 'shared-address',
  templateUrl: './address.component.html',
})
export class AddressComponent {
  @Input() tempAddress: any;
  @Input() view: boolean | undefined = true;
  @Input() canAddMarker: boolean = false;
  @Input() height: number = 500;
  @Input() submitted: boolean = false;
  @Output() position = new EventEmitter<any>();
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;
  public address: AddressRequest = new AddressRequest();
  public zoom: number = 12;
  public zoomInDisable: boolean = false;
  public zoomOutDisable: boolean = false;
  public markers: any[] = [];
  public infoContent: any;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    mapTypeId: 'hybrid',
    draggableCursor: 'pointer',
    maxZoom: 19,
    minZoom: 1,

    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  ngOnInit() {
    /**
     * get data from local storage
     */
    var getData = localStorage.getItem('tempAddress');
    if (getData != null || getData != undefined) {
      var temp = JSON.parse(getData);
      this.address = temp;
    }
    /**
     * check if address is not null
     */
    if (this.tempAddress) {
      this.address = this.tempAddress;
    }
    /**
     * navigator location
     */
    this.navigatorLocation(this.address.latitude, this.address.longitude);
    this.addMarker({
      lat: this.address.latitude,
      lng: this.address.longitude,
    });
    /**
     * check zoom in and zoom out
     */
    if (this.zoom == this.options.maxZoom!) {
      this.zoomInDisable = true;
    }
    if (this.zoom == this.options.minZoom!) {
      this.zoomOutDisable = true;
    }
  }
  /**
   *  navigator location
   * @param lat
   * @param lng
   */
  navigatorLocation(lat: any, lng: any) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: lat ?? this.address.latitude ?? position.coords.latitude,
        lng: lng ?? this.address.longitude ?? position.coords.longitude,
      };
      this.zoom = 19;
    });
  }
  /**
   * zoom change
   */
  zoomChange() {
    this.zoom = this.map.getZoom()!;
    if (this.zoom != this.options.maxZoom!) {
      this.zoomInDisable = false;
    }
    if (this.zoom == this.options.maxZoom!) {
      this.zoomInDisable = true;
    }
    if (this.zoom != this.options.minZoom!) {
      this.zoomOutDisable = false;
    }
    if (this.zoom == this.options.minZoom!) {
      this.zoomOutDisable = true;
    }
  }
  /**
   * zoom in
   */
  zoomInMeth() {
    if (this.zoom < this.options.maxZoom!) {
      this.zoom++;
      this.zoomOutDisable = false;
    }
    if (this.zoom == this.options.maxZoom!) {
      this.zoomInDisable = true;
    }
  }
  /**
   * zoom out
   */
  zoomOutMeth() {
    if (this.zoom > this.options.minZoom!) {
      this.zoom--;
      this.zoomInDisable = false;
    }
    if (this.zoom == this.options.minZoom!) {
      this.zoomOutDisable = true;
    }
  }
  /**
   *  click on map
   * @param event
   */
  click(event: any) {
    var markData = event.latLng?.toJSON();
    this.address.longitude = markData.lng;
    this.address.latitude = markData.lat;
    if (this.canAddMarker) {
      this.addMarker(markData);
    }
    if (this.address.longitude && this.address.latitude) {
      this.position.emit(this.address);
    }
    // get place details from lat/lng
    // var geocoder = new google.maps.Geocoder();
    // geocoder.geocode(
    //   { location: event.latLng },
    //   function (results: any, status: any) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       if (results[0]) {
    //         console.log(results[0].formatted_address);
    //       } else {
    //         console.log('No results found');
    //       }
    //     } else {
    //       console.log('Geocoder failed due to: ' + status);
    //     }
    //   }
    // );
  }
  /**
   * get my location
   */
  getMyLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.address.latitude ?? position.coords.latitude,
        lng: this.address.longitude ?? position.coords.longitude,
      };
      this.zoom = 19;
    });
  }
  /**
   *  add marker
   * @param position
   */
  addMarker(position: any) {
    this.markers = [];
    this.markers.push({
      position: {
        lat: position.lat,
        lng: position.lng,
      },
      label: {
        color: 'red',

        // text: 'Marker label ' + (this.markers.length + 1),
      },
      // title: 'Marker title ' + (this.markers.length + 1),
      // info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }
  /**
   *  open info
   * @param marker
   * @param content
   */
  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info!.open(marker);
  }
}
