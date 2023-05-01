# airway-backend

- **User**
    - [Registration](https://github.com/top-aleksei/airway-backend#registration)
    - [Login](https://github.com/top-aleksei/airway-backend#login)
    - [CheckAuth](https://github.com/top-aleksei/airway-backend#check-auth)

- **Site functional**
    - [Get country code](https://github.com/top-aleksei/airway-backend#get-country-code)
    - [Get airport](https://github.com/top-aleksei/airway-backend#get-airport)
    - [Get races](https://github.com/top-aleksei/airway-backend#get-races)




**Registration**
----
Registration user

<details>

* **URL**

    /auth/registration

* **Method:**

    `POST`

* **Headers:**

'Content-Type': 'application/json'

*  **URL Params**

    None

* **Query Params**

    None

* **Data Params**
  ```json
      {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "dateBirth": "1990-01-01",
      "sex": "male",
      "countryCode": "US",
      "phoneNumber": "1234567890",
      "citizenship": "American"
      }
  ```
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {"message":"Registration complete"}
    ```
 
* **Error Response:**

    {message: `Registration error`}
      
    or

**Code:** 409 conflict <br />

    {message: `This email is already exists`}
  
* **Notes:**

    None

</details>



**Login**
----
Login user

<details>

* **URL**

    /auth/login

* **Method:**

    `POST`

* **Headers:**

'Content-Type': 'application/json'

*  **URL Params**

    None

* **Query Params**

    None

* **Data Params**
  ```json
      {
      "email": "johndoe@example.com",
      "password": "password123",
      }
  ```
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk5MzEzYjhlY2MyODQ5MTExMGU0OSIsImlhdCI6MTY4MjY2MTg5OSwiZXhwIjoxNjgyNzQ4Mjk5fQ.Pz6nSo4yO3mqxV1yWVa8-odqnTQASouZ4PA7Hivj8sI",
          "userId": "64499313b8ecc28491110e49",
          "userProfile": {
              "firstName": "John",
              "lastName": "Doe",
              "email": "johndoe@example.com",
              "dateBirth": "Mon Jan 01 1990 01:00:00 GMT+0100 (Central European Standard Time)",
              "sex": "male",
              "countryCode": "US",
              "phoneNumber": 1234567890,
              "citizenship": "American"
          }
        }
    ```
 
* **Error Response:**

    {message: `User johndoa@example.com not found`}
      
    or
  
    {message: `Password not valid`}
      
    or
  
    {message: `Login error`}
  
* **Notes:**

    None

</details>


**CheckAuth**
----
Check Auth user

<details>

* **URL**

    /auth/check-auth

* **Method:**

    `GET`

* **Headers:**

'Content-Type': 'application/json'
  
'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk5MzEzYjhlY2MyODQ5MTExMGU0OSIsImlhdCI6MTY4MjY2MTY1NCwiZXhwIjoxNjgyNzQ4MDU0fQ.-CdxY4BSsBx32BIcb7RiIjOXZGueamNbKj2rnBY10pc'

*  **URL Params**

    None

* **Query Params**

        "id":"jsdhfbcseh7yy32dLKJ"


* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "dateBirth": "Mon Jan 01 1990 01:00:00 GMT+0100 (Central European Standard Time)",
      "sex": "male",
      "countryCode": "US",
      "phoneNumber": 1234567890,
      "citizenship": "American"
    }
    ```
 
* **Error Response:**

    {message: `You are not authorized to perform this operation`}
      
    or
  
    {message: `User not found`}
     
    or
  
    {message: `Check auth error`}


  
* **Notes:**

    None

</details>



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
       
     "roundTrip":"number"; (0 or 1)
       
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
            "departureAirportCode": "BCN",
            "departureAirportName": "Barcelona-El Prat Airport",
            "departureAirportCity": "Barcelona",
            "departureAirportCountry": "Spain",
            "timeZoneDepartureAirport": 2,
            "arrivalAirportCode": "DUB",
            "arrivalAirportName": "Dublin Airport",
            "arrivalAirportCity": "Dublin",
            "arrivalAirportCountry": "Ireland",
            "timeZoneArrivalAirport": 1,
            "connectingAirport": null,
            "races": [
                {
                    "departureDateTime": "2023-05-05T04:10:00.000Z",
                    "arrivalDateTime": "2023-05-05T05:00:00.000Z",
                    "seatNumbers": [
                        "28b",
                        "29b",
                        "30b",
                        "31b",
                        "32b"
                    ],
                    "freeSeats": 14,
                    "flightTime": 110,
                    "ticketsCost": {
                        "adult": {
                            "totalCost": "131.51",
                            "fare": "85.48",
                            "tax": "46.03"
                        },
                        "children": {
                            "totalCost": "102.58",
                            "fare": "56.42",
                            "tax": "46.16"
                        },
                        "infant": {
                            "totalCost": "42.08",
                            "fare": "37.03",
                            "tax": "5.05"
                        }
                    },
                    "numberRace": "AF1854"
                }
            ],
            "returnRaces": {
                "flights": [
                    [
                        {
                            "departureDateTime": "2023-05-28T16:20:00.000Z",
                            "arrivalDateTime": "2023-05-28T19:10:00.000Z",
                            "seatNumbers": [
                                "25e",
                                "26e",
                                "27e",
                                "28e",
                                "29e"
                            ],
                            "freeSeats": 8,
                            "flightTime": 110,
                            "ticketsCost": {
                                "adult": {
                                    "totalCost": "124.09",
                                    "fare": "80.66",
                                    "tax": "43.43"
                                },
                                "children": {
                                    "totalCost": "96.79",
                                    "fare": "53.23",
                                    "tax": "43.56"
                                },
                                "infant": {
                                    "totalCost": "39.71",
                                    "fare": "34.94",
                                    "tax": "4.77"
                                }
                            },
                            "numberRace": "SQ8750"
                        }
                    ]
                ]
            }
        }
    ```
 

   or

     
     ```json
        {
            "departureAirportCode": "BCN",
            "departureAirportName": "Barcelona-El Prat Airport",
            "departureAirportCity": "Barcelona",
            "departureAirportCountry": "Spain",
            "timeZoneDepartureAirport": 2,
            "arrivalAirportCode": "DEL",
            "arrivalAirportName": "Indira Gandhi International Airport",
            "arrivalAirportCity": "Delhi",
            "arrivalAirportCountry": "India",
            "timeZoneArrivalAirport": 5,
            "connectingAirport": {
                "code": "OSL",
                "name": "Oslo Airport, Gardermoen",
                "city": "Oslo",
                "country": "Norway",
                "timezone": 2
            },
            "races": [
                {
                    "ticketsCost": {
                        "adult": {
                            "totalCost": "671.74",
                            "fare": "436.63",
                            "tax": "235.11"
                        },
                        "children": {
                            "totalCost": "523.96",
                            "fare": "288.18",
                            "tax": "235.78"
                        },
                        "infant": {
                            "totalCost": "214.96",
                            "fare": "189.16",
                            "tax": "25.79"
                        }
                    },
                    "transitRaces": [
                        {
                            "departureDateTime": "2023-05-05T12:40:00.000Z",
                            "arrivalDateTime": "2023-05-05T15:20:00.000Z",
                            "seatNumbers": [
                                "30d",
                                "31d",
                                "32d",
                                "33d",
                                "34d"
                            ],
                            "freeSeats": 13,
                            "numberRace": "AF6926",
                            "flightTime": 160
                        },
                        {
                            "departureDateTime": "2023-05-05T17:50:00.000Z",
                            "arrivalDateTime": "2023-05-06T04:20:00.000Z",
                            "seatNumbers": [
                                "11b",
                                "12b",
                                "13b",
                                "14b",
                                "15b"
                            ],
                            "freeSeats": 12,
                            "numberRace": "LH1015",
                            "flightTime": 450
                        }
                    ]
                }
            ],
            "returnRaces": {
                "flights": [
                    [
                        {
                            "ticketsCost": {
                                "adult": {
                                    "totalCost": "673.84",
                                    "fare": "438.00",
                                    "tax": "235.84"
                                },
                                "children": {
                                    "totalCost": "525.60",
                                    "fare": "289.08",
                                    "tax": "236.52"
                                },
                                "infant": {
                                    "totalCost": "215.63",
                                    "fare": "189.75",
                                    "tax": "25.88"
                                }
                            },
                            "transitRaces": [
                                {
                                    "departureDateTime": "2023-05-28T17:10:00.000Z",
                                    "arrivalDateTime": "2023-05-28T16:50:00.000Z",
                                    "seatNumbers": [
                                        "27f",
                                        "28f",
                                        "29f",
                                        "30f",
                                        "31f"
                                    ],
                                    "freeSeats": 13,
                                    "numberRace": "AF1146",
                                    "flightTime": 160
                                },
                                {
                                    "departureDateTime": "2023-05-28T19:20:00.000Z",
                                    "arrivalDateTime": "2023-05-29T02:50:00.000Z",
                                    "seatNumbers": [
                                        "7e",
                                        "8e",
                                        "9e",
                                        "10e",
                                        "11e"
                                    ],
                                    "freeSeats": 7,
                                    "numberRace": "NH452",
                                    "flightTime": 450
                                }
                            ]
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