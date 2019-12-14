import Product from "../models/Product"

const create = async (res: any, name: string, brand_id: string) => {
    try {
        if (name && brand_id) return await Product.create(new Product(name, brand_id).serialize())
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

const updateById = async (res: any, id: string, name: string, brand_id: string) => {
    try {
        if (name) return await Product.updateById(id, name, brand_id)
        res.status(400)
        throw Error("Name or brand_id are not defined")
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