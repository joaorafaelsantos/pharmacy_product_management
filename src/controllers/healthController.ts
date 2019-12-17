import db from "../db"

const getHealthStatus = async () => {
    try {
        const results = await db.listTables()
        return { status: "health", code: "200" }
    }
    catch (e) {
        return { status: "unhealthy", code: "500" }
    }
}

export default { getHealthStatus }