export interface IState {
  name: statesNameType;
  shortname: statesShortNameType;
}

export const STATES: IState[] = [
  {
    name: 'Alabama',
    shortname: 'AL',
  },
  {
    name: 'Alaska',
    shortname: 'AK',
  },
  {
    name: 'American Samoa',
    shortname: 'AS',
  },
  {
    name: 'Arizona',
    shortname: 'AZ',
  },
  {
    name: 'Arkansas',
    shortname: 'AR',
  },
  {
    name: 'California',
    shortname: 'CA',
  },
  {
    name: 'Colorado',
    shortname: 'CO',
  },
  {
    name: 'Connecticut',
    shortname: 'CT',
  },
  {
    name: 'Delaware',
    shortname: 'DE',
  },
  {
    name: 'District Of Columbia',
    shortname: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    shortname: 'FM',
  },
  {
    name: 'Florida',
    shortname: 'FL',
  },
  {
    name: 'Georgia',
    shortname: 'GA',
  },
  {
    name: 'Guam',
    shortname: 'GU',
  },
  {
    name: 'Hawaii',
    shortname: 'HI',
  },
  {
    name: 'Idaho',
    shortname: 'ID',
  },
  {
    name: 'Illinois',
    shortname: 'IL',
  },
  {
    name: 'Indiana',
    shortname: 'IN',
  },
  {
    name: 'Iowa',
    shortname: 'IA',
  },
  {
    name: 'Kansas',
    shortname: 'KS',
  },
  {
    name: 'Kentucky',
    shortname: 'KY',
  },
  {
    name: 'Louisiana',
    shortname: 'LA',
  },
  {
    name: 'Maine',
    shortname: 'ME',
  },
  {
    name: 'Marshall Islands',
    shortname: 'MH',
  },
  {
    name: 'Maryland',
    shortname: 'MD',
  },
  {
    name: 'Massachusetts',
    shortname: 'MA',
  },
  {
    name: 'Michigan',
    shortname: 'MI',
  },
  {
    name: 'Minnesota',
    shortname: 'MN',
  },
  {
    name: 'Mississippi',
    shortname: 'MS',
  },
  {
    name: 'Missouri',
    shortname: 'MO',
  },
  {
    name: 'Montana',
    shortname: 'MT',
  },
  {
    name: 'Nebraska',
    shortname: 'NE',
  },
  {
    name: 'Nevada',
    shortname: 'NV',
  },
  {
    name: 'New Hampshire',
    shortname: 'NH',
  },
  {
    name: 'New Jersey',
    shortname: 'NJ',
  },
  {
    name: 'New Mexico',
    shortname: 'NM',
  },
  {
    name: 'New York',
    shortname: 'NY',
  },
  {
    name: 'North Carolina',
    shortname: 'NC',
  },
  {
    name: 'North Dakota',
    shortname: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    shortname: 'MP',
  },
  {
    name: 'Ohio',
    shortname: 'OH',
  },
  {
    name: 'Oklahoma',
    shortname: 'OK',
  },
  {
    name: 'Oregon',
    shortname: 'OR',
  },
  {
    name: 'Palau',
    shortname: 'PW',
  },
  {
    name: 'Pennsylvania',
    shortname: 'PA',
  },
  {
    name: 'Puerto Rico',
    shortname: 'PR',
  },
  {
    name: 'Rhode Island',
    shortname: 'RI',
  },
  {
    name: 'South Carolina',
    shortname: 'SC',
  },
  {
    name: 'South Dakota',
    shortname: 'SD',
  },
  {
    name: 'Tennessee',
    shortname: 'TN',
  },
  {
    name: 'Texas',
    shortname: 'TX',
  },
  {
    name: 'Utah',
    shortname: 'UT',
  },
  {
    name: 'Vermont',
    shortname: 'VT',
  },
  {
    name: 'Virgin Islands',
    shortname: 'VI',
  },
  {
    name: 'Virginia',
    shortname: 'VA',
  },
  {
    name: 'Washington',
    shortname: 'WA',
  },
  {
    name: 'West Virginia',
    shortname: 'WV',
  },
  {
    name: 'Wisconsin',
    shortname: 'WI',
  },
  {
    name: 'Wyoming',
    shortname: 'WY',
  },
];

export type statesNameType = 'Alabama'
| 'Alaska' | 'American Samoa'
| 'Arizona' | 'ArkansasAlabama'
| 'Alaska' | 'American Samoa'
| 'Arizona' | 'Arkansas'
| 'California' | 'Colorado'
| 'Connecticut' | 'Delaware'
| 'District Of Columbia'
| 'Federated States Of Micronesia'
| 'Florida' | 'Georgia'
| 'Guam' | 'Hawaii'
| 'Idaho' | 'Illinois' | 'Indiana'
| 'Iowa' | 'Kansas'
| 'Kentucky' | 'Louisiana'
| 'Maine' | 'Marshall Islands'
| 'Maryland' | 'Massachusetts'
| 'Michigan' | 'Minnesota'
| 'Mississippi' | 'Missouri'
| 'Montana' | 'Nebraska'
| 'Nevada' | 'New Hampshire'
| 'New Jersey' | 'New Mexico'
| 'New York' | 'North Carolina'
| 'North Dakota' | 'Northern Mariana Islands'
| 'Ohio' | 'Oklahoma'
| 'Oregon' | 'Palau'
| 'Pennsylvania' | 'Puerto Rico'
| 'Rhode Island' | 'South Carolina'
| 'South Dakota' | 'Tennessee'
| 'Texas' | 'Utah'
| 'Vermont' | 'Virgin Islands'
| 'Virginia' | 'Washington'
| 'West Virginia' | 'Wisconsin'
| 'Wyoming';

export type statesShortNameType = 'AL'
| 'AK' | 'AS' | 'AZ' | 'AR' | 'CA' | 'CO'
| 'CT' | 'DE' | 'DC' | 'FM' | 'FL' | 'GA'
| 'GU' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA'
| 'KS' | 'KY' | 'LA' | 'ME' | 'MH' | 'MD'
| 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT'
| 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY'
| 'NC' | 'ND' | 'MP' | 'OH' | 'OK' | 'OR'
| 'PW' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD'
| 'TN' | 'TX' | 'UT' | 'VT' | 'VI' | 'VA'
| 'WA' | 'WV' | 'WI' | 'WY';
