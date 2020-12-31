## --save与--save-dev的区别  -S和-D的区别
--save-dev 和 -D 添加到 devDependencies  生产环境的所需依赖也就是咱们的线上环境。
--save 和 -S 添加到 dependencies  开发和测试所需的依赖也就是咱们本地环境 

## 修改antd的主题色，并支持less
yarn add less@2.7.3 less-loader@5.0.0 antd babel-plugin-import@^1.13.3 -D

## /@->/src 路径 alias: {...,'@': paths.appSrc}
alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    // Allows for better profiling with ReactDevTools
    ...(isEnvProductionProfile && {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
    }),
    ...(modules.webpackAliases || {}),
    '@': paths.appSrc
},

## mockjs的增删改查
yarn add mockjs -D
在src中新建mock文件夹 
yarn add axios -D

