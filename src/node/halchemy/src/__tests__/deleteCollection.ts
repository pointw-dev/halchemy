import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api, HttpError} from "../api"
import {root} from "./_resources";

const resolver = jest.fn()
const defaultScenario = rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
    resolver()
    return res(ctx.status(204))
})

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for deleteCollection()', () => {
    const api = new Api('http://localhost:2112')

    it('Deletes collection referred to by an absolute url', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        await api.deleteCollection('http://localhost:2112/absolute')

        // assert
        expect(resolver).toBeCalled()
    });


    it('Deletes collection referred to by an relative url', async () => {
        // arrange
        server.use(rest.delete('http://localhost:2112/relative',(req, res, ctx) => {
            resolver()
            return res(ctx.status(204))
        }))

        // act
        const result = await api.deleteCollection('/relative')

        // assert
        expect(resolver).toBeCalled()
    });


    it.each([404,500])('fails gracefully when server responds with %p', async (statusCode) => {
        // arrange
        const data = { error: 'Internal Server Error' }
        server.use(
            rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
                return res(ctx.status(statusCode), ctx.json(data))
            })
        )
        expect.assertions(3)

        try {
            await api.deleteCollection('http://localhost:2112/absolute')
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError)
            expect(error.message).toBe('DELETE request failed')
            expect(error.status).toBe(statusCode)
        }
    });


    it('fails gracefully when the server is down', async () => {
        // arrange
        server.use(
            rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
                return res.networkError('Failed to connect')
            })
        )

        // act
        // assert
        await expect(api.deleteCollection('http://localhost:2112/absolute')).rejects.toThrow()
    });
})
