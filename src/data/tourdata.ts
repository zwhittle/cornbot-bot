export interface Address {
  street: string
  city: string
  state_province: string
  country: 'US' | 'CA'
  postal: string
}

export interface Venue {
  name: string
  address?: Address
  maps_url?: string
}

export interface TourDate {
  name: string
  date: string
  time?: string
  venue: Venue
  role: string
  ticket_url?: string
}

export interface Tour {
  key: string
  name: string
  description: string
  poster: string
  dates: TourDate[]
}

export const tourData: Tour[] = [
  // {
  //   key: 'canada2022',
  //   name: 'Canada Summer 2022',
  //   description: 'The Band tours Canada in Summer 2022',
  //   poster: 'tour_canada_2022.jpeg',
  //   dates: [
  //     {
  //       name: 'Ottawa, ON',
  //       date: '2022-06-03',
  //       venue: { name: 'Bronson Centre' },
  //       role: 'Ottawa_2022',
  //     },
  //     {
  //       name: 'Montreal, QC',
  //       date: '2022-06-04',
  //       venue: { name: 'Theatre Fairmount' },
  //       role: 'Montreal_2022',
  //     },
  //     {
  //       name: 'Quebec City, QC',
  //       date: '2022-06-05',
  //       venue: { name: 'Imperial Hall' },
  //       role: 'Quebec_2022',
  //     },
  //     {
  //       name: 'Oshawa, ON',
  //       date: '2022-06-09',
  //       venue: { name: 'Biltmore Theatre' },
  //       role: 'Oshawa_2022',
  //     },
  //     {
  //       name: 'Toronto, ON',
  //       date: '2022-06-10',
  //       venue: { name: 'The Danforth' },
  //       role: 'Toronto_2022',
  //     },
  //     {
  //       name: 'London, ON',
  //       date: '2022-06-11',
  //       venue: { name: 'London Music Hall' },
  //       role: 'London_2022',
  //     },
  //   ],
  // },
  // {
  //   key: 'seachangefest2022',
  //   name: 'Sea Change Super Friendly Fest 2022',
  //   description: 'The Band headlines Sea Change Super Friendly Fest 2022',
  //   poster: 'tour_seachange_2022.jpeg',
  //   dates: [
  //     {
  //       name: 'Edmonton, AB',
  //       date: '2022-09-11',
  //       venue: { name: 'Union Hall' },
  //       role: 'Edmonton_2022',
  //     },
  //   ],
  // },
  {
    key: 'australia2023',
    name: 'Australia 2023',
    description: 'The Band joins Plini across Australia in February 2023',
    poster: 'tour_australia_2023.jpeg',
    dates: [
      { name: 'Sydney', date: '2023-01-28', venue: { name: 'Metro Theatre' }, role: 'Sydney_2023' },
      {
        name: 'Newcastle',
        date: '2023-01-29',
        venue: { name: 'Newcastle Hotel' },
        role: 'Newcastle_2023',
      },
      {
        name: 'Canberra',
        date: '2023-02-01',
        venue: { name: 'The Basement' },
        role: 'Canberra_2023',
      },
      {
        name: 'Brisbane',
        date: '2023-02-02',
        venue: { name: 'Princess Theatre' },
        role: 'Brisbane_2023',
      },
      {
        name: 'Melbourne',
        date: '2023-02-03',
        venue: { name: '170 Russell' },
        role: 'Melbourne_2023',
      },
      { name: 'Adelaide', date: '2023-02-04', venue: { name: 'The Gov' }, role: 'Adelaide_2023' },
      { name: 'Perth', date: '2023-02-05', venue: { name: 'Magnet House' }, role: 'Perth_2023' },
    ],
  },
  {
    key: 'ontario2023',
    name: 'Ontario 2023',
    description: 'The Band embarks on Ontario Spring Tour 2023',
    poster: 'tour_ontario_2023.png',
    dates: [
      {
        name: 'London, ON',
        date: '2023-04-14',
        venue: { name: 'London Music Hall' },
        role: 'London_2023',
      },
      {
        name: 'Hamilton, ON',
        date: '2023-04-15',
        venue: { name: 'Bridgeworks' },
        role: 'Hamilton_2023',
      },
      {
        name: 'Kingston, ON',
        date: '2023-04-16',
        venue: { name: 'The Broom Factory' },
        role: 'Kingston_2023',
      },
      {
        name: 'Ottawa, ON',
        date: '2023-04-18',
        venue: { name: 'Overflow Brewing Co.' },
        role: 'Ottawa_2023',
      },
      {
        name: 'St. Catherines, ON',
        date: '2023-04-20',
        venue: { name: 'Moose & Goose' },
        role: 'St_Catherines_2023',
      },
      {
        name: 'Waterloo, ON',
        date: '2023-04-21',
        venue: { name: 'Maxwells' },
        role: 'Waterloo_2023',
      },
      {
        name: 'Guelph, ON (Night One)',
        date: '2023-04-22',
        venue: { name: 'Onyx' },
        role: 'Guelph_Night_One_2023',
      },
      {
        name: 'Guelph, ON (Night Two)',
        date: '2023-04-23',
        venue: { name: 'Onyx' },
        role: 'Guelph_Night_Two_2023',
      },
    ],
  },
  {
    key: 'halloween2023',
    name: 'Halloween is For Always',
    description: 'The Band takes a Halloween costume party on tour across North America',
    poster: 'tour_halloween_2023.jpeg',
    dates: [
      {
        name: 'Ferndale, MI',
        date: '2023-10-12',
        time: '20:00:00-04:00',
        venue: {
          name: 'The Loving Touch',
          address: {
            street: '22634 Woodward Ave',
            city: 'Ferndale',
            state_province: 'MI',
            postal: '48220',
            country: 'US',
          },
          maps_url: 'https://goo.gl/maps/hPyCEVQWHVpG8zKC9',
        },
        role: 'Ferndale_2023',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-the-loving-touch-tickets/13177998',
      },
      {
        name: 'Fort Wayne, IN',
        date: '2023-10-13',
        time: '20:00:00-04:00',
        venue: {
          name: "Piere's",
          address: {
            street: '5629 St Joe Rd',
            city: 'Fort Wayne',
            state_province: 'IN',
            postal: '46835',
            country: 'US',
          },
          maps_url: 'https://goo.gl/maps/conE2dfsVpgrof3Z6',
        },
        role: 'Fort_Wayne_2023',
        ticket_url:
          'https://www.etix.com/ticket/p/4861275/protest-the-hero-halloween-is-for-always-tour-fort-wayne-pieres-entertainment-center',
      },
      {
        name: 'Chicago, IL',
        date: '2023-10-14',
        time: '19:00:00-05:00',
        venue: {
          name: 'Bottom Lounge',
          address: {
            street: '1375 W. Lake St',
            city: 'Chicago',
            state_province: 'IL',
            postal: '60607',
            country: 'US',
          },
          maps_url: 'https://goo.gl/maps/xEWzTcxMNcR57Nz3A',
        },
        role: 'Chicago_2023',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-bottom-lounge-tickets/13109525',
      },
      {
        name: 'St Paul, MN',
        date: '2023-10-15',
        time: '19:00:00-05:00',
        venue: {
          name: 'Turf Club',
          address: {
            street: '1601 University Ave W',
            city: 'St Paul',
            state_province: 'MN',
            postal: '55104',
            country: 'US',
          },
          maps_url: 'https://goo.gl/maps/HxJikZ2YNeVtKKN88',
        },
        role: 'St_Paul_2023',
        ticket_url: 'https://www.axs.com/events/482136/protest-the-hero-tickets?skin=turfclub',
      },
      {
        name: 'Winnipeg, MB',
        date: '2023-10-17',
        time: '20:00:00-05:00',
        venue: {
          name: 'Park Theatre',
          address: {
            street: '698 Osborne St',
            city: 'Winnipeg',
            state_province: 'MB',
            postal: 'R3L 2B9',
            country: 'CA',
          },
          maps_url: 'https://goo.gl/maps/QNgbmik3DBUPf5CAA',
        },
        role: 'Winnipeg_2023',
        ticket_url:
          'https://www.ticketweb.ca/event/protest-the-hero-the-park-theatre-tickets/13162408',
      },
      {
        name: 'Edmonton, AB',
        date: '2023-10-19',
        time: '20:00:00-06:00',
        venue: {
          name: 'The Starlite Room',
          address: {
            street: '10030 102 St NW',
            city: 'Edmonton',
            state_province: 'AB',
            country: 'CA',
            postal: 'T5J 0V6',
          },
          maps_url: 'https://goo.gl/maps/TFzGw5t34WTovr3w5',
        },
        role: 'Edmonton_2023',
        ticket_url: 'https://www.bandsintown.com/t/104388229',
      },
      {
        name: 'Calgary, AB',
        date: '2023-10-20',
        time: '20:00:00-06:00',
        venue: {
          name: 'The Palace Theatre',
          address: {
            street: '219 8 Ave SW',
            city: 'Calgary',
            state_province: 'AB',
            country: 'CA',
            postal: 'T2P 1B7',
          },
          maps_url: 'https://goo.gl/maps/DrhY4cPqc6MMuXGV8',
        },
        role: 'Calgary_2023',
        ticket_url: 'https://www.tickets.f7entertainment.com/protestthehero-thepalacetheatre',
      },
      {
        name: 'Vancouver, BC',
        date: '2023-10-22',
        time: '19:00:00-07:00',
        venue: {
          name: 'Rickshaw Theatre',
          address: {
            street: '254 E Hastings St',
            city: 'Vancouver',
            state_province: 'BC',
            country: 'CA',
            postal: 'V6A 1P1',
          },
          maps_url: 'https://goo.gl/maps/xPTrupkDRQNhunKB7',
        },
        role: 'Vancouver_2023',
        ticket_url: 'https://www.tickets.f7entertainment.com/protestthehero-rickshawtheatre',
      },
      {
        name: 'Seattle, WA',
        date: '2023-10-23',
        time: '19:30:00-07:00',
        venue: {
          name: 'El Corazón',
          address: {
            street: '109 Eastlake Ave E',
            city: 'Seattle',
            state_province: 'WA',
            country: 'US',
            postal: '98109',
          },
          maps_url: 'https://goo.gl/maps/Vt4VQCXBsV9NEghU9',
        },
        role: 'Seattle_2023',
        ticket_url: 'https://wl.seetickets.us/event/Protest-theHero/548281?afflky=ElCorazon',
      },
      {
        name: 'Sacramento, CA',
        date: '2023-10-25',
        time: '19:30:00-07:00',
        venue: {
          name: 'Goldfield Trading Post',
          address: {
            street: '1630 J St',
            city: 'Sacramento',
            state_province: 'CA',
            country: 'US',
            postal: '95814',
          },
          maps_url: 'https://goo.gl/maps/xPQpNdCuW8qo9fda6',
        },
        role: 'Sacramento_2023',
        ticket_url:
          'https://wl.seetickets.us/event/Protest-theHero/546218?afflky=GoldfieldTradingPost',
      },
      {
        name: 'Los Angeles, CA',
        date: '2023-10-26',
        time: '19:00:00-07:00',
        venue: {
          name: '1720™',
          address: {
            street: '1720 E 16th St',
            city: 'Los Angeles',
            state_province: 'CA',
            country: 'US',
            postal: '90021',
          },
          maps_url: 'https://goo.gl/maps/xPQpNdCuW8qo9fda6',
        },
        role: 'Los_Angeles_2023',
        ticket_url:
          'https://dice.fm/event/a3qm2-protest-the-hero-26th-oct-1720-los-angeles-tickets',
      },
      {
        name: 'San Diego, CA',
        date: '2023-10-27',
        time: '20:00:00-07:00',
        venue: {
          name: 'Music Box',
          address: {
            street: '1337 India Street',
            city: 'San Diego',
            state_province: 'CA',
            country: 'US',
            postal: '92101',
          },
          maps_url: 'https://goo.gl/maps/rpQUmC9RDvPBcWQaA',
        },
        role: 'San_Diego_2023',
        ticket_url: 'https://www.ticketweb.com/event/protest-the-hero-music-box-tickets/13182698',
      },
      {
        name: 'Phoenix, AZ',
        date: '2023-10-29',
        time: '20:00:00-07:00',
        venue: {
          name: 'Crescent Ballroom',
          address: {
            street: '308 North 2nd Ave',
            city: 'Phoenix',
            state_province: 'AZ',
            country: 'US',
            postal: '85003',
          },
          maps_url: 'https://goo.gl/maps/QgjEeZcCPy9ge75E8',
        },
        role: 'Phoenix_2023',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-halloween-crescent-ballroom-tickets/13151588',
      },
      {
        name: 'Denver, CO',
        date: '2023-10-31',
        time: '20:00:00-06:00',
        venue: {
          name: 'Bluebird Theater',
          address: {
            street: '3317 E Colfax Av',
            city: 'Denver',
            state_province: 'CO',
            country: 'US',
            postal: '80206',
          },
          maps_url: 'https://goo.gl/maps/C13P5u1Fmnzgdjm29',
        },
        role: 'Denver_2023',
        ticket_url: 'https://www.axs.com/events/465197/protest-the-hero-tickets',
      },
      {
        name: 'Dallas, TX',
        date: '2023-11-02',
        time: '18:00:00-05:00',
        venue: {
          name: 'South Side Music Hall',
          address: {
            street: '1135 S Lamar St',
            city: 'Dallas',
            state_province: 'TX',
            country: 'US',
            postal: '75215',
          },
          maps_url: 'https://goo.gl/maps/Ky6qgmsXngCmr3Wh9',
        },
        role: 'Dallas_2023',
        ticket_url:
          'https://wl.seetickets.us/event/Protest-theHero/548336?afflky=ThirdStringEntertainment',
      },
      {
        name: 'Austin, TX',
        date: '2023-11-03',
        time: '00:00:00-05:00',
        venue: {
          name: 'Come and Take It Live',
          address: {
            street: '2015 E Riverside Dr Bldg 4',
            city: 'Austin',
            state_province: 'TX',
            country: 'US',
            postal: '78741',
          },
          maps_url: 'https://goo.gl/maps/9378yzjDfYUaD7cM6',
        },
        role: 'Austin_2023',
        ticket_url:
          'https://wl.seetickets.us/event/Protest-theHero/548337?afflky=ThirdStringEntertainment',
      },
      {
        name: 'San Antonio, TX',
        date: '2023-11-04',
        time: '18:00:00-05:00',
        venue: {
          name: 'Paper Tiger',
          address: {
            street: "2410 N St Mary's St",
            city: 'San Antonio',
            state_province: 'TX',
            country: 'US',
            postal: '78212',
          },
          maps_url: 'https://goo.gl/maps/2mN7kM7bRj4C9R5v6',
        },
        role: 'San_Antonio_2023',
        ticket_url: 'https://wl.seetickets.us/event/Protest-theHero/548467?afflky=PaperTiger',
      },
      {
        name: 'Houston, TX',
        date: '2023-11-05',
        time: '18:00:00-06:00',
        venue: {
          name: 'RISE Rooftop',
          address: {
            street: '2600 Travis St',
            city: 'Houston',
            state_province: 'TX',
            country: 'US',
            postal: '77006',
          },
          maps_url: 'https://goo.gl/maps/iCcpZKTekRshKiRWA',
        },
        role: 'Houston_2023',
        ticket_url: 'https://wl.seetickets.us/event/Protest-theHero/548473?afflky=RiseRooftop',
      },
      {
        name: 'Orlando, FL',
        date: '2023-11-07',
        time: '19:00:00-05:00',
        venue: {
          name: 'The Abbey',
          address: {
            street: '100 S Eola Dr #100',
            city: 'Orlando',
            state_province: 'FL',
            country: 'US',
            postal: '32801',
          },
          maps_url: 'https://goo.gl/maps/9xaEZsi8qLyLS1d49',
        },
        role: 'Orlando_2023',
        ticket_url:
          'https://www.etix.com/ticket/p/2390277/protest-the-hero-wmoon-tooth-orlando-the-abbey-fyf',
      },
      {
        name: 'Tampa, FL',
        date: '2023-11-08',
        time: '19:00:00-05:00',
        venue: {
          name: 'The Orpheum',
          address: {
            street: '14802 N Nebraska Ave',
            city: 'Tampa',
            state_province: 'FL',
            country: 'US',
            postal: '33613',
          },
          maps_url: 'https://goo.gl/maps/dQBg3CcysWNJWPxo8',
        },
        role: 'Tampa_2023',
        ticket_url: 'https://www.eventbrite.com/e/protest-the-hero-tickets-627262267327',
      },
      {
        name: 'Atlanta, GA',
        date: '2023-11-09',
        time: '19:00:00-05:00',
        venue: {
          name: 'The Masquerade',
          address: {
            street: '75 MLK Jr Dr SW',
            city: 'Atlanta',
            state_province: 'GA',
            country: 'US',
            postal: '30303',
          },
          maps_url: 'https://goo.gl/maps/mD3EaVUfteux1tcE7',
        },
        role: 'Atlanta_2023',
        ticket_url: 'https://www.ticketmaster.com/event/0E005E9395802758',
      },
      {
        name: 'Baltimore, MD',
        date: '2023-11-11',
        time: '20:00:00-05:00',
        venue: {
          name: 'Ottobar',
          address: {
            street: '2549 N Howard St',
            city: 'Baltimore',
            state_province: 'MD',
            country: 'US',
            postal: '21218',
          },
          maps_url: 'https://goo.gl/maps/whNQVVFbLsSGWuH17',
        },
        role: 'Baltimore_2023',
        ticket_url:
          'https://www.etix.com/ticket/p/4306385/protest-the-hero-with-guest-moon-tooth-baltimore-ottobar',
      },
      {
        name: 'New York, NY',
        date: '2023-11-14',
        time: '19:00:00-05:00',
        venue: {
          name: 'Gramercy Theatre',
          address: {
            street: '127 E 23rd St',
            city: 'New York',
            state_province: 'NY',
            country: 'US',
            postal: '11226',
          },
          maps_url: 'https://goo.gl/maps/Yo1MWD5jCdSoQEbg9',
        },
        role: 'New_York_2023',
        ticket_url: 'https://concerts.livenation.com/event/00005E94DA7448C1',
      },
      {
        name: 'Cambridge, MA',
        date: '2023-11-15',
        time: '19:00:00-05:00',
        venue: {
          name: 'Middle East Downstairs',
          address: {
            street: '472 Massachusetts Ave',
            city: 'Cambridge',
            state_province: 'MA',
            country: 'US',
            postal: '02139',
          },
          maps_url: 'https://goo.gl/maps/YGTZtyHJKR4aAMdJ7',
        },
        role: 'Cambridge_2023',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-moon-tooth-middle-east-downstairs-tickets/13178378',
      },
      {
        name: 'Toronto, ON',
        date: '2023-11-17',
        time: '18:00:00-05:00',
        venue: {
          name: 'HISTORY',
          address: {
            street: '1663 Queen St E',
            city: 'Toronto',
            state_province: 'ON',
            country: 'CA',
            postal: 'M4L 1G5',
          },
          maps_url: 'https://goo.gl/maps/SosfMREeudfRsCjg9',
        },
        role: 'Toronto_2023',
        ticket_url: 'https://www.ticketmaster.ca/event/10005E99B6DD24CF',
      },
    ],
  },
  {
    key: 'spring2024',
    name: 'Ontario Tour Spring 2024',
    description: 'The Bands goes on a quick tour of Ontario in Spring 2024',
    poster: 'tour_spring_2024.jpeg',
    dates: [
      {
        name: 'Tillsonburg, ON',
        date: '2024-05-23',
        venue: { name: 'The Mill' },
        role: 'Tillsonburg_2024',
      },
      {
        name: 'Waterloo, ON',
        date: '2024-05-24',
        venue: { name: "Maxwell's" },
        role: 'Waterloo_2024',
      },
      {
        name: 'St. Catharines, ON',
        date: '2024-05-25',
        venue: { name: "No Man's Land" },
        role: 'St_Catharines_2024',
      },
      {
        name: 'Oshawa, ON',
        date: '2024-05-30',
        venue: { name: 'Bondst Event Centre' },
        role: 'Oshawa_2024',
      },
      {
        name: 'Ottawa, ON',
        date: '2024-05-31',
        venue: { name: 'Bronson Centre' },
        role: 'Ottawa_2024',
      },
      {
        name: 'Kingston, ON',
        date: '2024-06-01',
        venue: { name: 'The Ale House' },
        role: 'Kingston_2024',
      },
    ],
  },
  {
    key: 'volition2024',
    name: 'Volition X',
    description: 'The Band tours North America to celebrate the 10th anniversary of Volition',
    poster: 'tour_volitionx_2024.jpeg',
    dates: [
      {
        name: 'Detroit, MI',
        date: '2024-08-01',
        time: '18:30:00-05:00',
        venue: {
          name: "Saint Andrew's Hall",
          address: {
            street: '431 E Congress St',
            city: 'Detroit',
            state_province: 'MI',
            country: 'US',
            postal: '48226',
          },
          maps_url: 'https://maps.app.goo.gl/cH93dwMkbpkA1wrj7',
        },
        role: 'Detroit_2024',
        ticket_url:
          'https://concerts.livenation.com/protest-the-hero-detroit-michigan-08-01-2024/event/080060A8DF9548E0',
      },
      {
        name: 'Milwaukee, WI',
        date: '2024-08-02',
        time: '19:00:00-05:00',
        venue: {
          name: 'X-Ray Arcade',
          address: {
            street: '5036 S Packard Ave',
            city: 'Cudahy',
            state_province: 'WI',
            country: 'US',
            postal: '53110',
          },
          maps_url: 'https://maps.app.goo.gl/UYqQdMUAsargToB36',
        },
        role: 'Milwaukee_2024',
        ticket_url:
          'https://wl.seetickets.us/event/protest-the-hero/606676?afflky=KickstandProductions',
      },
      {
        name: 'Minneapolis, MN',
        date: '2024-08-03',
        time: '20:00:00-05:00',
        venue: {
          name: 'Fine Line',
          address: {
            street: '318 1st Ave N',
            city: 'Minneapolis',
            state_province: 'MN',
            country: 'US',
            postal: '55401',
          },
          maps_url: 'https://maps.app.goo.gl/ahFnhVkZJsnaxZEZ9',
        },
        role: 'Minneapolis_2024',
        ticket_url: 'https://www.axs.com/events/573442/protest-the-hero-tickets?skin=fineline',
      },
      {
        name: 'Seattle, WA',
        date: '2024-08-06',
        time: '20:00:00-07:00',
        venue: {
          name: 'The Crocodile',
          address: {
            street: '2505 1st Ave',
            city: 'Seattle',
            state_province: 'WA',
            country: 'US',
            postal: '98121',
          },
          maps_url: 'https://maps.app.goo.gl/6zRA4ESjB6YPefxBA',
        },
        role: 'Seattle_2024',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-10-year-the-crocodile-tickets/13514824?pl=crocodile',
      },
      {
        name: 'Sacramento, CA',
        date: '2024-08-08',
        time: '19:00:00-07:00',
        venue: {
          name: 'Goldfield - Roseville',
          address: {
            street: '238 Vernon St',
            city: 'Roseville',
            state_province: 'CA',
            country: 'US',
            postal: '95678',
          },
          maps_url: 'https://maps.app.goo.gl/NGHMzqirecZyQ8At9',
        },
        role: 'Sacramento_2024',
        ticket_url:
          'https://wl.seetickets.us/event/protest-the-hero/603198?afflky=GoldfieldTradingPost',
      },
      {
        name: 'San Francisco, CA',
        date: '2024-08-09',
        time: '20:00:00-07:00',
        venue: {
          name: 'Neck of the Woods',
          address: {
            street: '406 Clement St',
            city: 'San Francisco',
            state_province: 'CA',
            country: 'US',
            postal: '94118',
          },
          maps_url: 'https://maps.app.goo.gl/fCeXvvfLhBJyshYf8',
        },
        role: 'San_Francisco_2024',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-68-greyhaven-neck-of-the-woods-tickets/13568064',
      },
      {
        name: 'San Diego, CA',
        date: '2024-08-10',
        time: '20:00:00-07:00',
        venue: {
          name: 'SOMA Sidestage',
          address: {
            street: '3350 Sports Arena Blvd',
            city: 'San Diego',
            state_province: 'CA',
            country: 'US',
            postal: '92110',
          },
          maps_url: 'https://maps.app.goo.gl/dSfqyd2YQhsdee1v9',
        },
        role: 'San_Diego_2024',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-soma-sidestage-tickets/13496724?pl=soma',
      },
      {
        name: 'Los Angeles, CA',
        date: '2024-08-11',
        time: '18:00:00-07:00',
        venue: {
          name: '1720',
          address: {
            street: '1720 E 16th St',
            city: 'Los Angeles',
            state_province: 'CA',
            country: 'US',
            postal: '90021',
          },
          maps_url: 'https://maps.app.goo.gl/PJmJuYoPZ5HDWYs6A',
        },
        role: 'Los_Angeles_2024',
        ticket_url:
          'https://dice.fm/event/mxb79l-protest-the-hero-11th-aug-1720-los-angeles-tickets',
      },
      {
        name: 'Denver, CO',
        date: '2024-08-14',
        time: '20:00:00-06:00',
        venue: {
          name: 'Gothic Theatre',
          address: {
            street: '3263 S Broadway',
            city: 'Englewood',
            state_province: 'CO',
            country: 'US',
            postal: '80113',
          },
          maps_url: 'https://maps.app.goo.gl/V8ic5tBBJEsXzikNA',
        },
        role: 'Denver_2024',
        ticket_url: 'https://www.axs.com/events/569752/protest-the-hero-tickets',
      },
      {
        name: 'Chicago, IL',
        date: '2024-08-16',
        time: '19:00:00-05:00',
        venue: {
          name: 'Concord Music Hall',
          address: {
            street: '2047 N Milwaukee Ave',
            city: 'Chicago',
            state_province: 'IL',
            country: 'US',
            postal: '60647',
          },
          maps_url: 'https://maps.app.goo.gl/J5DkpngtPF7MpRLa6',
        },
        role: 'Chicago_2024',
        ticket_url: 'https://www.axs.com/events/582387/protest-the-hero-tickets',
      },
      {
        name: 'Columbus, OH',
        date: '2024-08-17',
        time: '20:00:00-05:00',
        venue: {
          name: 'A&R Music Bar',
          address: {
            street: '391 Neil Ave',
            city: 'Columbus',
            state_province: 'OH',
            country: 'US',
            postal: '43215',
          },
          maps_url: 'https://maps.app.goo.gl/ANNGezaNhrpqaGaM9',
        },
        role: 'Columbus_2024',
        ticket_url: 'https://www.axs.com/events/580570/protest-the-hero-tickets',
      },
      {
        name: 'Cleveland, OH',
        date: '2024-08-18',
        time: '20:00:00-05:00',
        venue: {
          name: 'Grog Shop',
          address: {
            street: '2785 Euclid Heights Blvd',
            city: 'Cleveland',
            state_province: 'OH',
            country: 'US',
            postal: '44106',
          },
          maps_url: 'https://maps.app.goo.gl/rPgJNixSiuGDmLcaA',
        },
        role: 'Cleveland_2024',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-10th-anniversary-grog-shop-tickets/13555064?pl=grogshop',
      },
      {
        name: "St. John's, NL",
        date: '2024-08-20',
        time: '20:00:00-02:30',
        venue: {
          name: 'The Rock House',
          address: {
            street: '7 George St',
            city: "St. John's",
            state_province: 'NL',
            country: 'CA',
            postal: 'A1C 1M7',
          },
          maps_url: 'https://maps.app.goo.gl/1GuxWU8RmSx4hXGH6',
        },
        role: 'St_Johns_2024',
        ticket_url: 'https://www.tixr.com/groups/tickettide/events/protest-the-hero-107705',
      },
      {
        name: 'Buffalo, NY',
        date: '2024-10-11',
        time: '18:30:00-04:00',
        venue: {
          name: 'Rec Room',
          address: {
            street: '79 W Chippewa St',
            city: 'Buffalo',
            state_province: 'NY',
            country: 'US',
            postal: '14202',
          },
          maps_url: 'https://maps.app.goo.gl/o5ukz656auWNroHS6',
        },
        role: 'Buffalo_2024',
        ticket_url: 'https://www.ticketweb.com/event/protest-the-hero-rec-room-tickets/13568684',
      },
      {
        name: 'Louisville, KY',
        date: '2024-10-12',
        time: '20:00:00-04:00',
        venue: {
          name: 'Mercury Ballroom',
          address: {
            street: '611 S 4th St',
            city: 'Louisville',
            state_province: 'KY',
            country: 'US',
            postal: '40202',
          },
          maps_url: 'https://maps.app.goo.gl/dFkXRD2Jf64UvTmZ7',
        },
        role: 'Louisville_2024',
        ticket_url:
          'https://concerts.livenation.com/protest-the-hero-volition-x-tour-louisville-kentucky-10-12-2024/event/160060C3DA0133F0',
      },
      {
        name: 'Nashville, TN',
        date: '2024-10-13',
        time: '20:00:00-05:00',
        venue: {
          name: 'The Basement East',
          address: {
            street: '917 Woodland St',
            city: 'Nashville',
            state_province: 'TN',
            country: 'US',
            postal: '37206',
          },
          maps_url: 'https://maps.app.goo.gl/EMyTUVhMMrjXv5B6A',
        },
        role: 'Nashville_2024',
        ticket_url:
          'https://www.ticketweb.com/event/protest-the-hero-w-68-the-basement-east-tickets/13550564?pl=basementeast',
      },
      {
        name: 'Atlanta, GA',
        date: '2024-10-15',
        time: '19:00:00-04:00',
        venue: {
          name: 'The Masquerade',
          address: {
            street: '75 Martin Luther King Jr Dr SW',
            city: 'Atlanta',
            state_province: 'GA',
            country: 'US',
            postal: '30303',
          },
          maps_url: 'https://goo.gl/maps/mD3EaVUfteux1tcE7',
        },
        role: 'Atlanta_2024',
        ticket_url: 'https://www.ticketmaster.com/event/0E0060B4D4136AD8',
      },
      {
        name: 'Charlotte, NC',
        date: '2024-10-16',
        time: '20:00:00-04:00',
        venue: {
          name: "Amos' Southend",
          address: {
            street: '1423 S Tryon St',
            city: 'Charlotte',
            state_province: 'NC',
            country: 'US',
            postal: '28203',
          },
          maps_url: 'https://maps.app.goo.gl/DEJviWHKWE5M77gMA',
        },
        role: 'Charlotte_2024',
        ticket_url:
          'https://www.etix.com/ticket/p/51017318/protest-the-hero-charlotte-amossouthend',
      },
      {
        name: 'Balitmore, MD',
        date: '2024-10-18',
        time: '20:00:00-04:00',
        venue: {
          name: 'Baltimore Soundstage',
          address: {
            street: '124 Market Pl',
            city: 'Baltimore',
            state_province: 'MD',
            country: 'US',
            postal: '21202',
          },
          maps_url: 'https://maps.app.goo.gl/n6BFdhgekvHdXLxy6',
        },
        role: 'Baltimore_2024',
        ticket_url: 'https://www.ticketmaster.com/event/150060AED3BE496C',
      },
      {
        name: 'Philadelphia, PA',
        date: '2024-10-19',
        time: '20:00:00-04:00',
        venue: {
          name: 'Underground Arts',
          address: {
            street: '1200 Callowhill St',
            city: 'Philadelphia',
            state_province: 'PA',
            country: 'US',
            postal: '19123',
          },
          maps_url: 'https://maps.app.goo.gl/XiyzCyYoZWW2KteA6',
        },
        role: 'Philadelphia_2024',
        ticket_url:
          'https://dice.fm/event/oe2glg-protest-the-hero-19th-oct-underground-arts-philadelphia-tickets',
      },
      {
        name: 'Brooklyn, NY',
        date: '2024-10-20',
        time: '18:00:00-04:00',
        venue: {
          name: 'Warsaw',
          address: {
            street: '261 Driggs Ave',
            city: 'Brooklyn',
            state_province: 'NY',
            country: 'US',
            postal: '11222',
          },
          maps_url: 'https://maps.app.goo.gl/ZqsrxfsgVG1Pd1RA8',
        },
        role: 'Brooklyn_2024',
        ticket_url:
          'https://concerts.livenation.com/protest-the-hero-10th-anniversary-of-brooklyn-new-york-10-20-2024/event/000060BED4288AAF',
      },
      {
        name: 'Cambridge, MA',
        date: '2024-10-22',
        time: '20:30:00-04:00',
        venue: {
          name: 'The Sinclair',
          address: {
            street: '52 Church St',
            city: 'Cambridge',
            state_province: 'MA',
            country: 'US',
            postal: '02138',
          },
          maps_url: 'https://maps.app.goo.gl/A1rKRVenjjHgRert9',
        },
        role: 'Cambridge_2024',
        ticket_url: 'https://www.axs.com/events/564307/protest-the-hero-tickets?skin=sinclair',
      },
      {
        name: 'Montreal, QC',
        date: '2024-10-23',
        time: '19:00:00-04:00',
        venue: {
          name: 'Théâtre Beanfield ',
          address: {
            street: '2490 Notre-Dame St W',
            city: 'Montreal',
            state_province: 'QC',
            country: 'CA',
            postal: 'H3J 1N5',
          },
          maps_url: 'https://maps.app.goo.gl/edgH5v2Ee8Afsb9c6',
        },
        role: 'Montreal_2024',
        ticket_url: 'https://www.ticketmaster.ca/event/310060C3BD162F26?lang=en-ca&brand=evenko',
      },
      {
        name: 'Toronto, ON',
        date: '2024-10-24',
        time: '18:30:00-04:00',
        venue: {
          name: 'HISTORY',
          address: {
            street: '1663 Queen St E',
            city: 'Toronto',
            state_province: 'ON',
            country: 'CA',
            postal: 'M4L 1G5',
          },
          maps_url: 'https://goo.gl/maps/SosfMREeudfRsCjg9',
        },
        role: 'Toronto_2024',
        ticket_url: 'https://www.ticketmaster.ca/event/100060BEEC3A46A8',
      },
      {
        name: 'London 2024',
        date: '2024-10-25',
        time: '19:00:00-04:00',
        venue: {
          name: 'London Music Hall',
          address: {
            street: '185 Queens Ave',
            city: 'London',
            state_province: 'ON',
            country: 'CA',
            postal: 'N6A 1G7',
          },
          maps_url: 'https://maps.app.goo.gl/iCwPsrLrj5MxPs7c9',
        },
        role: 'London_2024',
        ticket_url: 'https://www.ticketmaster.ca/event/100060B7D49936D0',
      },
    ],
  },
]
