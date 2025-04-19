/** @type {import('stylelint').Config} */
export default {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-prettier", "stylelint-order"],
  rules: {
    "prettier/prettier": true,
    "order/properties-alphabetical-order": true,
    "block-no-empty": true,
  },
};
