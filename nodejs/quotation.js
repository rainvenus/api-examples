const axios = require('axios');
const CryptoJS = require('crypto-js');

// Key & Secret
const API_KEY = ''; // put your lalamove API key here
const SECRET = ''; // put your lalamove API secret here


axios.defaults.baseURL = 'https://rest.sandbox.lalamove.com'; // URl to Lalamove Sandbox API
const time = new Date().getTime().toString();
const region = 'SG_SIN';
const method = 'POST';
const path = '/v2/quotations';

const body = JSON.stringify({
    "serviceType": "MOTORCYCLE",
    "specialRequests": [],
    "requesterContact": {
        "name": "test",
        "phone": "0899183138"
    },
    "stops": [
        {
            "location": {
                "lat": "1.3140113",
                "lng": "103.8807331"
            },
            "addresses": {
                "en_SG": {
                    "displayString": "Lorong 23 Geylang, Singapore Badminton Hall, Singapore",
                    "country": region
                }
            }
        },
        {
            "location": {
                "lat": "1.2966147",
                "lng": "103.8485095"
            },
           "addresses": {
               "en_SG": {
                   "displayString": "Stamford Road, National Museum of Singapore, Singapore",
                   "country": region
               }
           }
        }
   ],
   "deliveries": [
        {
            "toStop": 1,
            "toContact": {
                "name": "dodo",
                "phone": "+660923447537"
            },
           "remarks": "Do not take this order - SANDBOX CLIENT TEST"
        }
   ]
});

const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();
const startTime = new Date().getTime();

axios.post(path, body, {
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': `hmac ${API_KEY}:${time}:${SIGNATURE}`,
      'Accept': 'application/json',
      'X-LLM-Country': region
    }
}).then((result) => {
    console.log('Total elapsed http request/response time in milliseconds: ', new Date().getTime() - startTime);
    console.log('Authorization header: ', `hmac ${API_KEY}:${time}:${SIGNATURE}`);
    console.log('Status Code: ', result.status);
    console.log('Returned data: ', result.data);
})
