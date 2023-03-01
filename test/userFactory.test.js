const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require('assert')

const dbData = [{ name: 'Teste'}, { name: 'Mock' }]

class MockDatabase {
    connect = () => this
    find = async (query) => dbData
}

;
(async () => {
    {
        rewiremock(() => require('./../src/utils/database')).with(MockDatabase)

        const expected = [{ name: 'TESTE'}, { name: 'MOCK' }]

        rewiremock.enable()
        const UserFactory = require("../src/factory/userFactory.js");

        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()

        deepStrictEqual(result, expected)

        rewiremock.disable()
    }
    {
        const expected = [{ name: 'LUCASSOUZA'}]
        const UserFactory = require("../src/factory/userFactory.js");

        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()

        deepStrictEqual(result, expected)
    }
})()