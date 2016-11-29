#Message queue 3 - imagesDownload

##Run

Worker - listening to the event
```
$ ndoe worker
// [x] Received http://abc.com/abc.jpg
// [x] Done
 ```

Provider - adding jobs to worker
```
$ ndoe provider http://abc.com/abc.jpg
//  [x] Sent 'http://abc.com/abc.jpg'
```


