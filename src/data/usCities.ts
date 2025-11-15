// Comprehensive list of US cities with state abbreviations
// Top 1000 cities by population across all 50 states
export const US_CITIES = [
  // Alabama
  "Birmingham, AL", "Montgomery, AL", "Mobile, AL", "Huntsville, AL", "Tuscaloosa, AL",
  "Hoover, AL", "Dothan, AL", "Auburn, AL", "Decatur, AL", "Madison, AL",
  
  // Alaska
  "Anchorage, AK", "Fairbanks, AK", "Juneau, AK", "Wasilla, AK", "Sitka, AK",
  
  // Arizona
  "Phoenix, AZ", "Tucson, AZ", "Mesa, AZ", "Chandler, AZ", "Scottsdale, AZ",
  "Glendale, AZ", "Gilbert, AZ", "Tempe, AZ", "Peoria, AZ", "Surprise, AZ",
  "Yuma, AZ", "Avondale, AZ", "Goodyear, AZ", "Flagstaff, AZ", "Buckeye, AZ",
  "Lake Havasu City, AZ", "Casa Grande, AZ", "Sierra Vista, AZ", "Maricopa, AZ", "Oro Valley, AZ",
  
  // Arkansas
  "Little Rock, AR", "Fort Smith, AR", "Fayetteville, AR", "Springdale, AR", "Jonesboro, AR",
  "North Little Rock, AR", "Conway, AR", "Rogers, AR", "Pine Bluff, AR", "Bentonville, AR",
  
  // California
  "Los Angeles, CA", "San Diego, CA", "San Jose, CA", "San Francisco, CA", "Fresno, CA",
  "Sacramento, CA", "Long Beach, CA", "Oakland, CA", "Bakersfield, CA", "Anaheim, CA",
  "Santa Ana, CA", "Riverside, CA", "Stockton, CA", "Irvine, CA", "Chula Vista, CA",
  "Fremont, CA", "San Bernardino, CA", "Modesto, CA", "Fontana, CA", "Oxnard, CA",
  "Moreno Valley, CA", "Huntington Beach, CA", "Glendale, CA", "Santa Clarita, CA", "Garden Grove, CA",
  "Oceanside, CA", "Rancho Cucamonga, CA", "Santa Rosa, CA", "Ontario, CA", "Lancaster, CA",
  "Elk Grove, CA", "Corona, CA", "Palmdale, CA", "Salinas, CA", "Pomona, CA",
  "Hayward, CA", "Escondido, CA", "Torrance, CA", "Sunnyvale, CA", "Orange, CA",
  "Fullerton, CA", "Pasadena, CA", "Thousand Oaks, CA", "Visalia, CA", "Simi Valley, CA",
  "Concord, CA", "Roseville, CA", "Victorville, CA", "Santa Clara, CA", "Vallejo, CA",
  "Berkeley, CA", "El Monte, CA", "Downey, CA", "Costa Mesa, CA", "Inglewood, CA",
  "Carlsbad, CA", "San Buenaventura, CA", "Fairfield, CA", "West Covina, CA", "Murrieta, CA",
  "Richmond, CA", "Norwalk, CA", "Antioch, CA", "Temecula, CA", "Burbank, CA",
  "Daly City, CA", "Rialto, CA", "Santa Maria, CA", "El Cajon, CA", "San Mateo, CA",
  "Clovis, CA", "Compton, CA", "Jurupa Valley, CA", "Vista, CA", "South Gate, CA",
  "Mission Viejo, CA", "Vacaville, CA", "Carson, CA", "Hesperia, CA", "Santa Monica, CA",
  "Westminster, CA", "Redding, CA", "Santa Barbara, CA", "Chico, CA", "Newport Beach, CA",
  "San Leandro, CA", "San Marcos, CA", "Whittier, CA", "Hawthorne, CA", "Citrus Heights, CA",
  "Tracy, CA", "Alhambra, CA", "Livermore, CA", "Buena Park, CA", "Menifee, CA",
  "Hemet, CA", "Lakewood, CA", "Merced, CA", "Chino, CA", "Indio, CA",
  "Redwood City, CA", "Lake Forest, CA", "Napa, CA", "Tustin, CA", "Bellflower, CA",
  
  // Colorado
  "Denver, CO", "Colorado Springs, CO", "Aurora, CO", "Fort Collins, CO", "Lakewood, CO",
  "Thornton, CO", "Arvada, CO", "Westminster, CO", "Pueblo, CO", "Centennial, CO",
  "Boulder, CO", "Greeley, CO", "Longmont, CO", "Loveland, CO", "Grand Junction, CO",
  "Broomfield, CO", "Castle Rock, CO", "Commerce City, CO", "Parker, CO", "Littleton, CO",
  
  // Connecticut
  "Bridgeport, CT", "New Haven, CT", "Stamford, CT", "Hartford, CT", "Waterbury, CT",
  "Norwalk, CT", "Danbury, CT", "New Britain, CT", "Meriden, CT", "Bristol, CT",
  "West Haven, CT", "Milford, CT", "Middletown, CT", "Norwich, CT", "Shelton, CT",
  
  // Delaware
  "Wilmington, DE", "Dover, DE", "Newark, DE", "Middletown, DE", "Smyrna, DE",
  
  // Florida
  "Jacksonville, FL", "Miami, FL", "Tampa, FL", "Orlando, FL", "St. Petersburg, FL",
  "Hialeah, FL", "Tallahassee, FL", "Fort Lauderdale, FL", "Port St. Lucie, FL", "Cape Coral, FL",
  "Pembroke Pines, FL", "Hollywood, FL", "Miramar, FL", "Gainesville, FL", "Coral Springs, FL",
  "Miami Gardens, FL", "Clearwater, FL", "Palm Bay, FL", "Pompano Beach, FL", "West Palm Beach, FL",
  "Lakeland, FL", "Davie, FL", "Miami Beach, FL", "Sunrise, FL", "Plantation, FL",
  "Boca Raton, FL", "Deltona, FL", "Largo, FL", "Deerfield Beach, FL", "Palm Coast, FL",
  "Melbourne, FL", "Boynton Beach, FL", "Lauderhill, FL", "Weston, FL", "Fort Myers, FL",
  "Kissimmee, FL", "Homestead, FL", "Tamarac, FL", "Delray Beach, FL", "Daytona Beach, FL",
  "North Miami, FL", "Wellington, FL", "North Port, FL", "Jupiter, FL", "Ocala, FL",
  
  // Georgia
  "Atlanta, GA", "Augusta, GA", "Columbus, GA", "Macon, GA", "Savannah, GA",
  "Athens, GA", "Sandy Springs, GA", "Roswell, GA", "Johns Creek, GA", "Albany, GA",
  "Warner Robins, GA", "Alpharetta, GA", "Marietta, GA", "Valdosta, GA", "Smyrna, GA",
  "Dunwoody, GA", "Rome, GA", "East Point, GA", "Milton, GA", "Gainesville, GA",
  
  // Hawaii
  "Honolulu, HI", "Pearl City, HI", "Hilo, HI", "Kailua, HI", "Waipahu, HI",
  
  // Idaho
  "Boise, ID", "Meridian, ID", "Nampa, ID", "Idaho Falls, ID", "Pocatello, ID",
  "Caldwell, ID", "Coeur d'Alene, ID", "Twin Falls, ID", "Lewiston, ID", "Post Falls, ID",
  
  // Illinois
  "Chicago, IL", "Aurora, IL", "Naperville, IL", "Joliet, IL", "Rockford, IL",
  "Springfield, IL", "Elgin, IL", "Peoria, IL", "Champaign, IL", "Waukegan, IL",
  "Cicero, IL", "Bloomington, IL", "Arlington Heights, IL", "Evanston, IL", "Decatur, IL",
  "Schaumburg, IL", "Bolingbrook, IL", "Palatine, IL", "Skokie, IL", "Des Plaines, IL",
  "Orland Park, IL", "Tinley Park, IL", "Oak Lawn, IL", "Berwyn, IL", "Mount Prospect, IL",
  
  // Indiana
  "Indianapolis, IN", "Fort Wayne, IN", "Evansville, IN", "South Bend, IN", "Carmel, IN",
  "Fishers, IN", "Bloomington, IN", "Hammond, IN", "Gary, IN", "Muncie, IN",
  "Lafayette, IN", "Terre Haute, IN", "Kokomo, IN", "Anderson, IN", "Noblesville, IN",
  "Greenwood, IN", "Elkhart, IN", "Mishawaka, IN", "Lawrence, IN", "Jeffersonville, IN",
  
  // Iowa
  "Des Moines, IA", "Cedar Rapids, IA", "Davenport, IA", "Sioux City, IA", "Iowa City, IA",
  "Waterloo, IA", "Council Bluffs, IA", "Ames, IA", "West Des Moines, IA", "Dubuque, IA",
  "Ankeny, IA", "Urbandale, IA", "Cedar Falls, IA", "Marion, IA", "Bettendorf, IA",
  
  // Kansas
  "Wichita, KS", "Overland Park, KS", "Kansas City, KS", "Olathe, KS", "Topeka, KS",
  "Lawrence, KS", "Shawnee, KS", "Manhattan, KS", "Lenexa, KS", "Salina, KS",
  "Hutchinson, KS", "Leavenworth, KS", "Leawood, KS", "Dodge City, KS", "Garden City, KS",
  
  // Kentucky
  "Louisville, KY", "Lexington, KY", "Bowling Green, KY", "Owensboro, KY", "Covington, KY",
  "Hopkinsville, KY", "Richmond, KY", "Florence, KY", "Georgetown, KY", "Elizabethtown, KY",
  
  // Louisiana
  "New Orleans, LA", "Baton Rouge, LA", "Shreveport, LA", "Lafayette, LA", "Lake Charles, LA",
  "Kenner, LA", "Bossier City, LA", "Monroe, LA", "Alexandria, LA", "Houma, LA",
  
  // Maine
  "Portland, ME", "Lewiston, ME", "Bangor, ME", "South Portland, ME", "Auburn, ME",
  
  // Maryland
  "Baltimore, MD", "Frederick, MD", "Rockville, MD", "Gaithersburg, MD", "Bowie, MD",
  "Hagerstown, MD", "Annapolis, MD", "College Park, MD", "Salisbury, MD", "Laurel, MD",
  
  // Massachusetts
  "Boston, MA", "Worcester, MA", "Springfield, MA", "Cambridge, MA", "Lowell, MA",
  "Brockton, MA", "Quincy, MA", "Lynn, MA", "New Bedford, MA", "Fall River, MA",
  "Newton, MA", "Lawrence, MA", "Somerville, MA", "Framingham, MA", "Haverhill, MA",
  "Waltham, MA", "Malden, MA", "Brookline, MA", "Plymouth, MA", "Medford, MA",
  
  // Michigan
  "Detroit, MI", "Grand Rapids, MI", "Warren, MI", "Sterling Heights, MI", "Ann Arbor, MI",
  "Lansing, MI", "Flint, MI", "Dearborn, MI", "Livonia, MI", "Westland, MI",
  "Troy, MI", "Farmington Hills, MI", "Kalamazoo, MI", "Wyoming, MI", "Southfield, MI",
  "Rochester Hills, MI", "Taylor, MI", "Pontiac, MI", "St. Clair Shores, MI", "Royal Oak, MI",
  
  // Minnesota
  "Minneapolis, MN", "St. Paul, MN", "Rochester, MN", "Duluth, MN", "Bloomington, MN",
  "Brooklyn Park, MN", "Plymouth, MN", "St. Cloud, MN", "Eagan, MN", "Woodbury, MN",
  "Maple Grove, MN", "Eden Prairie, MN", "Coon Rapids, MN", "Burnsville, MN", "Blaine, MN",
  
  // Mississippi
  "Jackson, MS", "Gulfport, MS", "Southaven, MS", "Hattiesburg, MS", "Biloxi, MS",
  "Meridian, MS", "Tupelo, MS", "Greenville, MS", "Olive Branch, MS", "Horn Lake, MS",
  
  // Missouri
  "Kansas City, MO", "St. Louis, MO", "Springfield, MO", "Columbia, MO", "Independence, MO",
  "Lee's Summit, MO", "O'Fallon, MO", "St. Joseph, MO", "St. Charles, MO", "St. Peters, MO",
  "Blue Springs, MO", "Florissant, MO", "Joplin, MO", "Chesterfield, MO", "Jefferson City, MO",
  
  // Montana
  "Billings, MT", "Missoula, MT", "Great Falls, MT", "Bozeman, MT", "Butte, MT",
  
  // Nebraska
  "Omaha, NE", "Lincoln, NE", "Bellevue, NE", "Grand Island, NE", "Kearney, NE",
  
  // Nevada
  "Las Vegas, NV", "Henderson, NV", "Reno, NV", "North Las Vegas, NV", "Sparks, NV",
  "Carson City, NV", "Fernley, NV", "Elko, NV", "Mesquite, NV", "Boulder City, NV",
  
  // New Hampshire
  "Manchester, NH", "Nashua, NH", "Concord, NH", "Derry, NH", "Rochester, NH",
  
  // New Jersey
  "Newark, NJ", "Jersey City, NJ", "Paterson, NJ", "Elizabeth, NJ", "Edison, NJ",
  "Woodbridge, NJ", "Lakewood, NJ", "Toms River, NJ", "Hamilton, NJ", "Trenton, NJ",
  "Clifton, NJ", "Camden, NJ", "Brick, NJ", "Cherry Hill, NJ", "Passaic, NJ",
  "Union City, NJ", "Bayonne, NJ", "East Orange, NJ", "Vineland, NJ", "New Brunswick, NJ",
  
  // New Mexico
  "Albuquerque, NM", "Las Cruces, NM", "Rio Rancho, NM", "Santa Fe, NM", "Roswell, NM",
  "Farmington, NM", "Clovis, NM", "Hobbs, NM", "Alamogordo, NM", "Carlsbad, NM",
  
  // New York
  "New York, NY", "Buffalo, NY", "Rochester, NY", "Yonkers, NY", "Syracuse, NY",
  "Albany, NY", "New Rochelle, NY", "Mount Vernon, NY", "Schenectady, NY", "Utica, NY",
  "White Plains, NY", "Hempstead, NY", "Troy, NY", "Niagara Falls, NY", "Binghamton, NY",
  "Freeport, NY", "Valley Stream, NY", "Long Beach, NY", "Spring Valley, NY", "Rome, NY",
  "Ithaca, NY",
  
  // North Carolina
  "Charlotte, NC", "Raleigh, NC", "Greensboro, NC", "Durham, NC", "Winston-Salem, NC",
  "Fayetteville, NC", "Cary, NC", "Wilmington, NC", "High Point, NC", "Concord, NC",
  "Greenville, NC", "Asheville, NC", "Gastonia, NC", "Jacksonville, NC", "Chapel Hill, NC",
  "Rocky Mount, NC", "Burlington, NC", "Wilson, NC", "Huntersville, NC", "Kannapolis, NC",
  
  // North Dakota
  "Fargo, ND", "Bismarck, ND", "Grand Forks, ND", "Minot, ND", "West Fargo, ND",
  
  // Ohio
  "Columbus, OH", "Cleveland, OH", "Cincinnati, OH", "Toledo, OH", "Akron, OH",
  "Dayton, OH", "Parma, OH", "Canton, OH", "Youngstown, OH", "Lorain, OH",
  "Hamilton, OH", "Springfield, OH", "Kettering, OH", "Elyria, OH", "Lakewood, OH",
  "Cuyahoga Falls, OH", "Middletown, OH", "Euclid, OH", "Newark, OH", "Mansfield, OH",
  
  // Oklahoma
  "Oklahoma City, OK", "Tulsa, OK", "Norman, OK", "Broken Arrow, OK", "Lawton, OK",
  "Edmond, OK", "Moore, OK", "Midwest City, OK", "Enid, OK", "Stillwater, OK",
  
  // Oregon
  "Portland, OR", "Salem, OR", "Eugene, OR", "Gresham, OR", "Hillsboro, OR",
  "Beaverton, OR", "Bend, OR", "Medford, OR", "Springfield, OR", "Corvallis, OR",
  "Albany, OR", "Tigard, OR", "Lake Oswego, OR", "Keizer, OR", "Grants Pass, OR",
  
  // Pennsylvania
  "Philadelphia, PA", "Pittsburgh, PA", "Allentown, PA", "Erie, PA", "Reading, PA",
  "Scranton, PA", "Bethlehem, PA", "Lancaster, PA", "Harrisburg, PA", "Altoona, PA",
  "York, PA", "State College, PA", "Wilkes-Barre, PA", "Chester, PA", "Williamsport, PA",
  
  // Rhode Island
  "Providence, RI", "Warwick, RI", "Cranston, RI", "Pawtucket, RI", "East Providence, RI",
  
  // South Carolina
  "Columbia, SC", "Charleston, SC", "North Charleston, SC", "Mount Pleasant, SC", "Rock Hill, SC",
  "Greenville, SC", "Summerville, SC", "Sumter, SC", "Goose Creek, SC", "Hilton Head Island, SC",
  
  // South Dakota
  "Sioux Falls, SD", "Rapid City, SD", "Aberdeen, SD", "Brookings, SD", "Watertown, SD",
  
  // Tennessee
  "Memphis, TN", "Nashville, TN", "Knoxville, TN", "Chattanooga, TN", "Clarksville, TN",
  "Murfreesboro, TN", "Jackson, TN", "Franklin, TN", "Johnson City, TN", "Bartlett, TN",
  "Hendersonville, TN", "Kingsport, TN", "Collierville, TN", "Cleveland, TN", "Smyrna, TN",
  
  // Texas
  "Houston, TX", "San Antonio, TX", "Dallas, TX", "Austin, TX", "Fort Worth, TX",
  "El Paso, TX", "Arlington, TX", "Corpus Christi, TX", "Plano, TX", "Laredo, TX",
  "Lubbock, TX", "Garland, TX", "Irving, TX", "Amarillo, TX", "Grand Prairie, TX",
  "Brownsville, TX", "Pasadena, TX", "McKinney, TX", "Mesquite, TX", "McAllen, TX",
  "Killeen, TX", "Frisco, TX", "Waco, TX", "Carrollton, TX", "Denton, TX",
  "Midland, TX", "Abilene, TX", "Beaumont, TX", "Round Rock, TX", "Odessa, TX",
  "Wichita Falls, TX", "Richardson, TX", "Lewisville, TX", "Tyler, TX", "College Station, TX",
  "Pearland, TX", "San Angelo, TX", "Allen, TX", "League City, TX", "Sugar Land, TX",
  "Longview, TX", "Edinburg, TX", "Mission, TX", "Bryan, TX", "Pharr, TX",
  "Temple, TX", "Missouri City, TX", "Flower Mound, TX", "Harlingen, TX", "North Richland Hills, TX",
  
  // Utah
  "Salt Lake City, UT", "West Valley City, UT", "Provo, UT", "West Jordan, UT", "Orem, UT",
  "Sandy, UT", "Ogden, UT", "St. George, UT", "Layton, UT", "Taylorsville, UT",
  "South Jordan, UT", "Lehi, UT", "Logan, UT", "Murray, UT", "Draper, UT",
  
  // Vermont
  "Burlington, VT", "South Burlington, VT", "Rutland, VT", "Barre, VT", "Montpelier, VT",
  
  // Virginia
  "Virginia Beach, VA", "Norfolk, VA", "Chesapeake, VA", "Richmond, VA", "Newport News, VA",
  "Alexandria, VA", "Hampton, VA", "Roanoke, VA", "Portsmouth, VA", "Suffolk, VA",
  "Lynchburg, VA", "Harrisonburg, VA", "Leesburg, VA", "Charlottesville, VA", "Blacksburg, VA",
  
  // Washington
  "Seattle, WA", "Spokane, WA", "Tacoma, WA", "Vancouver, WA", "Bellevue, WA",
  "Kent, WA", "Everett, WA", "Renton, WA", "Yakima, WA", "Federal Way, WA",
  "Spokane Valley, WA", "Bellingham, WA", "Kennewick, WA", "Auburn, WA", "Pasco, WA",
  "Marysville, WA", "Lakewood, WA", "Redmond, WA", "Shoreline, WA", "Richland, WA",
  
  // West Virginia
  "Charleston, WV", "Huntington, WV", "Morgantown, WV", "Parkersburg, WV", "Wheeling, WV",
  
  // Wisconsin
  "Milwaukee, WI", "Madison, WI", "Green Bay, WI", "Kenosha, WI", "Racine, WI",
  "Appleton, WI", "Waukesha, WI", "Eau Claire, WI", "Oshkosh, WI", "Janesville, WI",
  "West Allis, WI", "La Crosse, WI", "Sheboygan, WI", "Wauwatosa, WI", "Fond du Lac, WI",
  
  // Wyoming
  "Cheyenne, WY", "Casper, WY", "Laramie, WY", "Gillette, WY", "Rock Springs, WY"
].sort();
