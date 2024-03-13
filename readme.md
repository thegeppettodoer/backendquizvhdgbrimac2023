##### Autor: Victor Hugo David GarciaB

##### crear dynamo local:
% java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 9000        

base url    https://swapi-api.hbtn.io/api/


####  .env
PORT_SERVER=9000
URL=http://localhost:9000
REGION=localhost
URL_PLANETAS=https://swapi.py4e.com/api/planets






________________________________________________________
<!-- // GET        https://swapi.py4e.com/api/planets/1/ -->

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://swapi.py4e.com/api/planets/1/',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
<!-- -------------- -->
result:
{
    "name": "Tatooine",
    "rotation_period": "23",
    "orbital_period": "304",
    "diameter": "10465",
    "climate": "arid",
    "gravity": "1 standard",
    "terrain": "desert",
    "surface_water": "1",
    "population": "200000",
    "residents": [
        "https://swapi.py4e.com/api/people/1/",
        "https://swapi.py4e.com/api/people/2/",
        "https://swapi.py4e.com/api/people/4/",
        "https://swapi.py4e.com/api/people/6/",
        "https://swapi.py4e.com/api/people/7/",
        "https://swapi.py4e.com/api/people/8/",
        "https://swapi.py4e.com/api/people/9/",
        "https://swapi.py4e.com/api/people/11/",
        "https://swapi.py4e.com/api/people/43/",
        "https://swapi.py4e.com/api/people/62/"
    ],
    "films": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/3/",
        "https://swapi.py4e.com/api/films/4/",
        "https://swapi.py4e.com/api/films/5/",
        "https://swapi.py4e.com/api/films/6/"
    ],
    "created": "2014-12-09T13:50:49.641000Z",
    "edited": "2014-12-20T20:58:18.411000Z",
    "url": "https://swapi.py4e.com/api/planets/1/"
}

________________________________________________________
<!-- // GET      https://swapi-api.hbtn.io/api/ -->

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://swapi-api.hbtn.io/api/',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


<!-- -------------- -->

result:
{
    "people": "https://swapi-api.hbtn.io/api/people/",
    "planets": "https://swapi-api.hbtn.io/api/planets/",
    "films": "https://swapi-api.hbtn.io/api/films/",
    "species": "https://swapi-api.hbtn.io/api/species/",
    "vehicles": "https://swapi-api.hbtn.io/api/vehicles/",
    "starships": "https://swapi-api.hbtn.io/api/starships/"
}
________________________________________________________
<!-- // GET      https://swapi.py4e.com/api/planets/schema -->


var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://swapi.py4e.com/api/planets/schema',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

<!-- -------------- -->

result:
{
    "description": "A planet.",
    "title": "Planet",
    "required": [
        "name",
        "rotation_period",
        "orbital_period",
        "diameter",
        "climate",
        "gravity",
        "terrain",
        "surface_water",
        "population",
        "residents",
        "films",
        "created",
        "edited",
        "url"
    ],
    "$schema": "http://json-schema.org/draft-04/schema",
    "type": "object",
    "properties": {
        "diameter": {
            "type": "string",
            "description": "The diameter of this planet in kilometers."
        },
        "climate": {
            "type": "string",
            "description": "The climate of this planet. Comma-seperated if diverse."
        },
        "surface_water": {
            "type": "string",
            "description": "The percentage of the planet surface that is naturally occuring water or bodies of water."
        },
        "name": {
            "type": "string",
            "description": "The name of this planet."
        },
        "created": {
            "type": "string",
            "description": "The ISO 8601 date format of the time that this resource was created.",
            "format": "date-time"
        },
        "url": {
            "type": "string",
            "description": "The hypermedia URL of this resource.",
            "format": "uri"
        },
        "rotation_period": {
            "type": "string",
            "description": "The number of standard hours it takes for this planet to complete a single rotation on its axis."
        },
        "edited": {
            "type": "string",
            "description": "the ISO 8601 date format of the time that this resource was edited.",
            "format": "date-time"
        },
        "terrain": {
            "type": "string",
            "description": "the terrain of this planet. Comma-seperated if diverse."
        },
        "gravity": {
            "type": "string",
            "description": "A number denoting the gravity of this planet. Where 1 is normal."
        },
        "orbital_period": {
            "type": "string",
            "description": "The number of standard days it takes for this planet to complete a single orbit of its local star."
        },
        "films": {
            "type": "array",
            "description": "An array of Film URL Resources that this planet has appeared in."
        },
        "residents": {
            "type": "array",
            "description": "An array of People URL Resources that live on this planet."
        },
        "population": {
            "type": "string",
            "description": "The average populationof sentient beings inhabiting this planet."
        }
    }
}

<!-- comandos para crear tablas en dynamo db localmente , no te olvides el port-->
 <!--crear tabla  -->

aws dynamodb create-table \
--table-name Planetas \
--attribute-definitions \
    AttributeName=id,AttributeType=S \
--key-schema \
    AttributeName=id,KeyType=HASH \
--provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5 \
--endpoint-url http://localhost:9000


<!-- select   planetas -->
 
 
<!-- insertar registro  a planetas -->
 
 aws dynamodb put-item \
    --table-name Planetas \
    --item '{
        "id": {"S": "2"},
        "name": {"S": "Tierra"},
        "rotation_period": {"S": "24"},
        "orbital_period": {"S": "365.25"},
        "diameter": {"S": "12742"},
        "climate": {"S": "Temperate"},
        "gravity": {"S": "9.8"},
        "terrain": {"S": "Varied"},
        "surface_water": {"S": "71"},
        "population": {"S": "7500000000"},
        "residents": {"SS": ["Luke Skywalker", "Anakin Skywalker"]},
        "films": {"SS": ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"]},
        "created": {"S": "2024-03-13T10:08:56.548Z"},
        "edited": {"S": "2024-03-13T10:08:56.548Z"},
        "url": {"S": "https://swapi.dev/api/planets/1/"}
    }' \
--endpoint-url http://localhost:9000





<!-- eliminar -->
aws dynamodb delete-table \
    --table-name Planetas \
    --endpoint-url http://localhost:9000
