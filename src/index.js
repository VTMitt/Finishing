//Tekijä: Venne Tanskanen
//Lähteitä alhaalla

import "/assets/styles.css";  
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
const selection = document.getElementById("select");
const incomeButton = document.getElementById("incomeButton");
const populationButton = document.getElementById("populationButton")
const download = document.getElementById("download") 


download.addEventListener("click", async()=>{
  const name = document.getElementById("downloadInput").value 
  const selection = document.getElementById("downloadSelection").value
  if(selection === "income"){
    const chart = await builds2(name)
    setTimeout(()=>{chart.export();}, 3000); 
    return
  } if(selection === "population"){
    const chart = await builds3(name)
    setTimeout(()=>{chart.export();}, 3000); 
  } if(selection === "politics"){
    const chart = await builds(name)
    setTimeout(()=>{chart.export();}, 3000); 
  }
  //Tarvitsee vähän aikaa, että chartti latautuu oikein
})


populationButton.addEventListener("click", ()=>{
  //addPopToMap() 
  const year = parseInt(document.getElementById("select").value)
  addPopToMap(year)
})


incomeButton.addEventListener("click", function () {
  const input = document.getElementById("field").value;
  builds2(input);
  builds3(input)  
});

//Kartta
let map = L.map("map"); 
 
//Tästä valitaan minkä vuoden tulokset kartalla näkyy
selection.addEventListener("change", async () => {
  const year = parseInt(document.getElementById("select").value);
  modify(year);
});

