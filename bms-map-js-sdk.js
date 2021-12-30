let mapview, venue, zoneList, lastSDKKey;

const accessTokenMap = {
  '336f0241e602df92487a08b5a0025c705abd1017c8cc0d366fb32a02b30b09bb': 'eyJraWQiOiJiQzBvc1RGRVJLUHlNTDB0SStGdXF3bkhqZkFlUGxcL3VCdDN0UncrNjY1WT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MzdpMW84NDVrNGd2ZDFhdjRhcTlqZHFtOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXBpXC8zMzZmMDI0MWU2MDJkZjkyNDg3YTA4YjVhMDAyNWM3MDVhYmQxMDE3YzhjYzBkMzY2ZmIzMmEwMmIzMGIwOWJiIiwiYXV0aF90aW1lIjoxNjM3NTQ5NDk5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfUUZ3d21KRjY1IiwiZXhwIjoxNjM3NTUzMDk5LCJpYXQiOjE2Mzc1NDk0OTksInZlcnNpb24iOjIsImp0aSI6Ijk3ZjU5MjhmLWI1ZTctNDM4Zi1hMTIzLTZlOTBmYTljNGYwZiIsImNsaWVudF9pZCI6IjUzN2kxbzg0NWs0Z3ZkMWF2NGFxOWpkcW04In0.BZAaQDWaJYSLeQczSwRPWpDOhprCVbCBdtpaWBO4Aw-YnVyukzSko_-YEfqC_ti5zflYNhQRHJqQfxI4vAa4oAPjuK-FO3FkvGRSJYRUMCgjFMmA9ctnJVkmVAtKR0X_KbIHEipUR1WLDrsaG91kpxWB4wFxEh_I6IierykjFN6ZoxsI0xlObDLcvfkar_5vIHHlz5lmPwwUvublQ0GcOTO4KGcmIkuCpAYm69slpvZqZ7hF5EjhtHazAZBtFN0jg5tBlLcsNWFi1aiADKK0L9JUb4YBhiB_MSkqcDTHNcL_WmLleWXJ8DNiz5QDGGAi6mksiPmWqTk-SIF56mkovQ'
};

const createZoneMarker = (content) => `
  <div class="zone-marker">
    ${content}
  </div>`;

    const showZonesDensity = () => {
      console.log('venue.locations', venue.locations);
      // zoneList = venue.locations.reduce((acc, location) => {
      //   // if (location.type === "zones") {
      //   //   const foundSyncedZone = syncedZones.find(
      //   //     (zone) => zone.name === location.name && zone.map.mapId === mapId
      //   //   );
      //   //   if (foundSyncedZone) {
      //   //     location.bmsZoneId = foundSyncedZone.zoneId;
      //   //     acc.push(location);
      //   //   }
      //   // }
      //   //location.bmsZoneId = foundSyncedZone.zoneId;
      //   // acc.push({
      //   //   id: location.id,
      //   //   name: location.name,
      //   //   x: _.get(location, "nodes[0].x"),
      //   //   y: _.get(location, "nodes[0].y"),
      //   //   polygons: location.polygons
      //   // });
      //   //location.bmsZoneId = 1;
      //   acc.push(location);
      //   return acc;
      // }, []);

      // markersMap = zoneList.reduce((acc, zone) => {
      //   if (zone.polygons.length && mapview) {
      //     const marker = mapview.createMarker(
      //       createZoneMarker(),
      //       mapview.getPositionPolygon(zone.polygons[0].id),
      //       "zone-mark-container"
      //     );
      //     marker &&
      //       marker.addEventListener("click", (e) => {
      //         onPolygonClicked(zone.polygons[0].id);
      //       });
      //     acc[zone.bmsZoneId] = marker;
      //   }
      //   return acc;
      // }, {});
      // window.markers = markersMap;
    };

    function getLocationForPolygonId(polygonId) {
      console.log("getLocationForPolygonId -> polygonId", polygonId);
      return venue.locations.find((location) =>
        location.polygons.some((polygon) => polygon.id === polygonId)
      );
    }

    function onPolygonClicked(polygonId) {
      const location = getLocationForPolygonId(polygonId);
      console.log("onPolygonClicked -> location", location);
      if (location && location.bmsZoneId) {
        // onSelectZone(location.bmsZoneId);
      }
    }

    function onNothingClicked() {
      mapview.clearAllPolygonColors();
    }

async function postData(url = '', data = {}, headers) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const getAccessToken = async function (sdkKey) {
    if (accessTokenMap[sdkKey]) {
      return accessTokenMap[sdkKey];
    } else {
      const headers = { "grant_type": "client_credentials", "scope": sdkKey, "Content-Type": "application/json" };
      const response = await postData("https://bms-api.viatick.com/dev/sdk/oauth2/token", {}, headers);
      console.log('response', response);
      accessTokenMap[sdkKey] = response.access_token;
      return response.access_token;
    }
}

