## XI. Logs
### Treat logs as event streams

*Logs* provide visibility into the behavior of a running app.  In server-based environments they are commonly written to a file on disk (a "logfile"); but this is only an output format.

Logs are the [stream](https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/) of aggregated, time-ordered events collected from the output streams of all running processes and backing services.  Logs in their raw form are typically a text format with one event per line (though backtraces from exceptions may span multiple lines).  Logs have no fixed beginning or end, but flow continuously as long as the app is operating.

**A twelve-factor app never concerns itself with routing or storage of its output stream.**  It should not attempt to write to or manage logfiles.  Instead, each running process writes its event stream, unbuffered, to `stdout`.  During local development, the developer will view this stream in the foreground of their terminal to observe the app's behavior.

In staging or production deploys, each process' stream will be captured by the execution environment, collated together with all other streams from the app, and routed to one or more final destinations for viewing and long-term archival.  These archival destinations are not visible to or configurable by the app, and instead are completely managed by the execution environment.  Open-source log routers (such as [Logplex](https://github.com/heroku/logplex) and [Fluentd](https://github.com/fluent/fluentd)) are available for this purpose.

The event stream for an app can be routed to a file, or watched via realtime tail in a terminal.  Most significantly, the stream can be sent to a log indexing and analysis system such as [Splunk](http://www.splunk.com/), or a general-purpose data warehousing system such as [Hadoop/Hive](http://hive.apache.org/).  These systems allow for great power and flexibility for introspecting an app's behavior over time, including:

* Finding specific events in the past.
* Large-scale graphing of trends (such as requests per minute).
* Active alerting according to user-defined heuristics (such as an alert when the quantity of errors per minute exceeds a certain threshold).
