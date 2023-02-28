docker build -t jefftian/alpha:"$1" .
docker images
docker run --network host -e CI=true -d -p 127.0.0.1:7001:7001 --name alpha:"$1"
jefftian/alpha
docker ps | grep -q alpha
docker ps -aqf "name=alpha$"
docker push jefftian/alpha:"$1"
docker logs $(docker ps -aqf name=alpha$)
curl localhost:7001 || docker logs $(docker ps -aqf name=alpha$)
docker kill alpha || echo "alpha killed"
docker rm alpha || echo "alpha removed"
