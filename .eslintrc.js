const base = require("@blitzjs/next/eslint")
module.exports = {
  ...base,
  extends: base.extends.concat("plugin:react-hooks/recommended"),
}