const getNewAccessToken = async function (sdkKey) {
  const headers = { "grant_type": "client_credentials", "scope": sdkKey };
  const response = await postData("https://bms-api.viatick.com/dev/sdk/oauth2/token", {}, headers);
  accessTokenMap[sdkKey] = response.access_token;
  return response.access_token;
}

const bmsGetMaps = async function (sdkKey) {
    const accessToken = await getAccessToken(sdkKey);
    try {
      let input = {
        "field": "getMaps",
        "arguments": {
        },
        "authorization": "Bearer " + accessToken,
      }
      let response = await postData("https://bms-api.viatick.com/dev/api/restful", input);
      console.log('response', response);

      if (response.statusCode == 403 && response.type == 'Unauthorized') {
        const newToken = await getNewAccessToken(sdkKey);
        return bmsGetMaps(sdkKey);
      }

      return response;
    } catch (e) {
      console.error('e', e);
      if (e.response.statusCode == 403 && e.response.type == "Unauthorized") {
        const newToken = await getNewAccessToken(sdkKey);
        // input.authorization = newToken;
        // response = await axios.post("https://bms-api.viatick.com/dev/api/restful", input)
        return bmsGetMaps(sdkKey);
      }
    }
}

class BMSSDK {
  async initMap(mapViewId, sdkKey) {
    lastSDKKey = sdkKey;
    return new Promise(function (resolve, reject) {
      console.log('mapViewId', mapViewId);
      console.log('sdkKey', sdkKey);

      function initializeMapOptions() {

            mapview.addInteractivePolygonsForAllLocations();
            //mapview.onPolygonClicked = onPolygonClicked;
            //mapview.onNothingClicked = onNothingClicked;
            mapview.labelAllLocations({
              // smartLabels: true,
              appearance: {
                text: {
                  foregroundColor: "white",
                  backgroundColor: "#333",
                },
                marker: {
                  foregroundColor: {
                    active: "white",
                    inactive: undefined,
                  },
                  backgroundColor: {
                    active: "#333",
                    inactive: undefined,
                  },
                }
              }
            });

            resolve(mapview);

            //console.log('mapview', mapview);
            // mapview.colors = {
            //   hover: 0xcccccc,
            // };
      }

      const initMappedIn = async function () {
        const maps = await bmsGetMaps(sdkKey);
        console.log('maps', maps);

        var mapsSortedByElevation = []
        var div = document.getElementById(mapViewId)
        var mapExpanded = false

        // options for Mappedin.getVenue
        // To get you started we've provided a key and secret that has access to some demo venues.
        //  - mappedin-demo-mall
        //  - mappedin-demo-retail-2
        //  - warehouse-demo
        //  - mappedin-demo-city
        //  - rail-demo
        //  - mappedin-demo-stadium
        //  - mappedin-demo-entertainment-park
        // Speak with a Mappedin representative when you are ready to get your own key and secret set up with access to your own venues.
        // You may need to customize these options with the data provided by Mappedin for your venue.
        var venueOptions = {
          clientId: "5f93249aa5fdf5001a6b9757",
          clientSecret: "mpXGa2zgY1b0b8OhigR0oGlOZ08uT7vHrpIe9is5RMAyXEKL",
          perspective: "Website",
          things: {
            venue: ["slug", "name"],
            categories: ["name"],
            maps: ["name", "elevation", "shortName"],
            locations: ["name", "type", "description", "icon", "logo"],
          },
        	venue: maps[0].providerMapId
        };

        // Options for the MapView constructor
        var mapviewOptions = {
              antialias: "AUTO",
              mode: window.Mappedin.modes.TEST,
              onDataLoaded: initializeMapOptions,
              //onFirstMapLoaded: showZonesDensity
        };

        // Options for search
        var searchOptions = {
        	key: "",
        	secret: ""
        }

        // Combined all of them to use Mappedin.initalize
        var options = {
        	mapview: mapviewOptions,
        	venue: venueOptions,
        }

        return Mappedin.initialize(options, div).then(function (data) {
          window.map = data;
          mapview = data.mapview;

          mapview.colors = {
            hover: 0xcccccc,
            select: 0x4ca1fc,
            text: 0x000000,
            path: 0xff834c,
            pathPulse: 0xffffff,
            textSelect: 0xffffff
          };

          venue = data.venue;
          zoneList = venue.locations;

          return Promise.resolve(mapview);
          // var locations = venue.locations;
          // console.log('locations', locations);
          // for (var j = 0, jLen = locations.length; j < jLen; ++j) {
          //   var location = locations[j];
          //
          //   var locationPolygons = location.polygons;
          //   console.log('location.polygons', location.polygons);
          //   for (var k = 0, kLen = locationPolygons.length; k < kLen; ++k) {
          //     var polygon = locationPolygons[k];
          //     mapview.addInteractivePolygon(polygon.id);
          //   };
          // };

          //mapview.addInteractivePolygonsForAllLocations();
          //mapview.labelAllLocations();

          // mapview.labelAllLocations({
          //   smartLabels: true,
          //   // appearance: {
          //   //   text: {
          //   //     foregroundColor: "white",
          //   //     backgroundColor: "#333",
          //   //   },
          //   //   marker: {
          //   //     foregroundColor: {
          //   //       active: "white",
          //   //       inactive: undefined,
          //   //     },
          //   //     backgroundColor: {
          //   //       active: "#333",
          //   //       inactive: undefined,
          //   //     },
          //   //   }
          //   // }
          // });
        });
      }

      var js = document.createElement("script");

      js.type = "text/javascript";
      js.src = "https://d1p5cqqchvbqmy.cloudfront.net/websdk/v1.63.16/mappedin.js";

      js.onload = function() {
       //Code using this script here
       initMappedIn().then(function (m) {
         console.log('initMappedIn', 'done');
         //resolve(mapview);
       });
      };

      document.body.appendChild(js);
    });
  }

