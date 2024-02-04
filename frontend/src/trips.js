const trips=[{
    id: 1,
    country: "Jordan",
    countryDetails: "Jordan Kingdom is a country in West-Asia. Official language is arabic, and the official region is islam. The king is II. Abdullah since 1999.",
    coordinates: {lat: 30.585164, lng: 36.238414},
    imgURL:"/images/Jordan.jpg",
    images:[
        {url: "/images/Jordan/1_Amman_citadel.jpg", title: "Amman_citadel"},
        {url: "/images/Jordan/2_Petra_rosecity.jpg", title: "Petra_rosecity"},
        {url: "/images/Jordan/3_Wadi_rum_sunset.jpg", title: "Wadi_rum_sunset"},
        {url: "/images/Jordan/4_Akaba_red_sea.jpg", title: "Akaba_red_sea"},
        {url: "/images/Jordan/5_Petra_sunset.jpg", title: "Petra_sunset"}
    ],
    type: "flight",
    climate: "In december, 10-15 degrees in the north, 20-25 degrees in the south by the sea.",
    experience: "We rented a car to travel around Jordan from north. We spent the first day in the capital city, Amman. The city crowded, a bit dirty, but we liked the ancient buildings, roman theatres and the big market. The fist afternoon we walked up to the citadel, to the ruin of a temple, where the view of the city was beautiful. We wore winter coat, because teh nights was cold, and I had a cold by the time we got there.",
    start: new Date('2023-12-29Z00:00:00.000').getTime(),
    end: new Date('2024-01-02Z00:00:00.000').getTime(),
    visitedCities: [
        {cityName:"Amman", images:[{url: "/images/Jordan/1_Amman_citadel.jpg", title: "Amman_citadel"}], details: "Amman is the capital of Jordan with a population of 4 million", visitedAttractions: ["market", "roman theater built around 100", "Citadel hill with a panoramic view"]},
        {cityName:"Petra", images:[{url: "/images/Jordan/2_Petra_rosecity.jpg", title: "Petra_rosecity"}, {url: "/images/Jordan/5_Petra_sunset.jpg", title: "Petra_sunset"}], details: "vörös romváros a sivatagi sziklák között, a nabateusok alakították ki sziklába faragott épületeiket ie. 4. sz", visitedAttractions: ["sírtemplom", "sziklába vájt színház", "főtemplom"]},
        {cityName:"Wadi Rum", images:[{url: "/images/Jordan/3_Wadi_rum_sunset.jpg", title: "Wadi_rum_sunset"}], details: "sivatagi völgy lélegzetelállótó vöröses panorámával", visitedAttractions: ["templomrom", "sziklarajz", "sivatag"]},
        {cityName:"Akaba", images:[{url: "/images/Jordan/5_Petra_sunset.jpg", title: "Petra_sunset"}], details: "kikötőváros, ablak a Vörös-tengerre", visitedAttractions: ["14. századi erődítmény", "üveg aljú hajókra lehet felülni, snorkelingelni"]}
    ]
}, 
{
    id: 2,
    country: "Israel",
    coordinates: {lat: 31.046051, lng: 34.851612},
    imgURL:"/images/Izrael.jpg",
    type: "fligh",
    countryDetails: "Izrael Állam a közel-kelet egyik legfejlettebb országa, 1948-ban alapították. Lakosság nagy része zsidó, vagy arab, akik a zsidó állam megszűnése után telepedtek be.",
    climate: "Júliusban 30-35 fok",
    start: new Date('2023-07-17Z00:00:00.000').getTime(),
    end: new Date('2023-07-21Z00:00:00.000').getTime(),
    visitedCities: [
        {cityName:"Amman", images:["/templom", "/citadella"], details: "Jordánia fővárosa 3 millió lakossal", visitedAttractions: ["piac", "2. századi római színház", "citadella kilátással a városra"]},
        {cityName:"Petra", images:["/dzsipben", "/sziklaknal"], details: "vörös romváros a sivatagi sziklák között, a nabateusok alakították ki sziklába faragott épületeiket ie. 4. sz", visitedAttractions: ["sírtemplom", "sziklába vájt színház", "főtemplom"]},
        {cityName:"Wadi Rum", images:["/sivatag", "/napnyugta"], details: "sivatagi völgy lélegzetelállótó vöröses panorámával", visitedAttractions: ["templomrom", "sziklarajz", "sivatag"]},
        {cityName:"Akaba", images:["/hajon", "/tenger"], details: "kikötőváros, ablak a Vörös-tengerre", visitedAttractions: ["14. századi erődítmény", "üveg aljú hajókra lehet felülni, snorkelingelni"]}
    ]
},{
    id: 3,
    country: "Spain",
    coordinates: {lat: 40.463667, lng: -3.74922},
    imgURL:"/images/Spain.jpg",
    type: "bus",
    countryDetails: "Spanyolország dél-Európai város a Földközi-tenger partján",
    climate: "Áprilisban hűvös 10-15 fokos idő volt)",
    start: new Date('2018-04-07Z00:00:00.000').getTime(),
    end: new Date('2018-04-10Z00:00:00.000').getTime(),
    visitedCities: [
        {cityName:"Amman", images:["/templom", "/citadella"], details: "Jordánia fővárosa 3 millió lakossal", visitedAttractions: ["piac", "2. századi római színház", "citadella kilátással a városra"]},
        {cityName:"Petra", images:["/dzsipben", "/sziklaknal"], details: "vörös romváros a sivatagi sziklák között, a nabateusok alakították ki sziklába faragott épületeiket ie. 4. sz", visitedAttractions: ["sírtemplom", "sziklába vájt színház", "főtemplom"]},
        {cityName:"Wadi Rum", images:["/sivatag", "/napnyugta"], details: "sivatagi völgy lélegzetelállótó vöröses panorámával", visitedAttractions: ["templomrom", "sziklarajz", "sivatag"]},
        {cityName:"Akaba", images:["/hajon", "/tenger"], details: "kikötőváros, ablak a Vörös-tengerre", visitedAttractions: ["14. századi erődítmény", "üveg aljú hajókra lehet felülni, snorkelingelni"]}
    ]
}
]

export default trips;