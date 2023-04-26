# airway-backend

- **User**
    - [Registration]()
    - [Login]()
    - [CheckAuth]()

- **Site functional**
    - [Get country code](https://github.com/top-aleksei/airway-backend#get-country-code)
    - [Get airport](https://github.com/top-aleksei/airway-backend#get-airport)
    - [Get races](https://github.com/top-aleksei/airway-backend#get-races)




**Get country code**
----
Returns all country code.

<details>

* **URL**

    /country-codes

* **Method:**

    `GET`

* **Headers:**

'Content-Type': 'application/json'

*  **URL Params**

    None

* **Query Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        [   
          {
          "country": "Australia",
          "code": "+61"
          },
          {
          "country": "Austria",
          "code": "+43"
          },
          {
          "country": "Azerbaijan",
          "code": "+994"
          },
                
        ]
    ```
 
* **Error Response:**

    {message: `Get all country codes error`}
  
* **Notes:**

    None

</details>


**Get airport**
----
Returns all airport.

<details>

* **URL**

    /airports

* **Method:**

    `GET`

* **Headers:**

'Content-Type': 'application/json'

*  **URL Params**

    None

* **Query Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        [
          {
            "code": "AMS",
            "name": "Amsterdam Airport Schiphol",
            "city": "Amsterdam",
            "country": "Netherlands"
            },
            {
            "code": "CDG",
            "name": "Paris-Charles de Gaulle Airport",
            "city": "Paris",
            "country": "France"
          },
        ]
    ```
 
* **Error Response:**

    {message: `Get all airports error`}
  
* **Notes:**

    None

</details>


**Get races**
----
Generate races.

<details>

* **URL**

    /races

* **Method:**

    `GET`

* **Headers:**

'Content-Type': 'application/json'

*  **URL Params**

    None

* **Query Params**

    "departureAirportCode":"string"
     "arrivalAirportCode":"string" 
     "departureDate":"string"
     "returnDate":"string";
     "roundTrip":"number";
     "countAdult":"number";
     "countChildren":"number";
     "countInfant":"number";
     "amountRace":"number";

     example /races?departureAirportCode=WAW&arrivalAirportCode=DUB&departureDate=2023-04-27T00:00:00.000Z&returnDate=2023-04-28T00:00:00.000Z&roundTrip=1&countAdult=2&countChildren=3&countInfant=2&amountRace=1

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {
          "departureAirportCode": "WAW",
          "departureAirportName": "Warsaw Chopin Airport",
          "departureAirportCity": "Warsaw",
          "departureAirportCountry": "Poland",
          "timeZoneDepartureAirport": 2,
          "arrivalAirportCode": "DUB",
          "arrivalAirportName": "Dublin Airport",
          "arrivalAirportCity": "Dublin",
          "arrivalAirportCountry": "Ireland",
          "timeZoneArrivalAirport": 1,
          "flightTime": 140,
          "races": [
              {
                  "departureDateTime": "2023-04-27T15:20:00.000Z",
                  "arrivalDateTime": "2023-04-27T16:40:00.000Z",
                  "seatNumbers": [
                      "22d",
                      "23d",
                      "24d",
                      "25d",
                      "26d"
                  ],
                  "freeSeats": 8,
                  "costTicket": "151.54",
                  "numberRace": "DL3534"
              }
          ],
          "returnRaces": {
              "flights": [
                  [
                      {
                          "departureDateTime": "2023-04-28T15:20:00.000Z",
                          "arrivalDateTime": "2023-04-28T18:40:00.000Z",
                          "seatNumbers": [
                              "37d",
                              "38d",
                              "39d",
                              "40d",
                              "41d"
                          ],
                          "freeSeats": 25,
                          "costTicket": "160.77",
                          "numberRace": "UA8586"
                      }
                  ]
              ]
          }
        }
    ```
 
* **Error Response:**

    {message: `Get races error`}
  
* **Notes:**

    None

</details>