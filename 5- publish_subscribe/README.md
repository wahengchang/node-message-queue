#Publish/Subscribe
 - This pattern delivers(broadcast) a message to multiple consumers.
 - The producer can only send messages to an exchange. On one side it receives messages from producers and the other side it pushes them to queues. 
 - Exchange types: direct, topic, headers and fanout.

```
provider --> exchange -- job --> worker1 -> doSomeThing1()
                             --> worker2 -> doSomeThing2()
```


#Run
```
$ ndoe worker1
// [x]worker1 Hello World! 
```

```
$ ndoe worker2
// [x]worker2 Hello World!
```

##### Provider - adding jobs to worker
```
$ ndoe provider
// [x] Sent Hello World!
```