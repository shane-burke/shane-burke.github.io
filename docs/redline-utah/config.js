let topTitleDiv = " ";

let titleDiv =
  "<h1 style='max-width:800px' class='headline'>UTAH'S HISTORICAL REDLINING STILL IMPACTS WEST SIDE COMMUNITIES TODAY</h1>";

let bylineDiv = "<p style='max-width:800px'>BY SHANE BURKE</p>";

let descriptionDiv =
    '<hr/>'+
    '<p style="max-width:800px">Intro text and lede</p>';

let divChapter1 =
  '<p>More on Salt Lake and redlining.</p>'+
  '<p>Encouraged to click on each district to learn more about what was written then</p>' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus nulla, dapibus eget scelerisque id, pharetra ultrices metus. Praesent blandit ligula diam, eu laoreet justo semper ut. Donec pellentesque varius ipsum, in tincidunt lorem faucibus eget. In hac habitasse platea dictumst. Aenean blandit et urna vel convallis. Proin blandit, erat eget volutpat scelerisque, est nulla sagittis quam, nec lobortis urna leo et enim. In eu ex sollicitudin, congue odio id, maximus metus. Donec laoreet ligula laoreet nulla blandit, nec viverra mauris consectetur. Donec eu sodales leo, vel tincidunt diam. Phasellus at ante aliquam, condimentum lectus eu, euismod risus. Morbi aliquet nisi eros. Cras et tempor sem, nec vulputate risus. Praesent aliquet risus a ipsum aliquet fermentum. Aliquam erat volutpat.</p>' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque varius ipsum, in tincidunt lorem faucibus eget. In hac habitasse platea dictumst. Aenean blandit et urna vel convallis. Proin blandit, erat eget volutpat scelerisque, est nulla sagittis quam, nec lobortis urna leo et enim. In eu ex sollicitudin, congue odio id, maximus metus. Donec laoreet ligula laoreet nulla blandit, nec viverra mauris consectetur. Donec eu sodales leo, vel tincidunt diam. Phasellus at ante aliquam, condimentum lectus eu, euismod risus. Morbi aliquet nisi eros. Cras et tempor sem, nec vulputate risus. Praesent aliquet risus a ipsum aliquet fermentum. Aliquam erat volutpat.</p>';

let divChapter2 =
  "<h3>The West Side</h3>" +
  '<p>More on the West Side</p>'+
    '<p>Vivamus eleifend sapien vel felis euismod dignissim. Curabitur vel risus at orci vestibulum ullamcorper quis sit amet sem. Mauris ultrices risus ac lectus volutpat, sed maximus purus faucibus. Quisque dolor odio, rhoncus sit amet interdum ut, iaculis et dolor. Mauris ac ex augue. Mauris tincidunt est ultricies aliquet bibendum. Curabitur risus orci, bibendum interdum tellus nec, bibendum suscipit ex.</p>';
    

let divChapter2b =
  '<p>More on the "NO LINED" industrial areas of downtown</p>'+
        '<p>Vivamus eleifend sapien vel felis euismod dignissim. Curabitur vel risus at orci vestibulum ullamcorper quis sit amet sem. Mauris ultrices risus ac lectus volutpat, sed maximus purus faucibus. Quisque dolor odio, rhoncus sit amet interdum ut, iaculis et dolor. Mauris ac ex augue. Mauris tincidunt est ultricies aliquet bibendum. Curabitur risus orci, bibendum interdum tellus nec, bibendum suscipit ex.</p>';
  ;


let divChapter2c =
  '<p>Add in race map dot layer to show where different populations live now compared to redlining</p>'+
        '<p>Vivamus eleifend sapien vel felis euismod dignissim. Curabitur vel risus at orci vestibulum ullamcorper quis sit amet sem. Mauris ultrices risus ac lectus volutpat, sed maximus purus faucibus. Quisque dolor odio, rhoncus sit amet interdum ut, iaculis et dolor. Mauris ac ex augue. Mauris tincidunt est ultricies aliquet bibendum. Curabitur risus orci, bibendum interdum tellus nec, bibendum suscipit ex.</p>';
    ;


