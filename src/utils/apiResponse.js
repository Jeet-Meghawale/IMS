class ApiResponse {
    constructor(success,statusCode,message, data = null) {
        this.success = success
        this.message = message
        this.data = data
        this.statusCode = statusCode

    }
}

export default ApiResponse