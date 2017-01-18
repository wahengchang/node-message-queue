# Message queue 1 - helloworld

### Run

##### Worker - listening to the event

```
$ ndoe worker
// [*] Waiting for messages in hello. To exit press CTRL+C
```

##### Provider - adding jobs to worker
```
$ ndoe provider
//  [x] Sent 'Hello World!'
```

### Understanding
#### acknowledgments (ack)
  - _**Never lost**_
  - _**An ack (acknowledgments)** is sent back from the **consumer** to tell RabbitMQ that a particular message has been received, processed and that RabbitMQ is free to delete it._
  - _If a consumer dies (its channel is closed, connection is closed, or TCP connection is lost) without sending an ack, **RabbitMQ will understand that a message wasn't processed fully and will re-queue it.** If there are other consumers online at the same time, it will then quickly redeliver it to another consumer._
  - _turn on ack: **{noAck: false}**_

**To monitor acknowledgments status**
```
$ sudo rabbitmqctl list_queues name messages_ready messages_unacknowledged

Listing queues ...
hello    0       0
...done.
```

#### durability
 - When RabbitMQ **quits or crashes**
 - Two things are required to make sure that **messages aren't lost**: to mark both the _**queue**_ and _**messages**_ as durable.
 - _turn on durability: **{durable: true}**_


```
ch.assertQueue('hello', {durable: true});
```



#### prefetch
 - use the prefetch method with the _**value of 1**_
 - RabbitMQ _**not**_ to give more than _**one**_ message to a worker at a time.
 - until it has processed and acknowledged the previous one


```
ch.prefetch(1);
```

##### reject
default requeue

```
ch.reject(msg)
```


default non-requeue

```
ch.reject(msg,false)
```



##Note
  - _**ack**_ will acknowledge the message, which tells RabbitMQ that this message has been handled. 
 RabbitMQ will mark the message as acknowledged, and remove it from the queue permanently. (see https://www.rabbitmq.com/amqp-0-9-1-reference.html#basic.ack)

  - _**nack**_ is a "negative acknowledge" or "not acknowledged" - this tells RabbitMQ that the message was not handled properly. By default, **'nack' will put the message back in the queue** for later handling. 
  can also force the message to not requeue with 'nack'. (see https://www.rabbitmq.com/amqp-0-9-1-reference.html#basic.nack)

  - _**reject**_  is an explicit "not acknowledged" and do not requeue (by default). 
 RabbitMQ will drop the message from the queue entirely, as the message will not be processable in that queue. you can specify a 'requeue' parameter for reject, like nack. (see https://www.rabbitmq.com/amqp-0-9-1-reference.html#basic.reject)

  - The advantage of 'nack' over reject is that nack works with mutliple messages if you want it to. reject, i think, is for a single message.

