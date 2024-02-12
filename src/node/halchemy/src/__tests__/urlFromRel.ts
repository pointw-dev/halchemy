import {Api, RelSpec} from "../api"
import {TemplateValuesMissingError} from "../errors";
import {root} from "./_resources";

describe('tests for urlFromRel()', () => {
    const api = new Api('http://localhost:2112')


    it('builds a url from self rel', async () => {
        // arrange
        const specs: RelSpec = {
            resource: root,
            rel: 'self'
        }

        // act
        const url = api.urlFromRel(specs)

        // assert
        expect(url).toBe('http://localhost:2112')
    })


    it('builds a templated url', async() => {
        // arrange
        const specs: RelSpec = {
            resource: root,
            rel: 'templated',
            template: {id: '123'}
        }

        // act
        const url = api.urlFromRel(specs)

        // assert
        expect(url).toBe('http://localhost:2113/catalogs/123')
    })


    it('throws an error if template required but not supplied', async () => {
        // arrange
        const specs: RelSpec = {
            resource: root,
            rel: 'templated'
        }

        // act
        const caller = () => {
            api.urlFromRel(specs)
        }

        // assert
        expect(caller).toThrow('You must supply templates for templated links')
        expect(caller).toThrow(TemplateValuesMissingError)
    })


    it('throws an error if supplied template does not have the required data', async () => {
        // arrange
        const specs: RelSpec = {
            resource: root,
            rel: 'templated',
            template: {wrong: '123'}
        }

        // act
        const caller = () => {
            api.urlFromRel(specs)
        }

        // assert
        expect(caller).toThrow('The template provided is missing values')
        expect(caller).toThrow(TemplateValuesMissingError)
    })


    it('provides a list of missing template values', async () => {
        // arrange
        const specs: RelSpec = {
            resource: root,
            rel: 'templated'
        }
        expect.assertions(1)

        try {
            // act
            api.urlFromRel(specs)
        } catch (error) {
            // assert
            if (error instanceof TemplateValuesMissingError) {
                expect(error.missingValuesFor).toEqual(expect.arrayContaining(['id']))
            } else {
                throw new Error('Wrong exception type thrown')
            }
        }
    });


    it('builds a query string from parameters', async() => {
        // arrange
        const specs: RelSpec = {resource: root, rel:'absolute', parameters: {max_results: 50}};

        // act
        const url = api.urlFromRel(specs)

        // assert
        expect(url).toBe('http://localhost:2112/absolute?max_results=50')
    })


    it('builds a query string with multiple parameters', async() => {
        // arrange
        const specs: RelSpec = {resource: root, rel:'relative', parameters:{max_results:50, page: 2}}

        // act
        const url = api.urlFromRel(specs)

        // assert
        expect(url).toBe('/relative?max_results=50&page=2')
    })


    it('builds a query string from parameters with urlencoding', async() => {
        // arrange
        const specs: RelSpec = {resource: root, rel:'absolute', parameters:{where:{name:"bob"}}}

        // act
        const url = api.urlFromRel(specs)

        // assert
        expect(url).toBe('http://localhost:2112/absolute?where=%5Bobject%20Object%5D')
    })


    it('can use both template and parameters', async() => {
        // arrange
        const specs: RelSpec = {resource: root, rel:'templated', parameters:{max_results:50}, template:{id:'123'}};

        // act
        const url = api.urlFromRel(specs)

        // assert
        expect(url).toBe('http://localhost:2113/catalogs/123?max_results=50')
    })
})