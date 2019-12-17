import Product from "../models/Product"

const create = async (res: any, name: string, brand_id: string, properties?: object) => {
    try {
        if (name && brand_id) return await Product.create(new Product(name, brand_id, properties).serialize())
        res.status(400)
        throw Error("Name or brand_id are not defined")
    } catch (err) {
        return { error: String(err) }
    }
}

const getAll = async () => {
    try {
        return await Product.getAll()
    } catch (err) {
        return { error: err }
    }
}

const getById = async (id: string) => {
    try {
        return await Product.getById(id)
    } catch (err) {
        return { error: err }
    }
}

const updateById = async (res: any, id: string, name?: string, brand_id?: string, properties?: object) => {
    try {
        let queryItems: Array<any> = []
        if (name) {
            queryItems.push({
                name: "name",
                value: name
            })
        }

        if (brand_id) {
            queryItems.push({
                name: "brand_id",
                value: brand_id
            })
        }

        console.log(properties)
        if (Object.keys(properties).length > 0) {
            queryItems.push({
                name: "properties",
                value: properties
            })
        }

        if (name || brand_id || properties) return await Product.updateById(id, queryItems)
        res.status(400)
        throw Error("You must define at least one of these values: name, brand_id or properties")
    } catch (err) {
        return { error: String(err) }
    }
}

const removeById = async (id: string) => {
    try {
        return await Product.removeById(id)
    } catch (err) {
        return { error: err }
    }
}

export default { create, getAll, getById, updateById, removeById }