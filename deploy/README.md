# 部署说明
## 部署mysql
docker run --restart always --name mysql -p 3306:3306 -e MYSQL_USER=homer -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=homer_data --network=host --log-driver json-file --log-opt max-size=10m --log-opt max-file=7 -d centos/mysql-56-centos7:latest

## 部署homer

- `mkdir -p /home/homer/config`
- `vi /home/homer/config/env`
```conf
ENV_DB_USER=homer
ENV_DB_PASSWORD=123456
ENV_DB_HOST=test-db.com
ENV_DB_PORT=3306
ENV_LISTEN_HOST=0.0.0.0
ENV_DB_BULK=1000
ENV_DB_TIMER=5
```
- `sh -x deploy.sh`

### 修改homer web访问端口
如修改为8080
```c
vim /var/tinet/homer/heplify-server.toml.m4
HEPAddr         = "LISTEN_HOST:LISTEN_PORT"
HEPTCPAddr      = "LISTEN_HOST:LISTEN_PORT"
HEPTLSAddr      = ""
ESAddr          = ""
ESDiscovery     = false
MQDriver        = ""
MQAddr          = ""
MQTopic         = ""
  omAddr        = ""
PromTargetIP    = ""
PromTargetName  = ""
HoraclifixStats = false
RTPAgentStats   = false
DBShema         = "homer5"
DBDriver        = "mysql"
DBAddr          = "DB_HOST:DB_PORT"
DBUser          = "DB_USER"
DBPass          = "DB_PASS"
DBDataTable     = "homer_data"
DBConfTable     = "homer_configuration"
DBTableSpace    = ""
DBBulk          = DB_BULK
DBTimer         = DB_TIMER
DBRotate        = false
DBPartLog       = "2h"
DBPartSip       = "1h"
DBPartQos       = "6h"
DBDropDays      = 0
DBDropOnStart   = false
Dedup           = false
DiscardMethod   = ["OPTIONS"]
DiscardProtoType= ["rtcp"]
AlegIDs         = []
LogDbg          = ""
LogLvl          = "info"
LogStd          = true
Config          = "/root/heplify-server.toml"
Version         = false
InsecurePort    = 58080
AdminPwd        = "test123"
SwaggerPath     = ""
UIPath          = "/homer-ui/"
DropTableDays   = DROP_TABLE_DAYS
EnableUI        = ENABLE_UI
```

修改deploy.sh

```c
cat deploy.sh
#!/bin/bash

function start_heplify_server_container()
{
    docker run --ulimit nofile=90000:90000 \
    --restart always  --name homer --network="host" \
    --env-file $CONFIG_ENV_FILE \
    --log-driver json-file --log-opt max-size=10m --log-opt max-file=7 \
    -v /var/tinet/homer/heplify-server.toml.m4:/root/heplify-server.toml.m4 \
    -d registry.cn-beijing.aliyuncs.com/tinet-hub/homer:$CONFIG_DOCKER_TAG
}

DEFAULT_ENV_FILE=/home/homer/config/env
DEFAULT_DOCKER_TAG=latest

START=$1
CONFIG_ENV_FILE=$2
CONFIG_DOCKER_TAG=$3

if [ "X$CONFIG_ENV_FILE" = "X" ];then
  if [ -f $DEFAULT_ENV_FILE ];then
    CONFIG_ENV_FILE=$DEFAULT_ENV_FILE
  else
    usage
    exit
  fi
fi

if [  "X$CONFIG_DOCKER_TAG" = "X" ];then
  CONFIG_DOCKER_TAG=$DEFAULT_DOCKER_TAG
fi

start_heplify_server_container
```
