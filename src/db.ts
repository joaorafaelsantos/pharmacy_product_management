const AWS = require("aws-sdk")
const dynamodb = new AWS.DynamoDB()
const documentClient = new AWS.DynamoDB.DocumentClient()
import { ascSortById } from "./utils"
import IQueryItem from "./interfaces/IQueryItem"
import { promiseTimeout } from "./utils"

if (process.env.ENVIRONMENT === "development") {
    const credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE })
    AWS.config.credentials = credentials
}

AWS.config.update({ region: process.env.AWS_REGION })

const DDB_ITEMS = "Items"
const API_TIMEOUT = Number(process.env.API_TIMEOUT)

async function ddbPut(query) {
    return await promiseTimeout(API_TIMEOUT, documentClient.put(query).promise())
}

async function ddbScan(query) {
    return await promiseTimeout(API_TIMEOUT, documentClient.scan(query).promise())
}

async function ddbUpdate(query) {
    return await promiseTimeout(API_TIMEOUT, documentClient.update(query).promise())
}

async function ddbRemove(query) {
    return await promiseTimeout(API_TIMEOUT, documentClient.delete(query).promise())
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

async function remove(table: string, id: string) {
    const removeByIdQuery = {
        TableName: table,
        Key: {
            "id": id
        },
    };
    const results = await ddbRemove(removeByIdQuery)
    return results
}

async function listTables() {
    return await promiseTimeout(API_TIMEOUT, dynamodb.listTables().promise())
}

export default { create, findAll, findOne, update, remove, listTables }