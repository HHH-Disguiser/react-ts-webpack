module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: ["plugin:vue/recommended", "@vue/airbnb"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
        indent: ["error", 4],
        "max-len": ["error", { code: 400 }],
        "linebreak-style": [0, "error", "windows"],
        "vue/script-indent": ["error", 4],
        "vue/html-indent": ["error", 4],
        "vue/html-closing-bracket-newline": [
            "error",
            {
                singleline: "never",
                multiline: "never"
            }
        ],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: true
                }
            }
        ],
        "import/extensions": [
            "error",
            "always",
            {
                js: "never",
                vue: "never",
                css: "never",
                scss: "never"
            }
        ]
    },
    settings: {
        // 解析import的资源路径，比如alias
        "import/resolver": {
            webpack: {
                config: "./node_modules/@vue/cli-service/webpack.config.js"
            }
        }
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
