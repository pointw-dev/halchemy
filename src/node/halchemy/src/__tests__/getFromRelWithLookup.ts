import {rest} from "msw"
import {setupServer} from "msw/node";
import {Api, RelSpec} from "../api"
import {HalResource} from "hal-types";
import {absolute, relative, root} from "./_resources";

const defaultScenario = [
    rest.get('http://localhost:2112', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(root))
    }),
    rest.get('http://localhost:2112/relative/123', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(relative))
    }),
    rest.get('http://localhost:2112/absolute/123', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(absolute))
    })
]


const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('tests for getFromRelWithLookup()', () => {
    const api = new Api('http://localhost:2112')

    it('follows link/lookup with a relative href', async () => {
        // arrange
        server.use(...defaultScenario)
        const spec: RelSpec = {resource: root, rel: 'relative'};

        // act
        const result = await api.getFromRelWithLookup(spec, '123')

        // assert
        expect(result).toMatchObject(relative)
    });


    it('follows link/lookup with an absolute href', async () => {
        // arrange
        server.use(...defaultScenario)
        const spec: RelSpec = {resource: root, rel: 'absolute'};

        // act
        const result = await api.getFromRelWithLookup(spec, '123')

        // assert
        expect(result).toMatchObject(absolute)
    });

})