//haetaan äänestysdataa
const election = async () => {
  const url =
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/kvaa/statfin_kvaa_pxt_12g3.px";
  let election_query = {
    query: [
      {
        code: "Vuosi",
        selection: {
          filter: "item",
          values: ["2000", "2004", "2008", "2012", "2017", "2021"]
        }
      },
      {
        code: "Alue",
        selection: {
          filter: "item",
          values: [
            "000000",
            "011091",
            "021049",
            "021078",
            "021092",
            "021106",
            "021186",
            "021235",
            "021245",
            "021257",
            "021444",
            "021543",
            "021638",
            "021858",
            "022224",
            "022434",
            "022505",
            "022710",
            "022753",
            "022927",
            "023018",
            "023149",
            "023407",
            "023504",
            "023611",
            "023616",
            "023755",
            "031202",
            "031680",
            "031734",
            "031853",
            "032400",
            "032423",
            "032430",
            "032445",
            "032481",
            "032503",
            "032529",
            "032577",
            "032895",
            "033019",
            "033304",
            "033322",
            "033480",
            "033538",
            "033561",
            "033631",
            "033636",
            "033704",
            "033738",
            "033761",
            "033833",
            "033918",
            "041079",
            "041609",
            "041684",
            "042050",
            "042102",
            "042214",
            "042886",
            "043051",
            "043181",
            "043230",
            "043271",
            "043484",
            "043531",
            "043608",
            "043747",
            "043783",
            "061061",
            "061098",
            "061109",
            "061111",
            "061398",
            "061694",
            "062016",
            "062082",
            "062165",
            "062560",
            "063081",
            "063086",
            "063103",
            "063142",
            "063169",
            "063316",
            "063433",
            "063576",
            "063781",
            "063834",
            "063981",
            "071211",
            "071418",
            "071536",
            "071604",
            "071837",
            "071908",
            "071980",
            "072020",
            "072108",
            "072508",
            "072562",
            "072581",
            "072790",
            "073143",
            "073177",
            "073250",
            "073291",
            "073619",
            "073635",
            "073702",
            "073887",
            "073922",
            "073936",
            "081075",
            "081153",
            "081285",
            "081286",
            "081405",
            "081491",
            "081740",
            "082593",
            "083046",
            "083097",
            "083178",
            "083213",
            "083416",
            "083441",
            "083489",
            "083507",
            "083580",
            "083588",
            "083623",
            "083624",
            "083681",
            "083689",
            "083700",
            "083739",
            "083768",
            "083831",
            "083935",
            "091140",
            "091167",
            "091297",
            "091915",
            "092276",
            "092309",
            "092422",
            "092541",
            "092749",
            "092778",
            "093090",
            "093146",
            "093171",
            "093176",
            "093204",
            "093239",
            "093260",
            "093263",
            "093402",
            "093420",
            "093426",
            "093595",
            "093607",
            "093686",
            "093687",
            "093707",
            "093762",
            "093844",
            "093848",
            "093857",
            "093921",
            "093925",
            "101231",
            "101272",
            "101598",
            "101743",
            "101905",
            "102005",
            "102010",
            "102145",
            "102232",
            "102233",
            "102301",
            "102399",
            "102408",
            "102499",
            "103052",
            "103074",
            "103151",
            "103152",
            "103217",
            "103218",
            "103236",
            "103280",
            "103287",
            "103288",
            "103300",
            "103403",
            "103421",
            "103440",
            "103475",
            "103545",
            "103584",
            "103599",
            "103759",
            "103846",
            "103849",
            "103893",
            "103924",
            "103934",
            "103946",
            "103989",
            "111179",
            "112182",
            "112249",
            "112410",
            "112500",
            "112992",
            "113077",
            "113172",
            "113216",
            "113226",
            "113256",
            "113265",
            "113275",
            "113312",
            "113435",
            "113495",
            "113592",
            "113601",
            "113729",
            "113850",
            "113892",
            "113931",
            "121205",
            "121244",
            "121564",
            "121678",
            "122069",
            "122139",
            "122208",
            "122290",
            "122305",
            "122425",
            "122494",
            "122535",
            "122563",
            "122765",
            "122977",
            "123009",
            "123071",
            "123072",
            "123105",
            "123317",
            "123436",
            "123483",
            "123578",
            "123615",
            "123620",
            "123625",
            "123626",
            "123630",
            "123691",
            "123697",
            "123746",
            "123748",
            "123777",
            "123785",
            "123791",
            "123832",
            "123859",
            "123889",
            "131240",
            "131698",
            "131851",
            "132241",
            "132320",
            "132758",
            "133047",
            "133148",
            "133261",
            "133273",
            "133498",
            "133583",
            "133614",
            "133683",
            "133732",
            "133742",
            "133751",
            "133845",
            "133854",
            "133890",
            "133976",
            "051478",
            "053035",
            "053043",
            "053060",
            "053062",
            "053065",
            "053076",
            "053170",
            "053295",
            "053318",
            "053417",
            "053438",
            "053736",
            "053766",
            "053771",
            "053941"
          ]
        }
      },
      {
        code: "Puolue",
        selection: {
          filter: "item",
          values: ["00", "03", "01", "04", "02", "05", "06", "07", "08"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };

  let data = await getData_query(url, election_query);
  return data;
};
//Tämän funktion tarkoitus on asettaa data sellaiseen muotoon, josta
// kunnan voittaja voidaan laskea helposti
const formatData = (data, year) => {
  if (!year) {
    year = 0;
  }
  const vuosilista = [2000, 2004, 2008, 2012, 2017, 2021];
  const results = Object.values(data.value);
  const kunta = Object.values(data.dimension.Alue.category.label);
  const kunta2 = data.dimension.Alue.category.label;
  const kunta3 = Object.keys(data.dimension.Alue.category.index);
  const kunta4 = Object.values(data.dimension.Alue.category.index);
  const kunta5 = data.dimension.Alue.category.index;
  const yearStart = 0 + year * 11124;
  kunta4.sort(function (a, b) {
    return a - b;
  });
  let found;
  let last = [];
  for (let i = 0; i < kunta.length; i++) {
    found = kunta4.findIndex((element) => element === kunta5[kunta3[i]]);
    last[found] = [kunta3[i]];
  }

  let pew = [];

  for (let i = 0; i < kunta.length; i++) {
    pew[i] = kunta2[last[i]];
  }
  let parced_kunta = [];
  let forms = [];
  for (let i = 0; i < pew.length; i++) {
    parced_kunta[i] = parse(pew[i]);
  }

  //Tässäkohtaa on laskettu, että kuinka paljon mihinkin pitää lisätä
  // että saadaa uuden kunnan mutta saman puolueen sama arvo, eli pitää aina lisätä 36
  for (let j = 0; j < kunta.length; j++) {
    let kokoomus = results[yearStart + 4 + j * 36];
    let sdp = results[yearStart + 8 + j * 36];
    let kesk = results[yearStart + 12 + j * 36];
    let ps = results[yearStart + 16 + j * 36];
    let vihr = results[yearStart + 20 + j * 36];
    let vas = results[yearStart + 24 + j * 36];
    let rkp = results[yearStart + 28 + j * 36];
    let kd = results[yearStart + 32 + j * 36];
    let kokoomusmp = results[yearStart + 6 + j * 36];
    let sdpmp = results[yearStart + 10 + j * 36];
    let keskmp = results[yearStart + 14 + j * 36];
    let psmp = results[yearStart + 18 + j * 36];
    let vihrmp = results[yearStart + 22 + j * 36];
    let vasmp = results[yearStart + 26 + j * 36];
    let rkpmp = results[yearStart + 30 + j * 36];
    let kdmp = results[yearStart + 34 + j * 36];
    forms[j] = new electorate(
      vuosilista[year],
      parced_kunta[j],
      kokoomus,
      sdp,
      kesk,
      ps,
      vihr,
      vas,
      rkp,
      kd,
      kokoomusmp,
      sdpmp,
      keskmp,
      psmp,
      vihrmp,
      vasmp,
      rkpmp,
      kdmp
    );
  }
  return forms;
};

//Tällä funktiolla lasketaan kunkin kunnan voittaja
const winner = (forms) => {
  let arranged = [];
  for (let i = 0; i < forms.length; i++) {
    if (
      forms[i].kok_p > forms[i].sdp_p &&
      forms[i].kok_p > forms[i].kesk_p &&
      forms[i].kok_p > forms[i].ps_p &&
      forms[i].kok_p > forms[i].vihr_p &&
      forms[i].kok_p > forms[i].vas_p &&
      forms[i].kok_p > forms[i].rkp_p &&
      forms[i].kok_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "KOK"];
    } else if (
      forms[i].sdp_p > forms[i].kok_p &&
      forms[i].sdp_p > forms[i].kesk_p &&
      forms[i].sdp_p > forms[i].ps_p &&
      forms[i].sdp_p > forms[i].vihr_p &&
      forms[i].sdp_p > forms[i].vas_p &&
      forms[i].sdp_p > forms[i].rkp_p &&
      forms[i].sdp_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "SDP"];
    } else if (
      forms[i].kesk_p > forms[i].sdp_p &&
      forms[i].kesk_p > forms[i].kok_p &&
      forms[i].kesk_p > forms[i].ps_p &&
      forms[i].kesk_p > forms[i].vihr_p &&
      forms[i].kesk_p > forms[i].vas_p &&
      forms[i].kesk_p > forms[i].rkp_p &&
      forms[i].kesk_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "KESK"];
    } else if (
      forms[i].ps_p > forms[i].sdp_p &&
      forms[i].ps_p > forms[i].kesk_p &&
      forms[i].ps_p > forms[i].kok_p &&
      forms[i].ps_p > forms[i].vihr_p &&
      forms[i].ps_p > forms[i].vas_p &&
      forms[i].ps_p > forms[i].rkp_p &&
      forms[i].ps_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "PS"];
    } else if (
      forms[i].vihr_p > forms[i].sdp_p &&
      forms[i].vihr_p > forms[i].kesk_p &&
      forms[i].vihr_p > forms[i].ps_p &&
      forms[i].vihr_p > forms[i].kok_p &&
      forms[i].vihr_p > forms[i].vas_p &&
      forms[i].vihr_p > forms[i].rkp_p &&
      forms[i].vihr_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "VIHR"];
    } else if (
      forms[i].vas_p > forms[i].sdp_p &&
      forms[i].vas_p > forms[i].kesk_p &&
      forms[i].vas_p > forms[i].ps_p &&
      forms[i].vas_p > forms[i].vihr_p &&
      forms[i].vas_p > forms[i].kok_p &&
      forms[i].vas_p > forms[i].rkp_p &&
      forms[i].vas_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "VAS"];
    } else if (
      forms[i].rkp_p > forms[i].sdp_p &&
      forms[i].rkp_p > forms[i].kesk_p &&
      forms[i].rkp_p > forms[i].ps_p &&
      forms[i].rkp_p > forms[i].vihr_p &&
      forms[i].rkp_p > forms[i].vas_p &&
      forms[i].rkp_p > forms[i].kok_p &&
      forms[i].rkp_p > forms[i].kd_p
    ) {
      arranged[i] = [forms[i].mun, "RKP"];
    } else if (
      forms[i].kd_p > forms[i].sdp_p &&
      forms[i].kd_p > forms[i].kesk_p &&
      forms[i].kd_p > forms[i].ps_p &&
      forms[i].kd_p > forms[i].vihr_p &&
      forms[i].kd_p > forms[i].vas_p &&
      forms[i].kd_p > forms[i].rkp_p &&
      forms[i].kd_p > forms[i].kok_p
    ) {
      arranged[i] = [forms[i].mun, "KD"];
    } else {
      arranged[i] = [forms[i].mun, "NONE"];
    }
  }
  return arranged;
};

