import * as requestLogger from "./requestLogger"
// @ponicode
describe("requestLogger.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            requestLogger.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})
