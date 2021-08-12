/* First, define what constitutes a small screen.
This will affect the zoom parameter for each chapter. */

var smallMedia = window.matchMedia("(max-width: 600px)").matches;

/* Next, create two variables that will hold:
1. The different types of layers available to Mapbox and their
respective opacity attributes.
2. The possible alignments which could be applied to the vignettes.*/

var layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
  heatmap: ["heatmap-opacity"],
};

var alignments = {
  left: "lefty",
  center: "centered",
  right: "righty",
  full: "fully",
};

/* The next two functions help turn on and off individual
layers through their opacity attributes: The first one gets
the type of layer and the second one adjusts the layer's opacity */

function getLayerPaintType(layer) {
  // Allison note: Your map seems to be getting errors
  // when its looking for the medianIncome layer on your
  // maps. I've commented out the lines causing the errors
  // for now, but that means it's not swapping the opacity
  // on those medianIncome layers. Needs more investigating.
  
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { duration: layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

/* Next, these variables and functions create the story and vignette html
elements, and populate them with the content from the config.js file.
They also assign a css class to certain elements, also based on the
config.js file */


// Main 'story', 'features' and 'header' elements
var story = document.getElementById("story");
var features = document.createElement("div");
var header = document.createElement("div");
features.setAttribute("id", "features");

// If the content exists, then assign it to the 'header' element
// Note how each one of these are assigning 'innerHTML'
if (config.topTitle) {
  var topTitle = document.createElement("div");
  topTitle.innerHTML = config.topTitle;
  header.appendChild(topTitle);
}
if (config.title) {
  var titleText = document.createElement("div");
  titleText.innerHTML = config.title;
  header.appendChild(titleText);
}
if (config.subtitle) {
  var subtitleText = document.createElement("div");
  subtitleText.innerHTML = config.subtitle;
  header.appendChild(subtitleText);
}
if (config.byline) {
  var bylineText = document.createElement("div");
  bylineText.innerHTML = config.byline;
  header.appendChild(bylineText);
}
if (config.description) {
  var descriptionText = document.createElement("div");
  descriptionText.innerHTML = config.description;
  header.appendChild(descriptionText);
}

// If after this, the header has anything in it, it gets appended to the story
if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute("id", "header");
  story.appendChild(header);
}

/* After building the elements and assigning content to the header these
functions will loop through the chapters in the config.js file,
create the vignette elements and assign them their respective content */

config.chapters.forEach((record, idx) => {
  /* These first two variables will hold each vignette, the chapter
    element will go in the container element */
  var container = document.createElement("div");
  var chapter = document.createElement("div");
  // Adds a class to the vignette
  chapter.classList.add("br3");
  // Adds all the content to the vignette's div
  chapter.innerHTML = record.chapterDiv;
  // Sets the id for the vignette and adds the step css attribute
  container.setAttribute("id", record.id);
  container.classList.add("step");
  // If the chapter is the first one, set it to active
  if (idx === 0) {
    container.classList.add("active");
  }
  // Adds the overall theme to the chapter element
  chapter.classList.add(config.theme);
  /* Appends the chapter to the container element and the container
    element to the features element */
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || "centered");
  if (record.hidden) {
    container.classList.add("hidden");
  }
  features.appendChild(container);
});

// Appends the features element (with the vignettes) to the story element
story.appendChild(features);

/* Next, this section creates the footer element and assigns it
its content based on the config.js file */

var footer = document.createElement("div");

// This assigns all the content to the footer element
if (config.footer) {
  var footerText = document.createElement("p");
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
}
// If the footer element contains any content, add it to the story
if (footer.innerText.length > 0) {
  footer.classList.add(config.theme);
  footer.setAttribute("id", "footer");
  story.appendChild(footer);
}

// Adds the Mapbox access token
mapboxgl.accessToken = config.accessToken;

// Honestly, don't know what this does
const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery
    ? "&pluginName=scrollytellingV2"
    : "?pluginName=scrollytellingV2";
  return {
    url: url + suffix,
  };
};

// Creates a variable to hold the starting zoom value
var startingZoom;
// If the screen size is small, it uses the `zoomSmall` value
if (smallMedia) {
  startingZoom = config.chapters[0].location.zoomSmall;
} else {
  startingZoom = config.chapters[0].location.zoom;
}

/* This section creates the map element with the
attributes from the main section of the config.js file */
var map = new mapboxgl.Map({
  container: "map",
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: startingZoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
  interactive: false,
  transformRequest: transformRequest,
});

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// Instantiates the scrollama function
var scroller = scrollama();

/* Here we add the two extra layers we are using, just like in our previous
tutorial. At the end, however, we setup the functions that will tie the
scrolling to the chapters and move the map from one location to another
while changing the zoom level, pitch and bearing */