// muuttaa datan
const getData_query = async (code, query) => {
  let url = new URL(code);
  const wait = await fetch(url, {
    method: "POST", 
    headers: { "content-type": "application/json" },
    body: JSON.stringify(query)
  });
  if (!wait.ok) {
    return;
  }
  const data = await wait.json();
  return data;
};

//Hakee kartan kunnat
const fetcher = async () => {
  let url = new URL(
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
  );
  const promise = await fetch(url);
  const data = await promise.json();
  return data;
};

// Kartan luontifunktio, joka ei poista aikaisempaa karttaa
// Sinänsä jäänne, mutta toimii hyvin
// Saa kartan datan (kunnat merkattu) ja vuoden, tarkistaa
//voittajan ja tekee kunnasta voittajan värisen
const createMap = async (data, year) => {
  let results = await election();
  results = formatData(results, year);
  results = winner(results);
  for (let i = 0; i < data.features.length; i++) {
    data.features[i]["winner"] = "";
  }

  for (let i = 0; i < data.features.length; i++) {
    data.features[i]["income"] = "";
  }
  data = check(results, data);
  let geoJson = L.geoJSON(data, {
    style: addstyle,
    weight: 2,
    onEachFeature: getFeature
  }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 4,
    maxZoom: 10,
    attribution: "© OpenStreetMap"
  }).addTo(map);
  map.fitBounds(geoJson.getBounds());

  return data;
};
 
// getFeature ja addstyle liittyvät kartan väreihin ja nimiin
const getFeature = (feature, layer) => {
  if (!feature.properties.nimi) return;
  const name = feature.properties.nimi;
  const winner = feature.winner
  layer.on("click", function () {
    builds(name)

  });
  layer.bindTooltip(
    `  
    <li>${name}</li> 
    <li>${winner}</li>
    `
  );
  layer.bindPopup(
    `
  <li>${name}</li> 
  <li>${winner}</li> 
`
  );
};

const addstyle = (feature) => {
  if (feature.winner !== "") {
    return {
      color: hue_cac(feature.winner)
    };
  }
  return {
    color: "#336633"
  };
};
// Tässä voi modifioida karttaa, eli poistetaan ja tehdään uusi
const modify = async (year) => {
  map.remove();
  map = L.map("map");
  let data = await fetcher();
  let results = await election();
  results = formatData(results, year);
  results = winner(results);
  for (let i = 0; i < data.features.length; i++) {
    data.features[i]["winner"] = "";
  }

  for (let i = 0; i < data.features.length; i++) {
    data.features[i]["income"] = "";
  }
  data = check(results, data);
  let geoJson = L.geoJSON(data, {
    style: addstyle,
    weight: 2,
    onEachFeature: getFeature
  }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 4,
    maxZoom: 10,
    attribution: "© OpenStreetMap"
  }).addTo(map);
  map.fitBounds(geoJson.getBounds());
};

// Tämä muuttaa sanat parempaan muotoon
const parse = (word) => {
  let return_word = word.substring(word.indexOf(" ") + 1, word.lastIndexOf(""));
  return return_word;
};

