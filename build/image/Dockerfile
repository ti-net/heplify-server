FROM registry.cn-beijing.aliyuncs.com/tinet-hub/homer:latest-base as builder

LABEL maintainer="zhouxq@ti-net.com.cn"

RUN set -ex \
  && apk add --update git bash\
  && rm -rf /var/cache/apk/*

ENV BUILD_ROOT=/go/src/github.com/sipcapture/heplify-server/
COPY . ${BUILD_ROOT} 

RUN cd ${BUILD_ROOT} \
  && go version \
  && cd ${BUILD_ROOT}/cmd/heplify-server \
  && CGO_ENABLED=0 GOOS=linux go build  -v  -a -ldflags '-s -w' -installsuffix cgo -o  /go/bin/heplify-server 

FROM alpine:latest
LABEL maintainer="zhouxq@ti-net.com.cn"

RUN apk --no-cache add ca-certificates tzdata m4 bash

WORKDIR /root/

ENV TZ=Asia/Shanghai 

COPY --from=builder /go/bin/heplify-server .
COPY build/image/files/entrypoint.sh /entrypoint.sh
COPY ui/homer-ui /homer-ui
COPY build/image/files/heplify-server.toml.m4 /root/heplify-server.toml.m4

RUN chmod 744 /root/heplify-server.toml.m4 \
  && chmod a+rx /entrypoint.sh

EXPOSE 9060

CMD ["/entrypoint.sh"]