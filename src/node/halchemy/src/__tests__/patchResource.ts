import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api} from "../api"
import {absolute, patched} from "./_resources";

const defaultScenario = rest.patch('http://localhost:2112/absolute', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(patched))
})

const preconditionFailed = rest.patch('http://localhost:2112/absolute', (req, res, ctx) => {
    return res(ctx.status(412), ctx.json({_status: 'ERR', _error:{code: 422, message:'Client and server etags don\'t match'}}))
})

const missingIfMatch = rest.patch('http://localhost:2112/absolute', (req, res, ctx) => {
    return res(ctx.status(428), ctx.json({_status: 'ERR', _error:{code: 428, message:'To edit a document its etag must be provided using the If-Match header'}}))
})

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for patchResource()', () => {
    const api = new Api('http://localhost:2112')

    it('sends PATCH request to the self rel of the resource', async () => {
        // arrange
        server.use(defaultScenario)

        // act
        const result = await api.patchResource(absolute, {name: 'My Name'})

        // assert
        expect(result._status).toEqual('ok')
    });


    it('properly let\'s me know if there is an etag mismatch', async () => {
        // arrange
        server.use(preconditionFailed)

        try {
            // act
            await api.patchResource(absolute, {name: 'My Name'})
        } catch (error) {
            // assert
            expect(error.message).toBe('PATCH request failed')
            expect(error.status).toBe(412)
        }
    });


    it('properly let\'s me know if the If-match header is missing', async () => {
        // arrange
        server.use(missingIfMatch)

        try {
            // act
            await api.patchResource(absolute, {name: 'My Name'})
        } catch (error) {
            // assert
            expect(error.message).toBe('PATCH request failed')
            expect(error.status).toBe(428)
        }
    });


    it('fails gracefully when the server is down', async () => {
        // arrange
        server.use(
            rest.patch('http://localhost:2112/absolute', (req, res, ctx) => {
                return res.networkError('Failed to connect')
            })
        )

        // act
        // assert
        await expect(api.patchResource(absolute, {name: 'My Name'})).rejects.toThrow()
    });


    it.each([500])('fails gracefully when server responds with %p', async (statusCode) => {
        // arrange
        const data = { error: 'Internal Server Error' }
        server.use(
            rest.patch('http://localhost:2112/absolute', (req, res, ctx) => {
                return res(ctx.status(statusCode), ctx.json(data))
            })
        )
        expect.assertions(2)

        try {
            await api.patchResource(absolute, {name: 'My Name'})
        } catch (error) {
            expect(error.message).toBe('PATCH request failed')
            expect(error.status).toBe(statusCode)
        }
    });
})
