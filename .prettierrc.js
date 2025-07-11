module.exports = {
    arrowParens: 'avoid', // 箭头函数参数：只有一个参数时省略括号， avoid 箭头函数只有一个参数，则不添加括号，always 一直添加
    bracketSameLine: false, // JSX 标签：多行标签时，> 保持在同一行
    bracketSpacing: true, // 对象字面量：括号内部不添加空格
    singleQuote: true, // 字符串：使用单引号， true：使用单引号
    trailingComma: 'all', // 尾随逗号：在所有可能的地方添加尾随逗号
    semi: true, // 控制是否在语句末尾添加分号
    tabWidth: 4, // 设置缩进的空格数
    useTabs: false, // 控制是否使用制表符 (Tab) 作为缩进
    printWidth: 100, // 设置每行的最大字符数，超出时会进行换行
};
