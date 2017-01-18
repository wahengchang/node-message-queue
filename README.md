#node-message-queue

####Useful tool
_**RabbitMQ monitor UI**_
```
$ rabbitmq-plugins  enable rabbitmq_management

//rabbitmqctl reset

//open url below on browser
//http://localhost:15672
//default user/password
//guest/guest
```


####Monitor acknowledgments status
```
$ rabbitmqctl list_queues name messages_ready messages_unacknowledged
```