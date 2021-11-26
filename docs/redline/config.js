let topTitleDiv = 
    '<a href="https://sltrib.com"><img class="masthead" src="https://sltrib.com/pf/resources/svg/Trib_masthead_top_000000.svg?d=244" width="300" height="100" alt="The Salt Lake Tribune Logo Top" class="tribheadlogo"></a></div>'+
    '<hr style=opacity:.5>';

let titleDiv =
    "<br/>"+
    "<h1 style='max-width:800px' class='headline'><font id='stained'>Stained: </font>Redlining and other past housing discrimination still shape Utah today</h1>";

let bylineDiv = "<p style='max-width:800px'>By <a id='byline' href='https://www.sltrib.com/staff/shaneburke/'>Shane Burke</a>  |  Nov. 29, 2021, 7:00 a.m.</p>";

let descriptionDiv =
    '<hr style=opacity:.5>'+
    '<p style="max-width:800px">In the 1950s, Epifanio Gonzales, a World War II veteran, tried to purchase a home in the Marmalade district of Salt Lake City.<p>'+
    '<p style="max-width:800px">“He had the financial means to do so, but was informed that he couldn’t purchase a home there,” said Jennifer Mayer-Glenn, his great niece. “He was told that Mexicans were not allowed to buy a home in the Marmalade area.”</p>'+
    '<p style="max-width:800px">Gonzales’ experience was the result of racist housing policies that withheld home mortgages in majority white and upper class neighborhoods from people of color, immigrants and people with low incomes. </p>' +
    '<p style="max-width:800px">Mortgage owners, like the government-backed Home Owners’ Loan Corporation, created maps that outlined the “desirable” neighborhoods and dubiously named “hazardous” neighborhoods, in a practice known as redlining.</p>' +
    '<p style="max-width:800px">Redlining reinforced segregation, keeping people of color in the “hazardous” neighborhoods, which were outlined on the map with red ink, all while blocking them from accessing the resources necessary to finance a home purchase.</p>' +
    '<p style="max-width:800px">More than 200 cities in America were subject to redlining, including Salt Lake City and Ogden, according to the <a href="https://dsl.richmond.edu/panorama/redlining/#loc=4/41.179/-94.79">University of Richmond’s Mapping Inequality project</a>. Though much reporting has focused on larger cities with higher populations of color, the same forms of segregation were also at play in Utah.</p>' +
    '<p style="max-width:800px">Though redlining was formally banned in 1968 with the Fair Housing Act, its legacy lives on. Its consequences are still visible in Utah today. Without actively investing in these underfunded communities and the families who lost out on home investments, experts say these inequities are doomed to stay the same.</p>' +
    '<p style="max-width:800px">“We see redlining shape the landscape of cities, but also how it has shaped intersecting levels of vulnerability,” said Dr. Mariya Shcheglovitova, a geographer at Utah State University who studies the topic. “You have less homeownership in historically redlined areas because it was harder for people to get mortgages to buy houses and improve houses. And that affects people’s ability to accrue intergenerational wealth.”</p>'+
    "<p style='max-width:800px'>Take a look at how the Home Owners’ Loan Corporation zoned Salt Lake City in 1940 below. This data is courtesy of the University of Richmond’s Mapping Inequality project, which looks at the practice nationwide.</p>"+
    "<p style='max-width:800px' class='instruction'><i>Click on neighborhoods to read their 1940 descriptions from the Home Owners' Loan Corporation.</i></p>";
  
let divChapter1 =
  "<h2 style='max-width:800px; margin-left:auto; margin-right:auto'>A breakdown of Salt Lake City's redlining map</h2>" +
  '<p style="max-width:800px">Looking at Salt Lake City’s zoning, the areas farthest east were deemed most desirable by the Home Owners’ Loan Corporation. Nestled in the foothills, these areas had more white and wealthy residents, as well as more members of the Church of Jesus Christ of Latter-day Saints. Many had housing covenants expressly forbidding people of color from moving in, which were also legal until 1968’s Fair Housing Act. The areas on the west side and downtown—denser areas that were closer to the railroad and industry, were outlined in yellow, red, and grey.</p>';
    
