### Dependencies
* None

### Installation
* Download the `bms-js-sdk.min.js` from Github
* Include the script in your code above of your own scripts:
```html
<script src="bms-js-sdk.min.js"></script>
```
* If you're using React, you can use library such as `react-helmet` to inject the script:
```javascript
import { Helmet } from "react-helmet";
...

const handleScriptInject = ({ scriptTags }) => {
  if (scriptTags) {
    const scriptTag = scriptTags[0];
    scriptTag.onload = () => {
      // Your logic when the script is loaded
    };
  }
};

...

<Helmet
         onChangeClientState={(_, addedTags) => handleScriptInject(addedTags)}
       >
         <script src="bms-js-sdk.min.js" />
       </Helmet>
```

### Setup

##### Get your SDK Key
* If you have a BMS credential you can get it by select your application > Application > Keys > SDK.

##### Initiate a new BMSSDK instance
```javascript
const bmsSDK = new BMSSDK();
```

##### Initiate the map

initMap(mapViewId, sdkKey)
* mapViewId: id of the map's container that you want to contain
* sdkKey: the SDK Key.
* Example:
```html
<div id="mapView" />
```

```javascript
const mapViewId = 'mapView';
const mapView = await bmsSDK.initMap(mapViewId, '[SDK_KEY]')
```

##### Add a single marker
addMarker(zoneName, content, onClicked)
* zoneName: name of the zone/polygon that you want to add the marker to.
* content: html content of the marker.
* onClicked: callback when the marker was clicked
* Example:
```javascript
const onClicked = function (zone) {
  alert(`${zone.name} clicked`);
}

bmsMapSDK.addMarker('Zone F', '<p>0</p>', onClicked);
```

##### Add a list of markers
addMarkers([markers])
* Each marker should have zoneName, content, onClick parameters (refers to the `addMarker` above)
* Example:
```javascript
const onClicked = function (zone) {
  alert(`${zone.name} clicked`);
}

bmsSDK.addMarkers([
    {
      zoneName: 'Zone F',
      content: '<p>2</p>',
      onClicked: onClicked
    },
    {
      zoneName: 'Zone G',
      content: '<p>3</p>',
      onClicked: onClicked
    }
]);
```

##### Get List of Last Proper Attendance Zone Records for Each Customer (User)
getLastProperZoneRecords()
* Example:
```javascript

const lastZoneRecords = await bmsSDK.getLastProperZoneRecords();
```

* Example response:
```javascript
[{"customer":{"customerId":51381,"identifier":"test-288","phone":"","email":"test-288@viatick.com","remark":"","date":"2021-11-15T11:11:06.000Z","os":"","thingName":null,"thingArn":null,"thingId":null,"uuid":"F7826DA6-4FA2-4E98-8024-BC5B71E0893A","major":6,"minor":1387,"deviceUUID":"170991d5a884","rotatingId":0,"lastRotation":null,"live":null,"associatedDeviceId":1564982,"isAssignedAllZones":true,"properties":null,"aokQuery":false,"lastAOKQuery":null},"zoneRecordId":6414647,"application":5635,"start":"2021-12-23T10:41:55.000Z","end":"2021-12-23T10:43:15.000Z","iBeacon":null,"isAuto":false,"device":null,"zones":[{"zoneId":417243,"name":"Zone 5","remark":"","image":null,"range":20,"active":true,"properties":{"eventID":1,"uuid":"18","mapID":null,"zoneID":null,"mapImg":null,"eventName":"event 18","startDateTime":"2021-11-22T09:41:18.000Z","endDateTime":"2022-12-07T22:00:00.000Z","TimeZoneMinutes":480,"Location":null,"Remarks":null,"Enabled":true,"coverImg":null,"scope":"336f0241e602df92487a08b5a0025c705abd1017c8cc0d366fb32a02b30b09bb","limit":50},"geoJson":{},"externalId":""}]},{"customer":{"customerId":51390,"identifier":"test-297","phone":"","email":"test-297@viatick.com","remark":"","date":"2021-11-15T11:12:00.000Z","os":"","thingName":null,"thingArn":null,"thingId":null,"uuid":"F7826DA6-4FA2-4E98-8024-BC5B71E0893A","major":6,"minor":1396,"deviceUUID":"b72b09af5de2","rotatingId":0,"lastRotation":null,"live":null,"associatedDeviceId":1564991,"isAssignedAllZones":true,"properties":null,"aokQuery":false,"lastAOKQuery":null},"zoneRecordId":6414817,"application":5635,"start":"2021-12-23T10:43:00.000Z","end":"2021-12-23T10:43:30.000Z","iBeacon":null,"isAuto":false,"device":null,"zones":[{"zoneId":417243,"name":"Zone 5","remark":"","image":null,"range":20,"active":true,"properties":{"eventID":1,"uuid":"18","mapID":null,"zoneID":null,"mapImg":null,"eventName":"event 18","startDateTime":"2021-11-22T09:41:18.000Z","endDateTime":"2022-12-07T22:00:00.000Z","TimeZoneMinutes":480,"Location":null,"Remarks":null,"Enabled":true,"coverImg":null,"scope":"336f0241e602df92487a08b5a0025c705abd1017c8cc0d366fb32a02b30b09bb","limit":50},"geoJson":{},"externalId":""}]}]
```

##### Get List of BMS Zones
getZones()
* Example:
```javascript

const zones = await bmsSDK.getZones();
```

* Example response:
```javascript
[{"__typename":"Zone","zoneId":417239,"name":"Zone 1"},{"__typename":"Zone","zoneId":417240,"name":"Zone 1"}]
```