//Tämän olisi voinut ehkä parempaan muotoon, mutta toimii
// Tässä on siis luokka, jossa on vuosi, alue sekä kaikkien puolueiden
// tuolloin saatu äänimäärä ja istuinten määrä
class electorate {
  constructor(
    year,
    mun,
    kok_p,
    sdp_p,
    kesk_p,
    ps_p,
    vihr_p,
    vas_p,
    rkp_p,
    kd_p,
    kok_mp,
    sdp_mp,
    kesk_mp,
    ps_mp,
    vihr_mp,
    vas_mp,
    rkp_mp,
    kd_mp
  ) {
    this.year = year;
    this.mun = mun;
    this.kok_p = kok_p;
    this.sdp_p = sdp_p;
    this.kesk_p = kesk_p;
    this.ps_p = ps_p;
    this.vihr_p = vihr_p;
    this.vas_p = vas_p;
    this.rkp_p = rkp_p;
    this.kd_p = kd_p;
    this.kd_mp = kd_mp;
    this.kok_mp = kok_mp;
    this.sdp_mp = sdp_mp;
    this.kesk_mp = kesk_mp;
    this.ps_mp = ps_mp;
    this.vihr_mp = vihr_mp;
    this.vas_mp = vas_mp;
    this.rkp_mp = rkp_mp;
    this.kd_mp = kd_mp;
  }
}
// Tämä määrittää voittajan värin, liittyen tietenkin
// puolueille tuttuihin väreihin
const hue_cac = (winner) => {
  if (winner === "KOK") {
    return "#3333FF";
  }
  if (winner === "SDP") {
    return "#FF0000";
  }
  if (winner === "KESK") {
    return "#009900";
  }
  if (winner === "PS") {
    return "#00FFFF";
  }
  if (winner === "VIHR") {
    return "#00FF00";
  }
  if (winner === "VAS") {
    return "#CC0000";
  }
  if (winner === "RKP") {
    return "#FFFF00";
  }
  if (winner === "KD") {
    return "#B266FF";
  }
  if (winner === "NONE") {
    return "#FFGGFF";
  }
};
// Tämä funktio tarkistaa kunkin kunnan voittajan
const check = (results, data) => {
  let featurit = data.features;
  let index = [];
  for (let i = 0; i < featurit.length; i++) {
    index[i] = featurit[i].properties.nimi;
  }
  let found;
  for (let i = 0; i < featurit.length; i++) {
    found = index.findIndex((element) => element === results[i][0]);
    if (found > -1) {
      featurit[found]["winner"] = results[i][1];
    }
  }
  return data;
};
const populationData = async()=>{
  let url = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/vaerak/statfin_vaerak_pxt_11ra.px"
  let query = {
    "query": [
      {
        "code": "Alue",
        "selection": {
          "filter": "item",
          "values": [
            "SSS",
            "KU020",
            "KU005",
            "KU009",
            "KU010",
            "KU016",
            "KU018",
            "KU019",
            "KU035",
            "KU043",
            "KU046",
            "KU047",
            "KU049",
            "KU050",
            "KU051",
            "KU052",
            "KU060",
            "KU061",
            "KU062",
            "KU065",
            "KU069",
            "KU071",
            "KU072",
            "KU074",
            "KU075",
            "KU076",
            "KU077",
            "KU078",
            "KU079",
            "KU081",
            "KU082",
            "KU086",
            "KU111",
            "KU090",
            "KU091",
            "KU097",
            "KU098",
            "KU102",
            "KU103",
            "KU105",
            "KU106",
            "KU108",
            "KU109",
            "KU139",
            "KU140",
            "KU142",
            "KU143",
            "KU145",
            "KU146",
            "KU153",
            "KU148",
            "KU149",
            "KU151",
            "KU152",
            "KU165",
            "KU167",
            "KU169",
            "KU170",
            "KU171",
            "KU172",
            "KU176",
            "KU177",
            "KU178",
            "KU179",
            "KU181",
            "KU182",
            "KU186",
            "KU202",
            "KU204",
            "KU205",
            "KU208",
            "KU211",
            "KU213",
            "KU214",
            "KU216",
            "KU217",
            "KU218",
            "KU224",
            "KU226",
            "KU230",
            "KU231",
            "KU232",
            "KU233",
            "KU235",
            "KU236",
            "KU239",
            "KU240",
            "KU320",
            "KU241",
            "KU322",
            "KU244",
            "KU245",
            "KU249",
            "KU250",
            "KU256",
            "KU257",
            "KU260",
            "KU261",
            "KU263",
            "KU265",
            "KU271",
            "KU272",
            "KU273",
            "KU275",
            "KU276",
            "KU280",
            "KU284",
            "KU285",
            "KU286",
            "KU287",
            "KU288",
            "KU290",
            "KU291",
            "KU295",
            "KU297",
            "KU300",
            "KU301",
            "KU304",
            "KU305",
            "KU312",
            "KU316",
            "KU317",
            "KU318",
            "KU398",
            "KU399",
            "KU400",
            "KU407",
            "KU402",
            "KU403",
            "KU405",
            "KU408",
            "KU410",
            "KU416",
            "KU417",
            "KU418",
            "KU420",
            "KU421",
            "KU422",
            "KU423",
            "KU425",
            "KU426",
            "KU444",
            "KU430",
            "KU433",
            "KU434",
            "KU435",
            "KU436",
            "KU438",
            "KU440",
            "KU441",
            "KU475",
            "KU478",
            "KU480",
            "KU481",
            "KU483",
            "KU484",
            "KU489",
            "KU491",
            "KU494",
            "KU495",
            "KU498",
            "KU499",
            "KU500",
            "KU503",
            "KU504",
            "KU505",
            "KU508",
            "KU507",
            "KU529",
            "KU531",
            "KU535",
            "KU536",
            "KU538",
            "KU541",
            "KU543",
            "KU545",
            "KU560",
            "KU561",
            "KU562",
            "KU563",
            "KU564",
            "KU309",
            "KU576",
            "KU577",
            "KU578",
            "KU445",
            "KU580",
            "KU581",
            "KU599",
            "KU583",
            "KU854",
            "KU584",
            "KU588",
            "KU592",
            "KU593",
            "KU595",
            "KU598",
            "KU601",
            "KU604",
            "KU607",
            "KU608",
            "KU609",
            "KU611",
            "KU638",
            "KU614",
            "KU615",
            "KU616",
            "KU619",
            "KU620",
            "KU623",
            "KU624",
            "KU625",
            "KU626",
            "KU630",
            "KU631",
            "KU635",
            "KU636",
            "KU678",
            "KU710",
            "KU680",
            "KU681",
            "KU683",
            "KU684",
            "KU686",
            "KU687",
            "KU689",
            "KU691",
            "KU694",
            "KU697",
            "KU698",
            "KU700",
            "KU702",
            "KU704",
            "KU707",
            "KU729",
            "KU732",
            "KU734",
            "KU736",
            "KU790",
            "KU738",
            "KU739",
            "KU740",
            "KU742",
            "KU743",
            "KU746",
            "KU747",
            "KU748",
            "KU791",
            "KU749",
            "KU751",
            "KU753",
            "KU755",
            "KU758",
            "KU759",
            "KU761",
            "KU762",
            "KU765",
            "KU766",
            "KU768",
            "KU771",
            "KU777",
            "KU778",
            "KU781",
            "KU783",
            "KU831",
            "KU832",
            "KU833",
            "KU834",
            "KU837",
            "KU844",
            "KU845",
            "KU846",
            "KU848",
            "KU849",
            "KU850",
            "KU851",
            "KU853",
            "KU857",
            "KU858",
            "KU859",
            "KU886",
            "KU887",
            "KU889",
            "KU890",
            "KU892",
            "KU893",
            "KU895",
            "KU785",
            "KU905",
            "KU908",
            "KU092",
            "KU915",
            "KU918",
            "KU921",
            "KU922",
            "KU924",
            "KU925",
            "KU927",
            "KU931",
            "KU934",
            "KU935",
            "KU936",
            "KU941",
            "KU946",
            "KU976",
            "KU977",
            "KU980",
            "KU981",
            "KU989",
            "KU992"
          ]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": [
            "vaesto",
            "kokmuutos_p"
          ]
        }
      },
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2000",
            "2004",
            "2008",
            "2012",
            "2017",
            "2021"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }
  let data = await getData_query(url,query)
  return data
}