let divChapter3 =
"<h3 style='max-width:800px; margin-left:auto; margin-right:auto'>Ogden</h3>" +
'<p>Morbi aliquam vitae sem sed aliquam. Suspendisse potenti. Duis malesuada ipsum eget augue hendrerit elementum. In quis est velit. Donec porta ligula orci, vitae aliquet enim aliquam et. Sed feugiat magna eu massa condimentum facilisis. Suspendisse sodales dolor cursus mollis elementum. Sed viverra justo eget finibus viverra. Mauris vestibulum blandit purus. Ut ut luctus diam. Pellentesque luctus sapien a ipsum imperdiet vulputate. Vestibulum vitae porta nulla. Etiam consequat porta sem nec mollis. Fusce ultricies feugiat orci id dignissim. In et est purus.</p>';
    
let divChapter3b = 
"<p>Footer/end notes</p>";

let footerDiv =
  "<p>Footer/end notes</p>" +
    '<p>Morbi aliquam vitae sem sed aliquam. Suspendisse potenti. Duis malesuada ipsum eget augue hendrerit elementum. In quis est velit. Donec porta ligula orci, vitae aliquet enim aliquam et. Sed feugiat magna eu massa condimentum facilisis. Suspendisse sodales dolor cursus mollis elementum. Sed viverra justo eget finibus viverra. Mauris vestibulum blandit purus. Ut ut luctus diam. Pellentesque luctus sapien a ipsum imperdiet vulputate. Vestibulum vitae porta nulla. Etiam consequat porta sem nec mollis. Fusce ultricies feugiat orci id dignissim. In et est purus.</p>'+
    '<p>Morbi aliquam vitae sem sed aliquam. Suspendisse potenti. Duis malesuada ipsum eget augue hendrerit elementum. In quis est velit. Donec porta ligula orci, vitae aliquet enim aliquam et. Sed feugiat magna eu massa condimentum facilisis. Suspendisse sodales dolor cursus mollis elementum. Sed viverra justo eget finibus viverra. Mauris vestibulum blandit purus. Ut ut luctus diam. Pellentesque luctus sapien a ipsum imperdiet vulputate. Vestibulum vitae porta nulla. Etiam consequat porta sem nec mollis. Fusce ultricies feugiat orci id dignissim. In et est purus.</p>';
  ;


let config = {
  style: "mapbox://styles/mapbox/dark-v10",
  accessToken:
    "pk.eyJ1Ijoic2hhbmUtYnVya2UiLCJhIjoiY2tpZ3oxNnJzMGlzeDJzczVydWx4ZGMzeiJ9.QqPZm57kHlqS3u0AFGoiWw",
  showMarkers: false,
  markerColor: "#3FB1CE",
  theme: "dark",
  use3dTerrain: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  subtitle: "",
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,
  chapters: [
    {
      id: "overallMap",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter1,
      location: {
       center: [-111.8910, 40.7608],
        zoom: 11,
        zoomSmall: 10.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "westside",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2,
      location: {
        center: [-111.9470468596035, 40.76461108313758],
        zoom: 12.5,
        zoomSmall: 11.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "medianIncome",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "medianIncome",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "noline",
      alignment: "center",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2b,
      location: {
        center: [-111.8970468596035, 40.77461108313758],
        zoom: 13,
        zoomSmall: 12,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "medianIncome",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "medianIncome",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "raceMap",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter2c,
      location: {
       center: [-111.8910, 40.7608],
        zoom: 11,
        zoomSmall: 10.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "ogden",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter3,
      location: {
        center: [-111.97095920111948, 41.22476984664705] ,
        zoom: 10.5,
        zoomSmall: 11.5,
        pitch: 40,
        bearing: -7,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "medianIncome",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "medianIncome",
          opacity: 0,
          duration: 300,
        },
      ],
    },
  ],
};