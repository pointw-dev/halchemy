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

})