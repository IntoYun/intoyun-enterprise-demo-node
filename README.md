# intoyun-enterprise-demo-node
## 环境要求
- nodejs 8.6+
- 支持Linux Mac OS，暂不支持Windows（不支持Windows原因是因为项目中引用到了`node-rdkafa`这个包在Windows编译不通过，如果你坚持要在Windows下使用，请参考[Blizzard/node-rdkafka](https://github.com/Blizzard/node-rdkafka)）。

## 安装NodeJS

### Linux 安装
安装NodeJS 8.x版本
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

安装Linux开发工具包以及确认安装NodeJS成功
```
sudo apt-get install -y build-essential
node --version
```

### Mac OS 安装
1. 输入`brew -v`查看是否安装了homebrew，如果正确显示版本号，说明已经安装homebrew。如果没安装，输入以下命令安装
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. 通过homebrew安装NodeJS
```
brew uninstall node
brew install node
```

## 运行Demo

1. 将npm源改为taobao源
```
npm config set registry=https://registry.npm.taobao.org
```

2. 进入工程目录，安装项目依赖包。最后编译`node-rdkafka`会比较慢，请耐心等待命令退出。
```
npm install
```

3. 配置服务器授权
打开server/config.js，修改appId和appSecrect字段
```
{
  appId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',      // 在IntoYun开发者平台申请的服务器授权ID。（修改为自己的服务器授权ID）
  appSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',  // 授权密钥。（修改为自己的服务器授权密钥）
  version: 'v1',                                  // IntoYun提供的企业API接口版本，详细参考官网文档说明。默认为v1
  proxy: 'https://enterprise.intoyun.com',        // IntoYun企业API接口地址
  brokers: 'dps.intoyun.com:9092',                // IntoYun实时数据服务器
  sasl_enable: true                               // sasl参数，默认true。不需要修改。
}
```

4. 启动服务
```
npm start
```

5. [访问http://localhost:3000](http://localhost:3000)
