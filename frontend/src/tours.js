const tours=[{
    id: 1,
    destination: "Jordánia",
    imgURL:"/images/Jordan.jpg",
    type: "egyéni, autót béreltünk",
    destinationDetails: "Jordánia közel-keleti arab ország, lakossága nagyrészt iszlám követő, hivatalos nyelve az arab. 2020-as években II. Abdulláh király az államfő.",
    climate: "Decemberben északon 10-15 fok, délen a tengernél 20-25 fok)",
    start: new Date('2023-12-29Z00:00:00.000').getTime(),
    end: new Date('2024-01-02Z00:00:00.000').getTime(),
    visitedCities: [
        {cityName:"Amman", images:["/templom", "/citadella"], details: "Jordánia fővárosa 3 millió lakossal", visitedAttractions: ["piac", "2. századi római színház", "citadella kilátással a városra"]},
        {cityName:"Petra", images:["/dzsipben", "/sziklaknal"], details: "vörös romváros a sivatagi sziklák között, a nabateusok alakították ki sziklába faragott épületeiket ie. 4. sz", visitedAttractions: ["sírtemplom", "sziklába vájt színház", "főtemplom"]},
        {cityName:"Wadi Rum", images:["/sivatag", "/napnyugta"], details: "sivatagi völgy lélegzetelállótó vöröses panorámával", visitedAttractions: ["templomrom", "sziklarajz", "sivatag"]},
        {cityName:"Akaba", images:["/hajon", "/tenger"], details: "kikötőváros, ablak a Vörös-tengerre", visitedAttractions: ["14. századi erődítmény", "üveg aljú hajókra lehet felülni, snorkelingelni"]}
    ]
}, {
    id: 2,
    destination: "Izrael",
    imgURL:"/images/Izrael.jpg",
    type: "egyéni, metrózós + egy buszos nap",
    destinationDetails: "Izrael Állam a közel-kelet egyik legfejlettebb országa, 1948-ban alapították. Lakosság nagy része zsidó, vagy arab, akik a zsidó állam megszűnése után telepedtek be.",
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
    destination: "Spanyolország",
    imgURL:"/images/Spain.jpg",
    type: "egyéni repülős út Milánóval összekötve",
    destinationDetails: "Spanyolország dél-Európai város a Földközi-tenger partján",
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

export default tours;