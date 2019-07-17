import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

const mock = new MockAdaptor(axios, { delayResponse: 200 })

const response = (distance, duration) => ({
    "geocoded_waypoints" : [
        {
            "geocoder_status" : "OK",
            "place_id" : "ChIJRVY_etDX3IARGYLVpoq7f68",
            "types" : [
                "bus_station",
                "transit_station",
                "point_of_interest",
                "establishment"
            ]
        },
        {
            "geocoder_status" : "OK",
            "partial_match" : true,
            "place_id" : "ChIJp2Mn4E2-woARQS2FILlxUzk",
            "types" : [ "route" ]
        }
    ],
    "routes" : [
        {
            "bounds" : {
                "northeast" : {
                    "lat" : 34.1330949,
                    "lng" : -117.9143879
                },
                "southwest" : {
                    "lat" : 33.8068768,
                    "lng" : -118.3527671
                }
            },
            "copyrights" : "Map data ©2019 Google",
            "legs" : [
                {
                    "distance" : {
                        "text" : "35.9 mi",
                        "value" : distance
                    },
                    "duration" : {
                        "text" : "51 mins",
                        "value" : duration
                    },
                    "end_address" : "Universal Studios Blvd, Los Angeles, CA 90068, USA",
                    "end_location" : {
                        "lat" : 34.1330949,
                        "lng" : -118.3524442
                    },
                    "start_address" : "Disneyland (Harbor Blvd.), S Harbor Blvd, Anaheim, CA 92802, USA",
                    "start_location" : {
                        "lat" : 33.8098177,
                        "lng" : -117.9154353
                    }
                }
            ],
            "overview_polyline" : {
                "points" : "xxx"
            },
            "summary" : "I-5 N and US-101 N",
            "warnings" : [],
            "waypoint_order" : []
        }
    ],
    "status" : "OK"
})

mock.onGet('https://maps.googleapis.com/maps/api/directions/json').reply(function ({ params }) {
    const { origin, destination } = params
    const distance = Math.ceil(Math.random() * 100)
    const duration = Math.ceil(Math.random() * 100)

    return [200, response(distance, duration)]
});