let divChapter2 =
  "<h2>The east-west divide lives on</h2>" +
  '<p style="max-width:800px">Pick any societal issue, and it’s likely that the areas formerly marked “hazardous” and “industrial” face the brunt of it.</p>'+
      '<p style="max-width:800px">These areas have lower household incomes on average than the east side, according to U.S. Census Data.</p>'+
      '<p style="max-width:800px">More individuals suffering from homelessness stay in formerly redlined areas, with past encampments in areas downtown like <a href="https://www.sltrib.com/news/politics/2019/07/01/pioneer-park-coalition/">Rio Grande and Pioneer Park</a>, near <a href="https://www.sltrib.com/news/politics/2021/02/04/camp-last-hope-salt-lake/">the ballpark</a> and along <a href="https://www.sltrib.com/news/2017/10/06/50-tons-of-trash-from-homeless-camps-piles-up-as-jordan-river-clean-up-continues/">the Jordan River west of I-15</a>.</p>'+
      '<p style="max-width:800px">They’ve got less health care access on average than wealthier parts of the east side, leading to worse health outcomes, like some of the <a href="https://www.sltrib.com/news/2020/07/03/new-study-shows-glendale/">worst rates of COVID-19</a> in the state and a <a href="https://www.sltrib.com/news/health/2021/11/05/high-asthma-rates-worse/">disproportionate burden from chronic illnesses like asthma. </p>'+
      '<p style="max-width:800px">These areas are closer to sources of pollution like oil refineries and carcinogen-releasing factories, <a href="https://projects.propublica.org/toxmap/">as reported by ProPublica</a>. Air pollution, too, from the highways and railroads nearby that box in entire neighborhoods.</p>'+
      '<p style="max-width:800px">And less access to green space, which <a href="https://www.sltrib.com/news/environment/2021/09/12/salt-lake-city-looks/">leads to urban heat islands on torrid summer days</a>. </p>'+
      '<p style="max-width:800px">They’ve got fewer <a href="https://www.sltrib.com/artsliving/2020/12/10/why-salt-lake-city-plans/">grocery stores</a> and other services because many businesses stay out of low-income—and less profitable—areas.</p>'+
      '<p style="max-width:800px">The list goes on.</p>'+
      '<p style="max-width:800px">Meanwhile, the areas shaded in green remain the most expensive to live with the best health outcomes.</p>';
    
let divChapter2b =
  '<h2 style="max-width:800px">In “no-lined” areas, home loan authorities overlooked communities entirely</h2>'+
    '<p>While a bright red shade on the map catches the eye as a visceral reminder of a neglected neighborhood, sometimes no color at all was just as bad for a neighborhood’s development prospects. In a phenomenon now called “no-lining,” some existing communities were deemed non-residential by the Home Owners’ Loan Corporation, receiving grades of “industrial,” “commercial,” or none at all.</p>' +
    '<p>No-lining played a uniquely important role in Utah, according to scholars who focus on the topic. Many of these areas hug the railroad tracks and the highway, including areas west of downtown and near the oil refineries in the north of the city. Driving around certain blocks in this area, you can find abandoned homes and roads riddled with potholes, though some new businesses and residential developments are appearing.</p>'+
    '<p>A case of this is near Pioneer Park in downtown Salt Lake City, which was categorized as uninhabitable by the Corporation’s ratings, despite having plenty of residents. </p>'+
    '<p>“That area was one of the more well-known communities in Salt Lake for residents of color and immigrants because of its proximity to railroads,” said Emma Jones, an urban planning graduate student at the University of Utah who has researched redlining in Salt Lake City. “So it’s an interesting depiction to see these areas graded as industrial when there fully were communities around there that the Home Owner Loan Corporation appraisers weren’t registering.”</p>';

let divChapter2c =
  '<h2>Race and redlining</h2>'+
  '<nav id="menu"></nav>'+
  '<p>Experts agree that racial discrimination was a clear objective of redlining in Utah. There’s even some mention of race in the historical descriptions of neighborhoods, as well as coded descriptions like “foreigners,” “railroad and mill workers” and “working people.”</p>'+
  '<p>Many formerly redlined districts are where Salt Lake City’s Hispanic, Black, Asian and Pacific Islander communities reside today. Some of Salt Lake City’s only majority non-white census tracts can be found in formerly redlined areas, like parts of Rose Park, Glendale and Poplar Grove.</p>';

let divChapter3 =
"<h2 style='max-width:800px; margin-left:auto; margin-right:auto'>Not just in Salt Lake City, and not just redlining</h2>" +
'<p>Though Salt Lake City is the largest city in the state, it was not the only place impacted by segregating redlining practices. Ogden, a small city about an hour north, <a href="https://www.standard.net/news/2021/may/26/weber-state-professor-probing-history-of-housing-discrimination-in-ogden/">felt the effects of the practice, too</a>.</p>'+
    '<p>And though other areas of Utah were not officially redlined, that does not mean their housing practices were fair. </p>'+
    '<p>Racial provisions can be found throughout the state in historical real estate covenants, contracts from landowners and homeowners’ associations that detail what is prohibited on purchased land. These covenants barred Black, Latino, Asian and other people of color from living in certain areas. </p>'+
    '<p>Relics of these racist covenants can still be found in housing deeds across the state today, though they are now illegal. Just this year, <a href="https://www.ksl.com/article/50139291/white-property-owners-only-racist-covenants-remain-on-books-in-utah-but-now-theres-a-path-to-fix-them">a KSL investigation</a> reported on a Holladay resident who found a clause that excluded anyone “other than the Caucasian race” from owning a home on his property. The same investigation detailed efforts to remove the exclusionary language moving forward.</p>'+
    '<p>Historian John McCormick, who wrote several books on the development of Salt Lake City, recalls an advertisement he found in the Salt Lake Tribune in 1919 for new homes near Sugar House Park. </p>'+
    '<p>“What the ad said was that only members of the Caucasian race were permitted to buy and hold property in that subdivision,” said McCormick. “That’s a direct quote.” </p>';


