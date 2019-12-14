const AWS = require("aws-sdk")
const documentClient = new AWS.DynamoDB.DocumentClient()
import ascSortById from "./utils"

if (process.env.ENVIRONMENT === "development") {
    const credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE })
    AWS.config.credentials = credentials
}

AWS.config.update({ region: process.env.AWS_REGION })

const DDB_ITEMS = "Items"

async function ddbPut(query) {
    const scan = await documentClient.put(query).promise()
    return scan
}

async function ddbScan(query) {
    const scan = await documentClient.scan(query).promise()
    return scan
}

async function ddbUpdate(query) {
    const scan = await documentClient.update(query).promise()
    return scan
}

async function ddbRemove(query) {
    const remove = await documentClient.delete(query).promise()
    return remove
}

async function create(table: string, data: object) {
    const createQuery = {
        TableName: table,
        Item: { ...data }
    };
    await ddbPut(createQuery)
    return { ...data }
}

async function findAll(table: string) {
    const findAllQuery = {
        TableName: table,
        Select: "ALL_ATTRIBUTES"
    };
    const results = await ddbScan(findAllQuery)
    return ascSortById(results[DDB_ITEMS]) || []
}

async function findOne(table: string, value: string) {
    const key = "id"
    const findByIdQuery = {
        TableName: table,
        FilterExpression: `${key} = :${key}`,
        ExpressionAttributeValues: { [`:${key}`]: value }
    };
    const results = await ddbScan(findByIdQuery)
    return results[DDB_ITEMS][0] || {}
}

async function update(table: string, value: string, name: string) {
    const updateQuery = {
        TableName: table,
        Key: {
            "id": value
        },
        UpdateExpression: "set #name = :name",
        ExpressionAttributeValues: {
            ":name": name,
        },
        ExpressionAttributeNames: {
            "#name": "name",
        }
    };
    await ddbUpdate(updateQuery)
    return { id: value, name }
}

async function updateProduct(table: string, value: string, name: string, brand_id: string) {
    const updateQuery = {
        TableName: table,
        Key: {
            "id": value
        },
        UpdateExpression: "set #name = :name, #brand_id = :brand_id",
        ExpressionAttributeValues: {
            ":name": name,
            ":brand_id": brand_id,
        },
        ExpressionAttributeNames: {
            "#name": "name",
            "#brand_id": "brand_id",
        }
    };
    await ddbUpdate(updateQuery)
    return { id: value, name, brand_id }
}

async function remove(table: string, value: string) {
    const key = "id"
    const removeByIdQuery = {
        TableName: table,
        Key: {
            [key]: value
        },
    };
    const results = await ddbRemove(removeByIdQuery)
    return results
}

export default { create, findAll, findOne, update, updateProduct, remove }