const getPopulation = async()=>{
  const data = await populationData()
  const alueValue = data.value 
  const alueNimi = Object.keys(data.dimension.Alue.category.label)
  const alueNimi2 = data.dimension.Alue.category.label
  let lista1 = [] 
  let lista2 = []
  for (let i = 0; i < alueNimi.length; i++) {  
    if(i === 0){
      lista1[i] = [alueNimi2[alueNimi[i]],alueValue[0],alueValue[1],alueValue[2],alueValue[3],alueValue[4],alueValue[5]]
      lista2[i] = [alueNimi2[alueNimi[i]],alueValue[6],alueValue[7],alueValue[8],alueValue[9],alueValue[10],alueValue[11]]
    }else{    
    lista1[i] = [alueNimi2[alueNimi[i]],alueValue[0+i*12],alueValue[1+i*12],alueValue[2+i*12],alueValue[3+i*12],alueValue[4+i*12],alueValue[5+i*12]]
    lista2[i] = [alueNimi2[alueNimi[i]],alueValue[0+6+i*12],alueValue[1+6+i*12],alueValue[2+6+i*12],alueValue[3+6+i*12],alueValue[4+6+i*12],alueValue[5+6+i*12]]
  }  
  }    
  let lista = [lista1,lista2] 
  return lista     
}
const addPopToMap = async(year)=>{
  let populationData = await getPopulation()
  map.remove()
  map = L.map("map");
  let mapData = await fetcher();
  for (let i = 0; i < mapData.features.length; i++) {
    mapData.features[i]["population"] = "";
  }
  let data = await check2(populationData[0],mapData,year)
  let geoJson = L.geoJSON(data, { 
    style: addstyle2,
    weight: 2,
    onEachFeature: getfeature2
  }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 4,
    maxZoom: 10,
    attribution: "© OpenStreetMap"
  }).addTo(map);
  map.fitBounds(geoJson.getBounds());
}
//addPopToMap()

const check2 = async(populationData,mapData,year)=>{
  let featurit = mapData.features;
  let index = [];
  for (let i = 0; i < featurit.length; i++) {
    index[i] = featurit[i].properties.nimi;
  }
  let found;
  for (let i = 0; i < featurit.length; i++) {
    found = index.findIndex((element) => element === populationData[i][0]);
    if (found > -1) {
      featurit[found]["population"] = populationData[i][year+1];
    }
  }
  return mapData;


}

const addstyle2 = (feature)=>{
  if (!feature.population){
    return {color: "#FF0000"}
  }
  
  if (feature.population !== "") {
      if (feature.population < 10000){
        return{
          color: "#a0a832"
        }

    };
    if (feature.population < 50000){
      return{
        color: "#32a853"
      }

    };
    if (feature.population < 100000){
      return{
        color: "#32a8a2"
      }

    };
    if (feature.population > 100000){
      return{
        color: "#324aa8"
      }

    };
  } 
}
const getfeature2 = (feature,layer)=>{
  if (!feature.properties.nimi) return;
  const population = feature.population;
  const name = feature.properties.name
  layer.on("click", function () {
  }); 
  layer.bindTooltip(
    `  
    <li>${name}</li> 
    <li>${population}</li> 
    `
  );
  layer.bindPopup(
    `
    <li>${name}</li> 
  <li>${population}</li>  
`
  );

}
 
function onMapClick(e) {
  //map.remove()
  

}

map.on("click", onMapClick);

