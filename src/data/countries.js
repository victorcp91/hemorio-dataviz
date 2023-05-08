const countries = [
    {
      "label": "Afghanistan",
      "value": "afghanistan"
    },
    {
      "label": "Albania",
      "value": "albania"
    },
    {
      "label": "Algeria",
      "value": "algeria"
    },
    {
      "label": "Andorra",
      "value": "andorra"
    },
    {
      "label": "Angola",
      "value": "angola"
    },
    {
      "label": "Antigua and Barbuda",
      "value": "antigua_and_barbuda"
    },
    {
      "label": "Argentina",
      "value": "argentina"
    },
    {
      "label": "Armenia",
      "value": "armenia"
    },
    {
      "label": "Australia",
      "value": "australia"
    },
    {
      "label": "Austria",
      "value": "austria"
    },
    {
      "label": "Azerbaijan",
      "value": "azerbaijan"
    },
    {
      "label": "Bahamas",
      "value": "bahamas"
    },
    {
      "label": "Bahrain",
      "value": "bahrain"
    },
    {
      "label": "Bangladesh",
      "value": "bangladesh"
    },
    {
      "label": "Barbados",
      "value": "barbados"
    },
    {
      "label": "Belarus",
      "value": "belarus"
    },
    {
      "label": "Belgium",
      "value": "belgium"
    },
    {
      "label": "Belize",
      "value": "belize"
    },
    {
      "label": "Benin",
      "value": "benin"
    },
    {
      "label": "Bhutan",
      "value": "bhutan"
    },
    {
      "label": "Bolivia",
      "value": "bolivia"
    },
    {
      "label": "Bosnia and Herzegovina",
      "value": "bosnia_and_herzegovina"
    },
    {
      "label": "Botswana",
      "value": "botswana"
    },
    {
      "label": "Brazil",
      "value": "brazil"
    },
    {
      "label": "Brunei",
      "value": "brunei"
    },
    {
      "label": "Bulgaria",
      "value": "bulgaria"
    },
    {
      "label": "Burkina Faso",
      "value": "burkina_faso"
    },
    {
      "label": "Burundi",
      "value": "burundi"
    },
    {
      "label": "Cambodia",
      "value": "cambodia"
    },
    {
      "label": "Cameroon",
      "value": "cameroon"
    },
    {
      "label": "Canada",
      "value": "canada"
    },
    {
      "label": "Cape Verde",
      "value": "cape_verde"
    },
    {
      "label": "Central African Republic",
      "value": "central_african_republic"
    },
    {
      "label": "Chad",
      "value": "chad"
    },
    {
      "label": "Chile",
      "value": "chile"
    },
    {
        "label": "China",
        "value": "china"
      },
      {
        "label": "Colombia",
        "value": "colombia"
      },
      {
        "label": "Comoros",
        "value": "comoros"
      },
      {
        "label": "Congo",
        "value": "congo"
      },
      {
        "label": "Costa Rica",
        "value": "costa_rica"
      },
      {
        "label": "Croatia",
        "value": "croatia"
      },
      {
        "label": "Cuba",
        "value": "cuba"
      },
      {
        "label": "Cyprus",
        "value": "cyprus"
      },
      {
        "label": "Czech Republic",
        "value": "czech_republic"
      },
      {
        "label": "Denmark",
        "value": "denmark"
      },
      {
        "label": "Djibouti",
        "value": "djibouti"
      },
      {
        "label": "Dominica",
        "value": "dominica"
      },
      {
        "label": "Dominican Republic",
        "value": "dominican_republic"
      },
      {
        "label": "Ecuador",
        "value": "ecuador"
      },
      {
        "label": "Egypt",
        "value": "egypt"
      },
      {
        "label": "El Salvador",
        "value": "el_salvador"
      },
      {
        "label": "Equatorial Guinea",
        "value": "equatorial_guinea"
      },
      {
        "label": "Eritrea",
        "value": "eritrea"
      },
      {
        "label": "Estonia",
        "value": "estonia"
      },
      {
        "label": "Ethiopia",
        "value": "ethiopia"
      },
      {
        "label": "Fiji",
        "value": "fiji"
      },
      {
        "label": "Finland",
        "value": "finland"
      },
      {
        "label": "France",
        "value": "france"
      },
      {
        "label": "Gabon",
        "value": "gabon"
      },
      {
        "label": "Gambia",
        "value": "gambia"
      },
      {
        "label": "Georgia",
        "value": "georgia"
      },
      {
        "label": "Germany",
        "value": "germany"
      },
      {
        "label": "Ghana",
        "value": "ghana"
      },
      {
        "label": "Greece",
        "value": "greece"
      },
      {
        "label": "Grenada",
        "value": "grenada"
      },
      {
        "label": "Guatemala",
        "value": "guatemala"
      },
      {
        "label": "Guinea",
        "value": "guinea"
      },
      {
        "label": "Guinea-Bissau",
        "value": "guinea-bissau"
      },
      {
        "label": "Guyana",
        "value": "guyana"
      },
      {
        "label": "Haiti",
        "value": "haiti"
      },
      {
        "label": "Honduras",
        "value": "honduras"
      },
      {
        "label": "Hungary",
        "value": "hungary"
      },
      {
        "label": "Iceland",
        "value": "iceland"
      },
      {
        "label": "India",
        "value": "india"
      },
      {
        "label": "Indonesia",
        "value": "indonesia"
      },
      {
        "label": "Iran",
        "value": "iran"
      },
      {
        "label": "Iraq",
        "value": "iraq"
      },
      {
        "label": "Ireland",
        "value": "ireland"
      },
      {
        "label": "Israel",
        "value": "israel"
      },
      {
        "label": "Italy",
        "value": "italy"
      },
      {
        "label": "Jamaica",
        "value": "jamaica"
      },
      {
        "label": "Japan",
        "value": "japan"
      },
      {
        "label": "Jordan",
        "value": "jordan"
      },
      {
        "label": "Kazakhstan",
        "value": "kazakhstan"
      },
      {
        "label": "Kenya",
        "value": "kenya"
      },
      {
        "label": "Kiribati",
        "value": "kiribati"
      },
      {
        "label": "Kuwait",
        "value": "kuwait"
      },
      {
        "label": "Kyrgyzstan",
        "value": "kyrgyzstan"
      },
      {
        "label": "Laos",
        "value": "laos"
      },
      {
        "label": "Latvia",
        "value": "latvia"
      },
      {
        "label": "Lebanon",
        "value": "lebanon"
      },
      {
        "label": "Lesotho",
        "value": "lesotho"
      },
      {
        "label": "Liberia",
        "value": "liberia"
      },
      {
        "label": "Libya",
        "value": "libya"
      },
      {
        "label": "Liechtenstein",
        "value": "liechtenstein"
      },
      {
        "label": "Lithuania",
        "value": "lithuania"
      },
      {
        "label": "Luxembourg",
        "value": "luxembourg"
      },
      {
        "label": "Madagascar",
        "value": "madagascar"
      },
      {
        "label": "Malawi",
        "value": "malawi"
      },
      {
        "label": "Malaysia",
        "value": "malaysia"
      },
      {
        "label": "Maldives",
        "value": "maldives"
      },
      {
        "label": "Mali",
        "value": "mali"
      },
      {
        "label": "Malta",
        "value": "malta"
      },
      {
        "label": "Marshall Islands",
        "value": "marshall_islands"
      },
      {
        "label": "Mauritania",
        "value": "mauritania"
      },
      {
        "label": "Mauritius",
        "value": "mauritius"
      },
      {
        "label": "Mexico",
        "value": "mexico"
      },
      {
        "label": "Micronesia",
        "value": "micronesia"
      },
      {
        "label": "Moldova",
        "value": "moldova"
      },
      {
        "label": "Monaco",
        "value": "monaco"
      },
      {
        "label": "Mongolia",
        "value": "mongolia"
      },
      {
        "label": "Montenegro",
        "value": "montenegro"
      },
      {
        "label": "Morocco",
        "value": "morocco"
      },
      {
        "label": "Mozambique",
        "value": "mozambique"
      },
      {
        "label": "Myanmar",
        "value": "myanmar"
      },
      {
        "label": "Namibia",
        "value": "namibia"
      },
      {
        "label": "Nauru",
        "value": "nauru"
      },
      {
        "label": "Nepal",
        "value": "nepal"
      },
      {
        "label": "Netherlands",
        "value": "netherlands"
      },
      {
        "label": "New Zealand",
        "value": "new_zealand"
      },
      {
        "label": "Nicaragua",
        "value": "nicaragua"
      },
      {
        "label": "Niger",
        "value": "niger"
      },
      {
        "label": "Nigeria",
        "value": "nigeria"
      },
      {
        "label": "North Korea",
        "value": "north_korea"
      },
      {
        "label": "North Macedonia",
        "value": "north_macedonia"
      },
      {
        "label": "Norway",
        "value": "norway"
      },
      {
        "label": "Oman",
        "value": "oman"
      },
      {
        "label": "Pakistan",
        "value": "pakistan"
      },
      {
        "label": "Palau",
        "value": "palau"
      },
      {
        "label": "Panama",
        "value": "panama"
      },
      {
        "label": "Papua New Guinea",
        "value": "papua_new_guinea"
      },
      {
        "label": "Paraguay",
        "value": "paraguay"
      },
      {
        "label": "Peru",
        "value": "peru"
      },
      {
        "label": "Philippines",
        "value": "philippines"
      },
      {
        "label": "Poland",
        "value": "poland"
      },
      {
        "label": "Portugal",
        "value": "portugal"
      },
      {
        "label": "Qatar",
        "value": "qatar"
      },
      {
        "label": "Romania",
        "value": "romania"
      },
      {
        "label": "Russia",
        "value": "russia"
      },
      {
        "label": "Rwanda",
        "value": "rwanda"
      },
      {
        "label": "Saint Kitts and Nevis",
        "value": "saint_kitts_and_nevis"
      },
      {
        "label": "Saint Lucia",
        "value": "saint_lucia"
      },
      {
        "label": "Saint Vincent and the Grenadines",
        "value": "saint_vincent_and_the_grenadines"
      },
      {
        "label": "Samoa",
        "value": "samoa"
      },
      {
        "label": "San Marino",
        "value": "san_marino"
      },
      {
        "label": "Sao Tome and Principe",
        "value": "sao_tome_and_principe"
      },
      {
        "label": "Saudi Arabia",
        "value": "saudi_arabia"
      },
      {
        "label": "Senegal",
        "value": "senegal"
      },
      {
        "label": "Serbia",
        "value": "serbia"
      },
      {
        "label": "Seychelles",
        "value": "seychelles"
      },
      {
        "label": "Sierra Leone",
        "value": "sierra_leone"
      },
      {
        "label": "Singapore",
        "value": "singapore"
      },
      {
        "label": "Slovakia",
        "value": "slovakia"
      },
      {
        "label": "Slovenia",
        "value": "slovenia"
      },
      {
        "label": "Solomon Islands",
        "value": "solomon_islands"
      },
      {
        "label": "Somalia",
        "value": "somalia"
      },
      {
        "label": "South Africa",
        "value": "south_africa"
      },
      {
        "label": "South Korea",
        "value": "south_korea"
      },
      {
        "label": "South Sudan",
        "value": "south_sudan"
      },
      {
        "label": "Spain",
        "value": "spain"
      },
      {
        "label": "Sri Lanka",
        "value": "sri_lanka"
      },
      {
        "label": "Sudan",
        "value": "sudan"
      },
      {
        "label": "Surilabel",
        "value": "surivalue"
      },
      {
        "label": "Sweden",
        "value": "sweden"
      },
      {
        "label": "Switzerland",
        "value": "switzerland"
      },
      {
        "label": "Syria",
        "value": "syria"
      },
      {
        "label": "Taiwan",
        "value": "taiwan"
      },
      {
        "label": "Tajikistan",
        "value": "tajikistan"
      },
      {
        "label": "Tanzania",
        "value": "tanzania"
      },
      {
        "label": "Thailand",
        "value": "thailand"
      },
      {
        "label": "Timor-Leste",
        "value": "timor-leste"
      },
      {
        "label": "Togo",
        "value": "togo"
      },
      {
        "label": "Tonga",
        "value": "tonga"
      },
      {
        "label": "Trinidad and Tobago",
        "value": "trinidad_and_tobago"
      },
      {
        "label": "Tunisia",
        "value": "tunisia"
      },
      {
        "label": "Turkey",
        "value": "turkey"
      },
      {
        "label": "Turkmenistan",
        "value": "turkmenistan"
      },
      {
        "label": "Tuvalu",
        "value": "tuvalu"
      },
      {
        "label": "Uganda",
        "value": "uganda"
      },
      {
        "label": "Ukraine",
        "value": "ukraine"
      },
      {
        "label": "United Arab Emirates",
        "value": "united_arab_emirates"
      },
      {
        "label": "United Kingdom",
        "value": "united_kingdom"
      },
      {
        "label": "United States of America",
        "value": "united_states_of_america"
      },
      {
        "label": "Uruguay",
        "value": "uruguay"
      },
      {
        "label": "Uzbekistan",
        "value": "uzbekistan"
      },
      {
        "label": "Vanuatu",
        "value": "vanuatu"
      },
      {
        "label": "Vatican City",
        "value": "vatican_city"
      },
      {
        "label": "Venezuela",
        "value": "venezuela"
      },
      {
        "label": "Vietnam",
        "value": "vietnam"
      },
      {
        "label": "Yemen",
        "value": "yemen"
      },
      {
        "label": "Zambia",
        "value": "zambia"
      },
      {
        "label": "Zimbabwe",
        "value": "zimbabwe"
      }
]

export default countries