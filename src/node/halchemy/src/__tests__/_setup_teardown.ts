import {setupServer} from "msw/node";
import {AfterAll, BeforeAll, Before, ITestCaseHookParameter} from "@cucumber/cucumber";

export const server = setupServer()

BeforeAll(() => {
    server.listen()
})

AfterAll(() => {
    server.close()
})


const initializedFeatures: { [featureName: string]: boolean } = {};

export const ReadMethods = ['GET', 'HEAD', 'OPTIONS']
export const ModifyMethods = ['PUT', 'PATCH', 'DELETE']
export const PayloadMethods = ['POST', 'PUT', 'PATCH']
export const AllMethods = [...ReadMethods, ...ModifyMethods]


export const BeforeFeature = (featureName: string, callback: (this: any) => void) => {
    Before(function (scenario: ITestCaseHookParameter) {
        const currentFeatureName = scenario.gherkinDocument?.feature?.name;
        if (currentFeatureName && currentFeatureName.includes(featureName) && !initializedFeatures[currentFeatureName]) {
            initializedFeatures[currentFeatureName] = true;
            callback.call(this);
        }
    })
}

export interface RequestContext {
    urls: Record<string, string>
    headers: Record<string, object>
}
