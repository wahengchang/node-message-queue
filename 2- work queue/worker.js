var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue_2';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      // var secs = msg.content.toString().split('.').length - 1;
      var secs = 3;
      var _MESSAGE = msg.content.toString();
      if(_MESSAGE !== ''){
        console.log(" [x] Received %s", _MESSAGE);
        setTimeout(function() {
          console.log(" [x] Done");
          ch.ack(msg);
        }, secs * 1000);
      }
      else {
        console.log(' FAIL: empty string ....');
        ch.reject(msg, false)
      }
    }, {noAck: false});
  });
});