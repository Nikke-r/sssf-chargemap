# sssf-chargemap

## Queries

Endpoint: `http://first-app.jelastic.metropolia.fi/stations`

### Example for GET methods 

Get number of `X` stations: `http://first-app.jelastic.metropolia.fi/stations?limit=X`

Get stations within a area: `http://localhost:3000/stations?topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}`

You can also combine `GET` queries: `http://localhost:3000/stations?topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}&limit=3`

Without the query param limit the endpoint will return 10 results.

### Example for POST methods

Example body for creating a new station:

```
{
  "Station": {
      "Title": "Uusi Asema",
      "Town": "Uusi Kaupunki",
      "AddressLine1": "Katu 123",
      "StateOrProvince": "Southern Finland",
      "Postcode": "00000",
      "Location": {
        "coordinates": [24.77772323548868, 60.203353130088146]
      }
  },
  "Connections":[
      {
      "ConnectionTypeID": "5e39eecac5598269fdad81a0",
      "CurrentTypeID": "5e39ef4a6921476aaf62404a",
      "LevelID": "5e39edf7bb7ae768f05cf2bc",
      "Quantity": 4
      }
  ]
} 
```

### Example for DELETE method

If you need to delete some station, just pass the `ID` of the station as a parameter `http://first-app.jelastic.metropolia.fi/stations/ID`

### Example for PUT method

Just pass the new object as a body with the `ID`'s of the station and Connections and send it to the endpoint using `PUT` method

```
{
"Station": {
    "_id": ID,
    "Title": "Testi",
    "Town": "Espoo",
    "AddressLine1": "Sinimäentie 8b",
    "StateOrProvince": "Southern Finland",
    "Postcode": "02630",
    "Location": {
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
},
"Connections":[
        {
        "_id": ID,
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 7
        }
  ]
}

```