// Tämä kutsuu tulodataa
const incomeData = async () => {
  let query = {
    query: [
      {
        code: "Vuosi",
        selection: {
          filter: "item",
          values: ["2000", "2004", "2008", "2012", "2017", "2020"]
        }
      },
      {
        code: "Kunta",
        selection: {
          filter: "item",
          values: [
            "SSS",
            "KU049",
            "KU091",
            "KU106",
            "KU186",
            "KU224",
            "KU235",
            "KU245",
            "KU257",
            "KU444",
            "KU505",
            "KU543",
            "KU611",
            "KU753",
            "KU755",
            "KU858",
            "KU092",
            "KU927",
            "KU407",
            "KU434",
            "KU018",
            "KU504",
            "KU638",
            "KU616",
            "KU078",
            "KU149",
            "KU710",
            "KU019",
            "KU284",
            "KU430",
            "KU480",
            "KU561",
            "KU636",
            "KU734",
            "KU761",
            "KU202",
            "KU423",
            "KU481",
            "KU503",
            "KU529",
            "KU538",
            "KU577",
            "KU680",
            "KU704",
            "KU738",
            "KU853",
            "KU304",
            "KU400",
            "KU631",
            "KU833",
            "KU895",
            "KU918",
            "KU322",
            "KU445",
            "KU061",
            "KU103",
            "KU169",
            "KU834",
            "KU981",
            "KU082",
            "KU109",
            "KU165",
            "KU086",
            "KU433",
            "KU694",
            "KU016",
            "KU081",
            "KU111",
            "KU098",
            "KU316",
            "KU398",
            "KU560",
            "KU576",
            "KU781",
            "KU075",
            "KU285",
            "KU489",
            "KU624",
            "KU935",
            "KU142",
            "KU286",
            "KU153",
            "KU580",
            "KU689",
            "KU700",
            "KU405",
            "KU416",
            "KU441",
            "KU739",
            "KU831",
            "KU099",
            "KU181",
            "KU214",
            "KU230",
            "KU747",
            "KU079",
            "KU102",
            "KU271",
            "KU484",
            "KU531",
            "KU608",
            "KU609",
            "KU886",
            "KU050",
            "KU051",
            "KU684",
            "KU783",
            "KU020",
            "KU887",
            "KU908",
            "KU619",
            "KU790",
            "KU143",
            "KU250",
            "KU581",
            "KU108",
            "KU211",
            "KU418",
            "KU536",
            "KU562",
            "KU604",
            "KU635",
            "KU837",
            "KU922",
            "KU980",
            "KU177",
            "KU508",
            "KU702",
            "KU936",
            "KU172",
            "KU435",
            "KU077",
            "KU179",
            "KU410",
            "KU500",
            "KU592",
            "KU850",
            "KU892",
            "KU182",
            "KU291",
            "KU249",
            "KU495",
            "KU216",
            "KU226",
            "KU256",
            "KU265",
            "KU312",
            "KU601",
            "KU729",
            "KU931",
            "KU275",
            "KU992",
            "KU005",
            "KU052",
            "KU403",
            "KU759",
            "KU934",
            "KU010",
            "KU300",
            "KU989",
            "KU145",
            "KU233",
            "KU301",
            "KU408",
            "KU743",
            "KU151",
            "KU218",
            "KU232",
            "KU846",
            "KU288",
            "KU440",
            "KU599",
            "KU598",
            "KU893",
            "KU152",
            "KU399",
            "KU231",
            "KU287",
            "KU545",
            "KU280",
            "KU475",
            "KU499",
            "KU905",
            "KU946",
            "KU097",
            "KU213",
            "KU491",
            "KU507",
            "KU588",
            "KU623",
            "KU171",
            "KU178",
            "KU593",
            "KU046",
            "KU090",
            "KU681",
            "KU740",
            "KU768",
            "KU204",
            "KU687",
            "KU857",
            "KU297",
            "KU749",
            "KU686",
            "KU778",
            "KU844",
            "KU921",
            "KU420",
            "KU915",
            "KU140",
            "KU239",
            "KU263",
            "KU402",
            "KU595",
            "KU762",
            "KU925",
            "KU146",
            "KU167",
            "KU176",
            "KU276",
            "KU426",
            "KU309",
            "KU607",
            "KU260",
            "KU707",
            "KU848",
            "KU422",
            "KU541",
            "KU074",
            "KU236",
            "KU421",
            "KU584",
            "KU849",
            "KU924",
            "KU217",
            "KU272",
            "KU071",
            "KU630",
            "KU791",
            "KU305",
            "KU832",
            "KU069",
            "KU317",
            "KU535",
            "KU626",
            "KU691",
            "KU072",
            "KU244",
            "KU425",
            "KU436",
            "KU494",
            "KU564",
            "KU859",
            "KU139",
            "KU615",
            "KU889",
            "KU785",
            "KU625",
            "KU678",
            "KU748",
            "KU009",
            "KU208",
            "KU483",
            "KU563",
            "KU746",
            "KU977",
            "KU205",
            "KU578",
            "KU697",
            "KU765",
            "KU105",
            "KU290",
            "KU620",
            "KU777",
            "KU320",
            "KU583",
            "KU614",
            "KU732",
            "KU742",
            "KU240",
            "KU241",
            "KU751",
            "KU845",
            "KU851",
            "KU148",
            "KU758",
            "KU890",
            "KU683",
            "KU698",
            "KU854",
            "KU976",
            "KU047",
            "KU261",
            "KU273",
            "KU498",
            "KU478",
            "KU043",
            "KU060",
            "KU065",
            "KU076",
            "KU170",
            "KU417",
            "KU438",
            "KU736",
            "KU771",
            "KU035",
            "KU062",
            "KU295",
            "KU318",
            "KU766",
            "KU941"
          ]
        }
      },
      {
        code: "Tiedot",
        selection: {
          filter: "item",
          values: ["palk"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };
  let url =
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tjt/statfin_tjt_pxt_118w.px";

  const data = await getData_query(url, query);
  return data;
};
// getIncome ja goAll kummatkin prosessoi tulodataa
const getIncome = async () => {
  const income = await incomeData(); 
  const results = Object.values(income.value);
  const labels = Object.values(income.dimension.Kunta.category.label);
  let returnI = [];
  for (let i = 0; i < 6; i++) {
    returnI[i] = goAll(results, i, labels);
  }

  return returnI;
};

const goAll = (lista, vuosi, nimet) => {
  let returnValue = [];
  for (let i = vuosi; i < nimet.length + nimet.length * vuosi; i++) {
    returnValue[i - vuosi * nimet.length] = [
      nimet[i - vuosi * nimet.length],
      lista[i]
    ];
  }
  return returnValue;
};
// Rakentaa tulo chartin
const buildAnother = async (nimi) => {
  if (!nimi) {
    return null;
  }
  let data = await getIncome();
  let wanted;
  for (let i = 0; i < data[0].length; i++) {
    if (data[0][i][0] === nimi) {
      wanted = i;
    }
  }
  let taulukko = [];
  if (typeof wanted === "undefined") {
    return null;
  }
  for (let i = 0; i < 6; i++) {
    taulukko[i] = data[i][wanted][1];
  }
  const datatwo = {
    labels: [2000, 2004, 2008, 2012, 2017, 2021],
    datasets: [{ values: taulukko }]
  };
  return datatwo;
};

// Tämä kutsuu työllisyysdataa
const employmentData = async () => {
  let query = {
    "query": [
      {
        "code": "Työpaikan alue",
        "selection": {
          "filter": "item",
          "values": [
            "SSS",
            "KU020",
            "KU005",
            "KU009",
            "KU010",
            "KU016",
            "KU018",
            "KU019",
            "KU035",
            "KU043",
            "KU046",
            "KU047",
            "KU049",
            "KU050",
            "KU051",
            "KU052",
            "KU060",
            "KU061",
            "KU062",
            "KU065",
            "KU069",
            "KU071",
            "KU072",
            "KU074",
            "KU075",
            "KU076",
            "KU077",
            "KU078",
            "KU079",
            "KU081",
            "KU082",
            "KU086",
            "KU111",
            "KU090",
            "KU091",
            "KU097",
            "KU098",
            "KU102",
            "KU103",
            "KU105",
            "KU106",
            "KU108",
            "KU109",
            "KU139",
            "KU140",
            "KU142",
            "KU143",
            "KU145",
            "KU146",
            "KU153",
            "KU148",
            "KU149",
            "KU151",
            "KU152",
            "KU165",
            "KU167",
            "KU169",
            "KU170",
            "KU171",
            "KU172",
            "KU176",
            "KU177",
            "KU178",
            "KU179",
            "KU181",
            "KU182",
            "KU186",
            "KU202",
            "KU204",
            "KU205",
            "KU208",
            "KU211",
            "KU213",
            "KU214",
            "KU216",
            "KU217",
            "KU218",
            "KU224",
            "KU226",
            "KU230",
            "KU231",
            "KU232",
            "KU233",
            "KU235",
            "KU236",
            "KU239",
            "KU240",
            "KU320",
            "KU241",
            "KU322",
            "KU244",
            "KU245",
            "KU249",
            "KU250",
            "KU256",
            "KU257",
            "KU260",
            "KU261",
            "KU263",
            "KU265",
            "KU271",
            "KU272",
            "KU273",
            "KU275",
            "KU276",
            "KU280",
            "KU284",
            "KU285",
            "KU286",
            "KU287",
            "KU288",
            "KU290",
            "KU291",
            "KU295",
            "KU297",
            "KU300",
            "KU301",
            "KU304",
            "KU305",
            "KU312",
            "KU316",
            "KU317",
            "KU318",
            "KU398",
            "KU399",
            "KU400",
            "KU407",
            "KU402",
            "KU403",
            "KU405",
            "KU408",
            "KU410",
            "KU416",
            "KU417",
            "KU418",
            "KU420",
            "KU421",
            "KU422",
            "KU423",
            "KU425",
            "KU426",
            "KU444",
            "KU430",
            "KU433",
            "KU434",
            "KU435",
            "KU436",
            "KU438",
            "KU440",
            "KU441",
            "KU475",
            "KU478",
            "KU480",
            "KU481",
            "KU483",
            "KU484",
            "KU489",
            "KU491",
            "KU494",
            "KU495",
            "KU498",
            "KU499",
            "KU500",
            "KU503",
            "KU504",
            "KU505",
            "KU508",
            "KU507",
            "KU529",
            "KU531",
            "KU535",
            "KU536",
            "KU538",
            "KU541",
            "KU543",
            "KU545",
            "KU560",
            "KU561",
            "KU562",
            "KU563",
            "KU564",
            "KU309",
            "KU576",
            "KU577",
            "KU578",
            "KU445",
            "KU580",
            "KU581",
            "KU599",
            "KU583",
            "KU854",
            "KU584",
            "KU588",
            "KU592",
            "KU593",
            "KU595",
            "KU598",
            "KU601",
            "KU604",
            "KU607",
            "KU608",
            "KU609",
            "KU611",
            "KU638",
            "KU614",
            "KU615",
            "KU616",
            "KU619",
            "KU620",
            "KU623",
            "KU624",
            "KU625",
            "KU626",
            "KU630",
            "KU631",
            "KU635",
            "KU636",
            "KU678",
            "KU710",
            "KU680",
            "KU681",
            "KU683",
            "KU684",
            "KU686",
            "KU687",
            "KU689",
            "KU691",
            "KU694",
            "KU697",
            "KU698",
            "KU700",
            "KU702",
            "KU704",
            "KU707",
            "KU729",
            "KU732",
            "KU734",
            "KU736",
            "KU790",
            "KU738",
            "KU739",
            "KU740",
            "KU742",
            "KU743",
            "KU746",
            "KU747",
            "KU748",
            "KU791",
            "KU749",
            "KU751",
            "KU753",
            "KU755",
            "KU758",
            "KU759",
            "KU761",
            "KU762",
            "KU765",
            "KU766",
            "KU768",
            "KU771",
            "KU777",
            "KU778",
            "KU781",
            "KU783",
            "KU831",
            "KU832",
            "KU833",
            "KU834",
            "KU837",
            "KU844",
            "KU845",
            "KU846",
            "KU848",
            "KU849",
            "KU850",
            "KU851",
            "KU853",
            "KU857",
            "KU858",
            "KU859",
            "KU886",
            "KU887",
            "KU889",
            "KU890",
            "KU892",
            "KU893",
            "KU895",
            "KU785",
            "KU905",
            "KU908",
            "KU092",
            "KU915",
            "KU918",
            "KU921",
            "KU922",
            "KU924",
            "KU925",
            "KU927",
            "KU931",
            "KU934",
            "KU935",
            "KU936",
            "KU941",
            "KU946",
            "KU976",
            "KU977",
            "KU980",
            "KU981",
            "KU989",
            "KU992"
          ]
        }
      },
      {
        "code": "Pendelöinti",
        "selection": {
          "filter": "item",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Koulutusaste",
        "selection": {
          "filter": "item",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Ikä",
        "selection": {
          "filter": "item",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2000",
            "2004",
            "2008",
            "2012",
            "2017",
            "2020"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }
  let url =  
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115p.px";
  const data = await getData_query(url, query);
  return data
}; 
const getEmployment = async(nimi) => {
  if(!nimi){
    return null
  }
  const data = await employmentData();
  const results = Object.values(data.value);  
  const labels = Object.values(data.dimension.["Työpaikan alue"].category.label);
 
  const indeksi = labels.indexOf(nimi)  
  if (indeksi === -1) {
    return null;
  }
 
  const datapisteet = []
  for (let i = 0; i < 6; i++) {
    datapisteet[i] = results[indeksi*6+i]
  }
  return datapisteet

}; 
const buildEmployment = async(nimi)=>{
  const datapoints = await getEmployment(nimi);
  if(datapoints == null){
    return null
  } 
  const datatwo = {
    labels: [2000, 2004, 2008, 2012, 2017, 2021],
    datasets: [{ values: datapoints }]
  }; 
  return datatwo
}

// Tämä osa koodia piirtää mahdollisen chartin klikatusta kunnasta
// Chartti näyttää kuinka monta istuinta puolueilla on kunnassa
const county_history = async (county_name) => {
  if (!county_name) {
    return null
  }
  let data = await election();
  let lista = [];
  for (let i = 0; i < 6; i++) {
    lista[i] = formatData(data, i);
  }
  let wanted;
  for (let i = 0; i < lista[0].length; i++) {
    if (lista[0][i].mun === county_name) {
      wanted = i;
    }
  }
  if(typeof wanted ==='undefined'){
    return null
  }
  let byPartyKOK = [];
  let byPartySDP = [];
  let byPartyKESK = [];
  let byPartyPS = [];
  let byPartyVIHR = [];
  let byPartyVAS = [];
  let byPartyRKP = [];
  let byPartyKD = [];
  for (let i = 0; i < 6; i++) {
    byPartyKOK[i] = lista[i][wanted].kok_mp;
    byPartySDP[i] = lista[i][wanted].sdp_mp;
    byPartyKESK[i] = lista[i][wanted].kesk_mp;
    byPartyPS[i] = lista[i][wanted].ps_mp;
    byPartyVIHR[i] = lista[i][wanted].vihr_mp;
    byPartyVAS[i] = lista[i][wanted].vas_mp;
    byPartyRKP[i] = lista[i][wanted].rkp_mp;
    byPartyKD[i] = lista[i][wanted].kd_mp;
  }
  const datatwo = {
    labels: [2000, 2004, 2008, 2012, 2017, 2021],
    datasets: [
      {
        name: "KOK",
        values: byPartyKOK
      },
      {
        name: "SDP",
        values: byPartySDP
      },
      {
        name: "KESK",
        values: byPartyKESK
      },
      {
        name: "PS",
        values: byPartyPS
      },
      {
        name: "GRN",
        values: byPartyVIHR
      },
      {
        name: "VAS",
        values: byPartyVAS
      }, 
      {
        name: "RKP",
        values: byPartyRKP
      }, 
      {
        name: "KD",
        values: byPartyKD
      }
    ]
  };
  return datatwo;
};
county_history();


// build, build2 ja build3 rakentavat eri chartit, olisi voitu
// käyttää vaan yhtä funktiota, mutta mielestäni näin on näppärämpi
const builds = async (nimi) => {
  let data = await county_history(nimi);
  if(data == null){
    return
  }
  const chart2 = new Chart("#chart", {
    title: nimi +" council members",
    data: data,
    type: "axis-mixed", 
    height: 240,
    spaceRatio: 0.1,
    colors: ["#0040ff","#ff4000","#bfff00","#00ffff","#40ff00","#ff0000","#ffff00","#bf00ff"]
  });
  return chart2 
}; 
//builds();
const builds2 = async (nimi) => {
  let data = await buildAnother(nimi);
  if (data == null) {
    return;
  }
  const chart2 = new Chart("#chart2", {
    title: nimi + " €/year",
    data: data,
    type: "axis-mixed",
    height: 240,
    colors: ["#eb5146"],
    animate: 1,
    truncateLegends: 0
  });
  return chart2
  
}; 
const builds3 = async (nimi) => {
  let data = await buildEmployment(nimi);  
  if (data == null) {
    return 1; 
  }
  const chart2 = new Chart("#chart3", {
    title: nimi + " jobs total",
    data: data,
    type: "axis-mixed",
    height: 240,
    colors: ["#eb5146"]
  });
  return chart2
};

// Kun sivusta avataan niin siellä on jo valmiiksi vuoden 2000 kartta
const beginning = async () => {
  let data = await fetcher();
  createMap(data, 0);
};
beginning();

/* 
Apua löydettiin:
https://stackoverflow.com/questions/14867835/get-substring-between-two-characters-using-javascript
https://www.w3schools.com/jsref/jsref_sort.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
https://web.dev/drag-and-drop/?gclid=CjwKCAjw79iaBhAJEiwAPYwoCPXBMvIY7xk5FHxIT87D-OGsMyRl2krYRE3yVnmlueFzu_2PmCjF-BoCWz4QAvD_BwE
*/
