import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api, HttpError} from "../api"
import {root} from "./_resources";

const defaultScenario = rest.get('http://localhost:2112', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(root))
})

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for get()', () => {
    const api = new Api('http://localhost:2112')

    it('returns root when no url provided', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.get()

        // assert
        expect(result).toMatchObject(root)
    });


    it('returns root when url provided is /', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.get('/')

        // assert
        expect(result).toMatchObject(root)
    });


    it('returns root when url provided absolute', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.get('http://localhost:2112')

        // assert
        expect(result).toMatchObject(root)
    });


    it.each([404,500])('fails gracefully when server responds with %p', async (statusCode) => {
        // arrange
        const data = { error: 'Internal Server Error' }
        server.use(
            rest.get('http://localhost:2112', (req, res, ctx) => {
                return res(ctx.status(statusCode), ctx.json(data))
            })
        )
        expect.assertions(3)

        try {
            await api.get()
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError)
            expect(error.message).toBe('GET request failed')
            expect(error.status).toBe(statusCode)
        }
    });


    it('fails gracefully when the server is down', async () => {
        // arrange
        server.use(
            rest.get('http://localhost:2112', (req, res, ctx) => {
                return res.networkError('Failed to connect')
            })
        )

        // act
        // assert
        await expect(api.get()).rejects.toThrow()
    });
})
