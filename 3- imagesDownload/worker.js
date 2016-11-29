var amqp = require('amqplib/callback_api');

var downloadAPI = require('download-url');
var path = './'
 


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

        console.log(" [x] Received %s", _MESSAGE);

        downloadAPI(_MESSAGE).setPath(path).start().then(function(result){
          console.log(" [x] Done");
          ch.ack(msg);
        },function(err){
          console.log(" [x] Error", err);
          ch.ack(msg);
        })

    }, {noAck: false});
  });
});