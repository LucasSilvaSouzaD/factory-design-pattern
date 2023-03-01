export default class Database {
    constructor({ connectionString }) {
        this.connectionString = connectionString
    }

    async connect() {
        return this
    }

    async find(query) { 
        return [{ name: 'LucasSouza'}]
    }
}