const { UnprocessableEntityError } = require("./errors")

const isNil = (value) => value === null || typeof value === "undefined" || String(value).trim() === ""

const validateFields = ({ required, obj, username }) => {
  if (!obj) throw new UnprocessableEntityError(`Missing object for validation.`)

  required.forEach((item) => {
    if (isNil(obj[item])) {
      throw new UnprocessableEntityError(`Required field - ${item} missing${username ? ` at ${username}` : ""}`)
    }
  })
}

module.exports = { validateFields, isNil }