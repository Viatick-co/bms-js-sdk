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

initMap(mapViewId, '[SDK_KEY]')

* You'll need to supply the id of the map's container that you want to contain the map on, and the SDK Key.

* For example:
```html
<div id="mapView" />
```

```javascript
const mapViewId = 'mapView';
const mapView = await bmsSDK.initMap(mapViewId, '[SDK_KEY]')
```

##### Add a single marker
