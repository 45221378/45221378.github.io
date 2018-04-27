# 商户端后台项目

## 配置文件

修改```./src/utils/config.js```文件

1.测试地址修改
```
case 'test':
    baseURL=  //测试地址
```
2.预生产地址修改
```
case 'uat':
    baseURL=  //预生产地址
```
3.生产地址修改
```
default:
    baseURL=  //生产地址
```

## 项目安装
```
npm i
```

## 项目打包
1.测试打包
```
npm run build:test
```
2.预生产打包
```
npm run build:uat
```
3.生产打包
```
npm run build
```