const uuidv1 = require('uuid/v1');
import IBrand from "../interfaces/Ibrand"
import db from "../db"

const BRAND_TABLE = "Brand"

class Brand implements IBrand {
    private _id: string

    constructor(public name: string) {
        this._id = uuidv1()
        this.name = name
    }

    static async create(data: object) {
        return await db.create(BRAND_TABLE, data)
    }

    static async getAll() {
        return await db.findAll(BRAND_TABLE)
    }

    static async getById(id: string) {
        return await db.findOne(BRAND_TABLE, id)
    }

    static async updateById(id: string, name: string) {
        return await db.update(BRAND_TABLE, id, name)
    }

    static async removeById(id: string) {
        return await db.remove(BRAND_TABLE, id)
    }

    serialize() {
        return {
            id: this._id,
            name: this.name
        }
    }
}

export default Brand