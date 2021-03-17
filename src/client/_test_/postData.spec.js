import { postData } from "../js/postData";

describe("testing postData()", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it(" should return response data from the api", async done => {
        fetchMock.mockResponseOnce(JSON.stringify({
            sections:
            {
                status: 200,
                "data": [
                    {
                        "weather": {
                            "icon": "c02d",
                            "code": 802,
                            "description": "Scattered clouds"
                        },
                        "precip": 0,
                        "datetime": "2021-03-12",
                        "temp": 17.5,
                    }
                ]
            }
        }
        ));
        const urlInput = 'http://localhost:8800/inputSubmit';
        const textInput = "Atlanta, GA";
        const postResponse = await postData(urlInput, textInput);

        expect(postResponse.status).toBe(200);
        done();
    })
})