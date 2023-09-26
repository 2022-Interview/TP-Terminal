class GetError extends Error {
  constructor(code, message) {
    super(message); // 调用Error内部的constructor
    this.code = code;
    this.message = message;
    this.name = "myError";
  }
}
module.exports = GetError;