map.on("load", function () {
  // Add 3d terrain if necessary
  if (config.use3dTerrain) {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    // Add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

    // Add a sky layer that will show when the map is highly pitched
    
    
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 0.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
  }
  
  
  map.addLayer({
    id: "bridgeRatings",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/countiesBridgeDataTest.geojson",
    },
    maxzoom: 8,
    'paint': {
      'fill-color': [
      'interpolate',
      ['linear'],
      ['get', 'LOWEST_RATING'],
     0,
     '#ff0d0d',
     3,
     '#ff4e11',
     4,
     '#ff8e15',
     5,
     '#fca022',
     6,
     '#fab733',
     7,
     '#acb334',
     8,
     '#69b34c',
     9,
     '#69b34c',
      ],
      "fill-opacity": .75
    }, 
  }, "waterway-label");
  
  map.addLayer({
    id: "us_counties_bridge_rating_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/countiesBridgeDataTest.geojson",
    },
    //maxzoom: 11,
    //minzoom: 6,
    paint: {
      "line-color": "lightgrey",
      "line-width": 0.05
    },
  });


  
  map.addLayer({
    id: "us_states_bridge_rating_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/statesBridgeData.geojson",
    },
    maxzoom: 6,
    paint: {
      "line-color": "lightgrey",
      "line-width": 1,
    },
    
  }, "waterway-label" );
  
  map.addLayer({
    id: "bridgePoints",
    type: "circle",
    source: {
      type: "geojson",
      data: 'data/bridgePoints.geojson',
    },
    maxzoom: 15,
    paint: {
      'circle-radius': ['to-number', ['get', 'radius']],
      'circle-stroke-color': 'white',
      'circle-stroke-width': 4,
      'circle-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#666',
        ['get', 'color'],
      ],
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.5
      ]
    }
  }, "waterway-label");
  

  
  
  
map.on('click', 'bridgePoints', function (e) {
  var bridgeName = e.features[0].properties.BRIDGENAME
  var state1 = e.features[0].properties.STATE1;
  var state2 = e.features[0].properties.STATE2;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2 align="center">'+bridgeName+'</h2>'
          +'<h4 align="center">Bridge Details:</h4>'
          +'<p>Connects '+state1+' and '+state2+'</p>')
      .addTo(map);
});
  
map.on('click', 'bridgeRatings', function (e) {
  var countyName = e.features[0].properties.COUNTY_NAME
  var stateName = e.features[0].properties.STATE;
  var avgRating = e.features[0].properties.LOWEST_RATING;
  var avgYearConstructed = e.features[0].properties.YEAR_BUILT_027;
  var ADT = e.features[0].properties.ADT_029;
  stateName = stateName.toUpperCase();
  avgRatingRound = avgRating.toFixed(2)

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2 align="center">'+countyName+', '+stateName+'</h2>'
          +'<h4 align="center">Bridge Details:</h4>'
          +'<p>Avg. Rating: '+avgRatingRound+'</p>'
          + '<p>Avg. Year Constructed: '+avgYearConstructed.toFixed(0)+'</p>'
          + '<p>Avg. Daily Traffic: '+ADT.toFixed(0)+'</p>')
      .addTo(map);
});
  

  // Setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
      offset: 0.75,
      progress: true,
    })
    .onStepEnter((response) => {
      var chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      // response.element.classList.add("active");
      let thisZoom;
      if (smallMedia) {
        thisZoom = chapter.location.zoomSmall;
      } else {
        thisZoom = chapter.location.zoom;
      }
      let thisLocation = {
        // Allison edit: removing bearing and pitch
        // seems to smooth out the flyTo operation.
        
        // bearing: chapter.location.bearing,
        center: chapter.location.center,
        // pitch: chapter.location.pitch,
        zoom: thisZoom,
        speed: 1.5,
        essential: true
      };
      map[chapter.mapAnimation || "flyTo"](thisLocation);
      if (config.showMarkers) {
        marker.setLngLat(chapter.location.center);
      }
      if (chapter.onChapterEnter.length > 0) {
        // Allison edit: setLayerOpacity was erroring, causing
        // issues, so commenting out for now
        // chapter.onChapterEnter.forEach(setLayerOpacity);
      }
      if (chapter.callback) {
        window[chapter.callback]();
      }
      if (chapter.rotateAnimation) {
        map.once("moveend", function () {
          const rotateNumber = map.getBearing();
          map.rotateTo(rotateNumber + 90, {
            duration: 24000,
            easing: function (t) {
              return t;
            },
          });
        });
      }
    })
    .onStepExit((response) => {
      var chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      response.element.classList.remove("active");
      if (chapter.onChapterExit.length > 0) {
        // Allison edit: setLayerOpacity was erroring, causing
        // issues, so commenting out for now
        // chapter.onChapterExit.forEach(setLayerOpacity);
      }
    });
});

/* Here we watch for any resizing of the screen to
adjust our scrolling setup */
window.addEventListener("resize", scroller.resize);


const zoomThreshold = 7;
 
const stateLegendEl = document.getElementById('state-legend');
map.on('zoom', () => {
if (map.getZoom() < zoomThreshold) {
stateLegendEl.style.display = 'block';
} else {
stateLegendEl.style.display = 'none';
}
});
  