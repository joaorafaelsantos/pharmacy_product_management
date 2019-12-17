import Brand from "../models/Brand"
import IQueryItem from "../interfaces/IQueryItem"

const create = async (res: any, name: string) => {
    try {
        if (name) return await Brand.create(new Brand(name).serialize())
        res.status(400)
        throw Error("Name is not defined")
    } catch (err) {
        return { error: String(err) }
    }
}

const getAll = async () => {
    try {
        return await Brand.getAll()
    } catch (err) {
        return { error: err }
    }
}

const getById = async (id: string) => {
    try {
        let queryItem: IQueryItem = { name: "id", value: id }
        return await Brand.getByItem(queryItem)
    } catch (err) {
        return { error: err }
    }
}
const getByName = async (name: string) => {
    try {
        let queryItem: IQueryItem = { name: "name", value: name }
        return await Brand.getByItem(queryItem)
    } catch (err) {
        return { error: err }
    }
}

const updateById = async (res: any, id: string, name: string) => {
    try {
        if (name) {
            let queryItems: Array<IQueryItem> = [
                {
                    name: "name",
                    value: name
                }
            ]
            return await Brand.updateById(id, queryItems)
        }
        res.status(400)
        throw Error("Name is not defined")
    } catch (err) {
        return { error: String(err) }
    }
}

const removeById = async (id: string) => {
    try {
        return await Brand.removeById(id)
    } catch (err) {
        return { error: err }
    }
}

export default { create, getAll, getById, getByName, updateById, removeById }