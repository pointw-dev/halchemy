import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api, RelSpec} from "../api"
import {absolute, relative, root} from "./_resources";

const defaultScenario = [
    rest.get('http://localhost:2112', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(root))
    }),
    rest.get('http://localhost:2112/relative', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(relative))
    }),
    rest.get('http://localhost:2112/absolute', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(absolute))
    })
]


const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for getFromRel()', () => {
    const api = new Api('http://localhost:2112')

    it('follows link with a relative href', async () => {
        // arrange
        server.use(...defaultScenario)
        const spec: RelSpec = {resource: root, rel: 'relative'}

        // act
        const result = await api.getFromRel(spec)

        // assert
        expect(result).toMatchObject(relative)
    });


    it('follows link with an absolute href', async () => {
        // arrange
        server.use(...defaultScenario)
        const spec: RelSpec = {resource: root, rel: 'absolute'}

        // act
        const result = await api.getFromRel(spec)

        // assert
        expect(result).toMatchObject(absolute)
    });


    it('adds additional headers', async() => {
        let headerExists = false;
        let headerValueIsCorrect = false; // Variable to store the result of our header check

        const additionalHeaders = {
            'X-Custom-Header': 'expected'
        }

        // arrange
        server.use(
            rest.get('http://localhost:2112/absolute', (req, res, ctx) => {
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
        const spec: RelSpec = {resource: root, rel: 'absolute'}

        // act
        await api.getFromRel(spec, additionalHeaders)

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
                rest.get('http://localhost:2112/absolute', (req, res, ctx) => {
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
        const spec: RelSpec = {resource: root, rel: 'absolute'}

        // act
        await api.getFromRel(spec, additionalHeaders)

        // assert
        expect(headerExists).toBe(true);
        expect(headerValueIsCorrect).toBe(true);
    });

})