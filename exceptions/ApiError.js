class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static notFound(message, errors = []) {
		return new ApiError(404, message, errors);
	}

	static internal(message, errors = []) {
		return new ApiError(500, message, errors);
	}

	static forbidden(message, errors = []) {
		return new ApiError(403, message, errors);
	}

	static badRequest(message, errors = []) {
		return new ApiError(400, message, errors);
	}

	static ok(message) {
		return new ApiError(200, message);
	}
}

module.exports = ApiError;
