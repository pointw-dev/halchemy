import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api} from "../api"
import {HalResource} from "hal-types";
import {posted} from "./_resources";

const defaultScenario = rest.post('http://localhost:2112/catalogs', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(posted))
})

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for postToUrl()', () => {
    const api = new Api('http://localhost:2112')

    it('sends POST request with relative url', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.postToUrl('/catalogs', {name: 'My Name'})

        // assert
        expect(result).toMatchObject(posted)
    });


    it('sends POST request with absolute url', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.postToUrl('http://localhost:2112/catalogs', {name: 'My Name'})

        // assert
        expect(result).toMatchObject(posted)
    });

    it.each([404,500])('fails gracefully when server responds with %p', async (statusCode) => {
        // arrange
        const data = { error: 'Internal Server Error' }
        server.use(
            rest.post('http://localhost:2112/catalogs', (req, res, ctx) => {
                return res(ctx.status(statusCode), ctx.json(data))
            })
        )
        expect.assertions(2)

        try {
            await api.postToUrl('/catalogs', {name: 'My Name'})
        } catch (error) {
            expect(error.message).toBe('POST request failed')
            expect(error.status).toBe(statusCode)
        }
    });


    it('fails gracefully when the server is down', async () => {
        // arrange
        server.use(
            rest.post('http://localhost:2112/catalogs', (req, res, ctx) => {
                return res.networkError('Failed to connect')
            })
        )

        // act
        // assert
        await expect(api.postToUrl('/catalogs', {name: 'My Name'})).rejects.toThrow()
    });
})