  addMarker(zoneName, content, onClicked) {
    const zone = zoneList.find(function (z) { return z.name == zoneName});
    console.log('zoneList', zoneList);
    console.log('zone', zone);

    const marker = mapview.createMarker(
      createZoneMarker(content),
      mapview.getPositionPolygon(zone.polygons[0].id),
      "zone-mark-container"
    );
    marker &&
      marker.addEventListener("click", (e) => {
        onClicked(zone);
      });
  }

  addMarkers(zoneContents) {
    zoneContents.forEach(function(zoneContent) {
      const zoneName =  zoneContent.zoneName;
      const content =  zoneContent.content;
      const onClicked =  zoneContent.onClicked;
      const zone = zoneList.find(function (z) { return z.name == zoneName});
      console.log('zoneList', zoneList);
      console.log('zone', zone);

      const marker = mapview.createMarker(
        createZoneMarker(content),
        mapview.getPositionPolygon(zone.polygons[0].id),
        "zone-mark-container"
      );
      marker &&
        marker.addEventListener("click", (e) => {
          onClicked(zone);
        });
    })
  }

  async getLastProperZoneRecords() {
    const accessToken = await getAccessToken(lastSDKKey);
    try {
      let input = {
        "field": "getLastProperZoneRecords",
        "arguments": {
        },
        "authorization": "Bearer " + accessToken,
      }
      let response = await postData("https://bms-api.viatick.com/dev/api/restful", input);
      console.log('response', response);

      if (response.statusCode == 403 && response.type == 'Unauthorized') {
        const newToken = await getNewAccessToken(sdkKey);
        return bmsGetMaps(sdkKey);
      }

      return response;
    } catch (e) {
      console.error('e', e);
      if (e.response.statusCode == 403 && e.response.type == "Unauthorized") {
        const newToken = await getNewAccessToken(sdkKey);
        // input.authorization = newToken;
        // response = await axios.post("https://bms-api.viatick.com/dev/api/restful", input)
        return getLastProperZoneRecords(sdkKey);
      }
    }
  }

  async getLastInversedZoneRecords() {
    const accessToken = await getAccessToken(lastSDKKey);
    try {
      let input = {
        "field": "getLastInversedZoneRecords",
        "arguments": {
        },
        "authorization": "Bearer " + accessToken,
      }
      let response = await postData("https://bms-api.viatick.com/dev/api/restful", input);
      console.log('response', response);

      if (response.statusCode == 403 && response.type == 'Unauthorized') {
        const newToken = await getNewAccessToken(sdkKey);
        return bmsGetMaps(sdkKey);
      }

      return response;
    } catch (e) {
      console.error('e', e);
      if (e.response.statusCode == 403 && e.response.type == "Unauthorized") {
        const newToken = await getNewAccessToken(sdkKey);
        // input.authorization = newToken;
        // response = await axios.post("https://bms-api.viatick.com/dev/api/restful", input)
        return getLastInversedZoneRecords(sdkKey);
      }
    }
  }

  async getZones() {
    const accessToken = await getAccessToken(lastSDKKey);
    try {
      let input = {
        "field": "getZones",
        "arguments": {
        },
        "authorization": "Bearer " + accessToken,
      }
      let response = await postData("https://bms-api.viatick.com/dev/api/restful", input);
      console.log('response', response);

      if (response.statusCode == 403 && response.type == 'Unauthorized') {
        const newToken = await getNewAccessToken(sdkKey);
        return bmsGetMaps(sdkKey);
      }

      return response;
    } catch (e) {
      console.error('e', e);
      if (e.response.statusCode == 403 && e.response.type == "Unauthorized") {
        const newToken = await getNewAccessToken(sdkKey);
        // input.authorization = newToken;
        // response = await axios.post("https://bms-api.viatick.com/dev/api/restful", input)
        return getZones(sdkKey);
      }
    }
  }
}