let divChapter3b = 
"<h2 style='max-width:800px; margin-left:auto; margin-right:auto'>Future development must account for past discrimination, say experts</h2>" +
'<p>“Oftentimes we talk about redlining as a moment in time that precipitated these things,” said Dr. Mariya Shcheglovitova. “But it’s also a really compelling visual reminder of how uneven and unjust cities can be, and we need that reminder as we live and plan cities today.” </p>'+
    '<p> Salt Lake City’s Mayor Mendenhall has made efforts to take this into account. She keeps a historical redlined map of Salt Lake City on her desk as a reminder of its repercussions.</p>'+
    '<p>"Historically, there has been ... racism baked into how cities have developed, and I believe that’s being perpetuated today," Mayor Mendenhall told Deseret News. "If we aren’t intentionally correcting for it and providing people access to opportunities across the city, then we’re inherently perpetuating it."</p>'+
    '<p>As Salt Lake City booms and these formerly redlined areas pick up on development, experts urge that it is done in a way that serves current residents. </p>'+
    '<p>“Housing affordability is a really important issue in Salt Lake City, so when talking about how the city is moving forward, knowing that these histories are in its past, what is the city doing?” asked Shcheglovitova.</p>'+
    '<p>Development strategies like tax-increment financing, which lets people take out loans based on projected future property values, can push out the most disadvantaged residents if they are not kept in mind, said Emma Jones.</p>'+
    '<p>“These projects are not always bad in areas that are redlined historically, but it’s important to recognize the legacy is still there and we should be mindful as a way to hopefully bring amenities to the community, so people living there currently can enjoy them rather than being pushed out.”</p>';

let footerDiv =
    '<br/>'+
    "<p>A special thanks to Michael Krisch and Juan Francisco Saldarriaga at the Brown Institute for Media Innovation for helping with the development of this interactive template, as well as Allison McCartney. Thanks to the University of Richmond's Mapping Inequality project for collecting, digitizing and publishing data on redlining.<p>"+
    '<br/>';



let config = {
  style: "mapbox://styles/mapbox/dark-v10",
  accessToken:
    "pk.eyJ1Ijoic2hhbmUtYnVya2UiLCJhIjoiY2tpZ3oxNnJzMGlzeDJzczVydWx4ZGMzeiJ9.QqPZm57kHlqS3u0AFGoiWw",
  showMarkers: false,
  markerColor: "#3FB1CE",
  theme: "light",
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
       center: [-111.8777, 40.7581],
        zoom: 12,
        zoomSmall: 10.5,
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
      id: "blank",
      chapterDiv: '<br><br><br></br></br></br><br><br></br>',
      alignment: "blank",
      opacity: 0,
      location: {
       center: [-111.8777, 40.7581],
        zoom: 12,
        zoomSmall: 10.5,
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
      id: "westside",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2,
      
      location: {
       center: [-111.8777, 40.7581],
        zoom: 12,
        zoomSmall: 10.5,
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
      id: "blank",
      chapterDiv: '<br><br><br></br></br><br></br></br>',
      alignment: "blank",
      opacity: 0,
      location: {
        center: [-111.9070468596035, 40.76461108313758],
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
        center: [-111.9070468596035, 40.76461108313758],
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
      id: "blank",
      chapterDiv: '<br><br><br></br></br></br>',
      alignment: "blank",
      opacity: 0,
      location: {
        center: [-111.9070468596035, 40.76461108313758],
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
      id: "raceMap",
      alignment: "right",
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
      id: "blank",
      chapterDiv: '<br><br><br><br></br></br>',
      alignment: "blank",
      opacity: 0,
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
      id: "ogden",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter3,
      location: {
        center: [-111.9738, 41.2230] ,
        zoom: 11.5,
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
      id: "end",
      alignment: "center",
      hidden: false,
      chapterDiv: divChapter3b,
      location: {
       center: [-111.8910, 40.7608],
        zoom: 11,
        zoomSmall: 10.25,
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
  ],
};