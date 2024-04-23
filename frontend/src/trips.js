const trips=[{
    id: 1,
    country: "Jordan",
    countryInformation: "Jordan Kingdom is a country in West-Asia. Official language is arabic, and the official region is islam. The king is II. Abdullah since 1999.",
    images:[],
    coverImageId: "defjlf 111 3de",
    type: "flight",
    tripExperience: "In december, 10-15 degrees in the north, 20-25 degrees in the south by the sea. We rented a car to travel around Jordan from north. We spent the first day in the capital city, Amman. The city crowded, a bit dirty, but we liked the ancient buildings, roman theatres and the big market. The fist afternoon we walked up to the citadel, to the ruin of a temple, where the view of the city was beautiful. We wore winter coat, because teh nights was cold, and I had a cold by the time we got there.",
    startDate: new Date('2023-12-29Z00:00:00.000').getTime(),
    endDate: new Date('2024-01-02Z00:00:00.000').getTime(),
    visitedCities: [
        {cityName:"Amman", details: "Amman is the capital of Jordan with a population of 4 million", visitedAttractions: ["market", "roman theater built around 100", "Citadel hill with a panoramic view"]},
        {cityName:"Petra", details: "vörös romváros a sivatagi sziklák között, a nabateusok alakították ki sziklába faragott épületeiket ie. 4. sz", visitedAttractions: ["sírtemplom", "sziklába vájt színház", "főtemplom"]},
        {cityName:"Wadi Rum", details: "sivatagi völgy lélegzetelállótó vöröses panorámával", visitedAttractions: ["templomrom", "sziklarajz", "sivatag"]},
        {cityName:"Akaba",  details: "kikötőváros, ablak a Vörös-tengerre", visitedAttractions: ["14. századi erődítmény", "üveg aljú hajókra lehet felülni, snorkelingelni"]}
    ]
}, 
{
    id: 2,
    country: "Israel",
    images:[
        {url: "/images/Israel/1_Jaffa_St Peter Church.jpg", title: "1_Jaffa_St Peter Church", cityId:"dsds-21"},
        {url: "/images/Israel/2_Tel-Aviv_beach.jpeg", title: "2_Tel-Aviv_beach", cityId: null},
        {url: "/images/Israel/3_Jaffa_Mosque.jpeg", title: "3_Jaffa_Mosque"}
    ],
    type: "flight",
    countryInformation: "Israel is a country in West-Asia. Official language is hebrew and arabic, and the official region is jews (73% - muslim 18%). The State of Israel was declared 1948.",
    tripExperience: "It was 30-35 degrees in Israel in July. We travelled by subway from the airport to the beach in Tel-Aviv. It was nice to bath in the warm in the Mediterranean Sea.",
    startDate: new Date('2023-07-17Z00:00:00.000').getTime(),
    endDate: new Date('2023-07-21Z00:00:00.000').getTime(),
    visitedCities: [
        {cityId:"dsds-21", cityName:"Tel-Aviv", details: "Tel-Aviv is the most populous city in Israel, the economical and technological center of the country. Many people used electronic scooters on the beach.", visitedAttractions: ["market with falafel", "Jaffa old city with St. Peter's church", "beach", "Jaffa's Great Mosque"]},
        {cityName:"Dead Sea", details: "Ten times saltier than the sea. We can float in the lake. The lowest point on earth.", visitedAttractions: []},
        {cityName:"Haifa", details: "Third-largest city in Israel. We used cable car to travel to the hill, then used stairs to walk back to the subway. ", visitedAttractions: ["Baha'í gardens in the heart of the city", "cable car"]},
        {cityName:"Ein Gedi", details: "Ein Gedi is an oasis, a nature reserve and national park", visitedAttractions: ["waterfalls"]},
        {cityName:"Masada", details: "Masada is an ancient fortification situated on top of an isolated rock plateau from 20 km from the Dead Sea. The weather was very hot here in July.", visitedAttractions: ["cable car", "ruin of the fortress"]}
    ]
},{
    id: 3,
    country: "Spain",
    coordinates: {lat: 40.463667, lng: -3.74922},
    images:[],
    type: "bus",
    tripExperience: "10-15 degrees in April, rainy, cloudy weather",
    countryInformation: "Spain is a country located in southwestern Europe. The capital city is Madrid ",
    startDate: new Date('2018-04-07Z00:00:00.000').getTime(),
    endDate: new Date('2018-04-10Z00:00:00.000').getTime(),
    visitedCities: [
        {cityName:"Barcelona", 
        images:[{url: "/images/Spain/1_Barcelona_W Hotel.jpg", title: "1_Barcelona_W Hotel"}, {url: "/images/Spain/1_Barcelona_beach.jpg", title: "1_Barcelona_beach"}, {url: "/images/Spain/view.jpg", title: "view"}], 
        details: "Barcelona is a tunning seaside city. Antoni Gaudí left a lasting mark on Barcelona  with his avant-garde surrealist buildings.", 
        visitedAttractions: ["sandy beaches near the harbor", "La Sagrada Familia", "Park Güell"]}
    ]
}
]

export default trips;