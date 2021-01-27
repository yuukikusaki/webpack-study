/**
 * index.js：webpack入口七点文件
 * 
 * 1. 运行指令：
 *  开发环境：webpack bundle --mode=development
 *           webpack --entry ./src/index.js -o ./build/built.js --mode=development
 *  
 *  生成环境：webpack bundle --mode=production
 * 
 *  2. 结论：
 *   1. webpack能处理js/json资源，不能处理css/img等资源
 *   2. 能编译es6
 */

import './index.css'

import data from './data.json'

console.log(data)

function add(x, y) {
    return x + y;
}

console.log(add(1, 2))