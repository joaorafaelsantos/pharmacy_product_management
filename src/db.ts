const AWS = require("aws-sdk")
const documentClient = new AWS.DynamoDB.DocumentClient()
import ascSortById from "./utils"
import IQueryItem from "./interfaces/IQueryItem"

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

async function findOne(table: string, id: string) {
    const key = "id"
    const findByIdQuery = {
        TableName: table,
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id }
    };
    const results = await ddbScan(findByIdQuery)
    return results[DDB_ITEMS][0] || {}
}

async function update(table: string, id: string, items: Array<IQueryItem>) {
    let UpdateExpression = 'set'
    let ExpressionAttributeValues = {}
    let ExpressionAttributeNames = {}
    items.forEach((item, index) => {
        UpdateExpression += ` #${item.name} = :${item.name}${index < items.length - 1 ? ',' : ''}`
        ExpressionAttributeValues[`:${item.name}`] = item.value
        ExpressionAttributeNames[`#${item.name}`] = item.name
    })

    const updateQuery = {
        TableName: table,
        Key: {
            "id": id
        },
        UpdateExpression,
        ExpressionAttributeValues,
        ExpressionAttributeNames
    };
    await ddbUpdate(updateQuery)
    return findOne(table, id)
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

export default { create, findAll, findOne, update, remove }