import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        firstname: 'Oliver',
        lastname: 'Baker',
        phone: '3342-1560',
        email: 'all.bake@gmail.com',
        address: {
          state: {
            shortname: 'NJ',
            name: 'New Jersey',
          },
          city: 'Trenton',
          street: 'N Clinton Ave',
          zipcode: '08610',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
      {
        id: 2,
        firstname: 'George',
        lastname: 'Ball',
        phone: '3348-1571',
        email: 'GeGball@gmail.com',
        address: {
          state : {
            shortname: 'TX',
            name: 'Texas',
          },
          city: 'Addison',
          street: 'Morris Ave',
          zipcode: '75001',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
      {
        id: 3,
        firstname: 'Harry',
        lastname: 'Allen',
        phone: '3383-9124',
        email: 'Hallenry@gmail.com',
        address: {
          state : {
            shortname: 'HI',
            name: 'Hawaii',
          },
          city: 'Trenton',
          street: 'Olali St',
          zipcode: '96705',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
      {
        id: 4,
        firstname: 'Harry',
        lastname: 'Allen',
        phone: '3383-9124',
        email: 'Hallenry@gmail.com',
        address: {
          state : {
            shortname: 'HI',
            name: 'Hawaii',
          },
          city: 'Trenton',
          street: 'Olali St',
          zipcode: '96705',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
      {
        id: 5,
        firstname: 'Harry',
        lastname: 'Allen',
        phone: '3383-9124',
        email: 'Hallenry@gmail.com',
        address: {
          state : {
            shortname: 'HI',
            name: 'Hawaii',
          },
          city: 'Trenton',
          street: 'Olali St',
          zipcode: '96705',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
      {
        id: 6,
        firstname: 'Harry',
        lastname: 'Allen',
        phone: '3383-9124',
        email: 'Hallenry@gmail.com',
        address: {
          state : {
            shortname: 'HI',
            name: 'Hawaii',
          },
          city: 'Trenton',
          street: 'Olali St',
          zipcode: '96705',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
      {
        id: 7,
        firstname: 'Harry',
        lastname: 'Allen',
        phone: '3383-9124',
        email: 'Hallenry@gmail.com',
        address: {
          state : {
            shortname: 'HI',
            name: 'Hawaii',
          },
          city: 'Trenton',
          street: 'Olali St',
          zipcode: '96705',
        },
        avatar: 'https://www.thispersondoesnotexist.com/image'
      },
    ];
    return { users };
  }
}

// id
//   firstname
//   lastname
//   phone
//   email
//     address: {
//       state : {
//         shortname
//         name
//       }
//       city
//       street
//       zipcode
//     }
//       avatar