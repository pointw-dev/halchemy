import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api, RelSpec} from "../api"
import {HalResource} from "hal-types";
import {absolute, posted, root} from "./_resources";

const defaultScenario = rest.post('http://localhost:2112/absolute', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(posted))
})

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for postToRel()', () => {
    const api = new Api('http://localhost:2112')

    it('sends POST request to a resource\'s rel', async () => {
        // arrange
        server.use(defaultScenario)
        const spec: RelSpec = {
            resource: root,
            rel: 'absolute'
        }

        // act
        const result = await api.postToRel(spec, {name: 'My Name'})

        // assert
        expect(result).toMatchObject(posted)
    });


    it.each([404,500])('fails gracefully when server responds with %p', async (statusCode) => {
        // arrange
        const data = { error: 'Internal Server Error' }
        server.use(
            rest.post('http://localhost:2112/absolute', (req, res, ctx) => {
                return res(ctx.status(statusCode), ctx.json(data))
            })
        )
        const spec: RelSpec = {
            resource: root,
            rel: 'absolute'
        }
        expect.assertions(2)

        try {
            // act
            await api.postToRel(spec, {name: 'My Name'})
        } catch (error) {
            // assert
            expect(error.message).toBe('POST request failed')
            expect(error.status).toBe(statusCode)
        }
    });


    it('fails gracefully when the server is down', async () => {
        // arrange
        server.use(
            rest.post('http://localhost:2112/absolute', (req, res, ctx) => {
                return res.networkError('Failed to connect')
            })
        )
        const spec: RelSpec = {
            resource: root,
            rel: 'absolute'
        }

        // act
        // assert
        await expect(api.postToRel(spec, {name: 'My Name'})).rejects.toThrow()
    });


    it('adds additional headers', async() => {
        let headerExists = false;
        let headerValueIsCorrect = false; // Variable to store the result of our header check

        const additionalHeaders = {
            'X-Custom-Header': 'expected'
        }

        // arrange
        server.use(
            rest.post('http://localhost:2112/absolute', (req, res, ctx) => {
                if (req.headers.has('X-Custom-Header')) {
                    headerExists = true;
                    const customHeaderValue = req.headers.get('X-Custom-Header');
                    if (customHeaderValue === 'expected') {
                        headerValueIsCorrect = true;
                    }
                }

                return res(ctx.json({message: 'Header checked'}));
            })
        );
        const spec: RelSpec = {
            resource: root,
            rel: 'absolute'
        }

        // act
        await api.postToRel(spec, {name: 'My Name'}, additionalHeaders)

        // assert
        expect(headerExists).toBe(true);
        expect(headerValueIsCorrect).toBe(true);
    });


    it('overrides header values', async() => {
        let headerExists = false;
        let headerValueIsCorrect = false;

        const additionalHeaders = {
            'Authorization': 'Bearer token'  // Api() defaults to a Basic token - this should override it
        }

        // arrange
        server.use(
            rest.post('http://localhost:2112/absolute', (req, res, ctx) => {
                if (req.headers.has('Authorization')) {
                    headerExists = true;
                    const authorization = req.headers.get('Authorization');
                    if (authorization === 'Bearer token') {
                        headerValueIsCorrect = true;
                    }
                }

                return res(ctx.json({message: 'Header checked'}));
            })
        );
        const spec: RelSpec = {
            resource: root,
            rel: 'absolute'
        }

        // act
        await api.postToRel(spec, {name: 'My Name'}, additionalHeaders)

        // assert
        expect(headerExists).toBe(true);
        expect(headerValueIsCorrect).toBe(true);
    });

})
