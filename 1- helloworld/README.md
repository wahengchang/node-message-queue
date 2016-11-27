#Message queue 1 - helloworld

##Run

Worker - listening to the event
```
$ ndoe worker
// [*] Waiting for messages in hello. To exit press CTRL+C
```

Provider - adding jobs to worker
```
$ ndoe provider
//  [x] Sent 'Hello World!'
```

Understanding
##config
 - *To create a channel*
 - _**var q = 'hello';** declare a queue for us to send to; then we can publish a message to the queue_
```
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});

    //.... do something
  });
});
```

##consume
 - _a callback that will be executed when RabbitMQ pushes messages to our consumer. This is what Channel.consume does._
```
ch.consume(q, function(msg) {
  console.log(" [x] Received %s", msg.content.toString());
}, {noAck: true});
```

- **ch.consume()** matches up with the queue that **ch.sendToQueue()** publishes to.
```
ch.sendToQueue(q, new Buffer('Hello World!'));

```



