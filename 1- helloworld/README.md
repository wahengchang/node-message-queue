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