import print from './print'
import './index.css'

function add(a, b) {
    return a + b;
}

console.log('...');

print();

console.log(add(2, 4));

if(module.hot){
    // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js',function(){
        // 方法会监听 print.js 文件的变化，一旦发生变化，其他默认不会重新打包构建
        // 会执行后面的回调函数
        print();
    })
}