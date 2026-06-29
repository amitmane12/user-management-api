class ApiResponse<T = unknown> {
    readonly success: boolean;

    constructor(
        public readonly statusCode: number,
        public readonly data: T | null,
        public readonly message: string
        // public errors?: any[]
    ) {
        this.success = statusCode < 400;
    }
}

export default ApiResponse;
