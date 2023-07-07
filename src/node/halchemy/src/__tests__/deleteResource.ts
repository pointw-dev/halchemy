import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api} from "../api"
import {absolute} from "./_resources";

const resolver = jest.fn()
const defaultScenario = rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
    resolver()
    return res(ctx.status(204))
})

const preconditionFailed = rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
    return res(ctx.status(412), ctx.json({_status: 'ERR', _error:{code: 422, message:'Client and server etags don\'t match'}}))
})

const missingIfMatch = rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
    return res(ctx.status(428), ctx.json({_status: 'ERR', _error:{code: 428, message:'To edit a document its etag must be provided using the If-Match header'}}))
})

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for deleteResource()', () => {
    const api = new Api('http://localhost:2112')

    it('sends DELETE request to the self rel of the resource', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.deleteResource(absolute)

        // assert
        expect(resolver).toBeCalled()
    });


    it('properly let\'s me know if there is an etag mismatch', async () => {
        // arrange
        server.use(preconditionFailed)

        try {
            // act
            await api.deleteResource(absolute)
        } catch (error) {
            // assert
            expect(error.message).toBe('DELETE request failed')
            expect(error.status).toBe(412)
        }
    });


    it('properly let\'s me know if the If-match header is missing', async () => {
        // arrange
        server.use(missingIfMatch)

        try {
            // act
            await api.deleteResource(absolute)
        } catch (error) {
            // assert
            expect(error.message).toBe('DELETE request failed')
            expect(error.status).toBe(428)
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
        await expect(api.deleteResource(absolute)).rejects.toThrow()
    });


    it.each([500])('fails gracefully when server responds with %p', async (statusCode) => {
        // arrange
        const data = { error: 'Internal Server Error' }
        server.use(
            rest.delete('http://localhost:2112/absolute', (req, res, ctx) => {
                return res(ctx.status(statusCode), ctx.json(data))
            })
        )
        expect.assertions(2)

        try {
            await api.deleteResource(absolute)
        } catch (error) {
            expect(error.message).toBe('DELETE request failed')
            expect(error.status).toBe(statusCode)
        }
    });
})
