const uuidv1 = require('uuid/v1');
import IProduct from "../interfaces/IProduct"
import db from "../db"
import IQueryItem from "../interfaces/IQueryItem"

const BRAND_TABLE = "Product"

class Product implements IProduct {
    private _id: string

    constructor(public name: string, public brand_id: string, public properties: object) {
        this._id = uuidv1()
        this.name = name
        this.brand_id = brand_id
        this.properties = properties
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

    static async updateById(id: string, data: Array<IQueryItem>) {
        return await db.update(BRAND_TABLE, id, data)
    }

    static async removeById(id: string) {
        return await db.remove(BRAND_TABLE, id)
    }

    serialize() {
        return {
            id: this._id,
            name: this.name,
            brand_id: this.brand_id,
            properties: this.properties
        }
    }
}

export default Product