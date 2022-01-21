## VI. Processes
### Execute the app as one or more stateless processes

The app is executed in the execution environment as one or more *processes*.

In the simplest case, the code is a stand-alone script, the execution environment is a developer's local laptop with an installed language runtime, and the process is launched via the command line (for example, `python my_script.py`).  On the other end of the spectrum, a production deploy of a sophisticated app may use many [process types, instantiated into zero or more running processes](./concurrency).

**Twelve-factor processes are stateless and [share-nothing](http://en.wikipedia.org/wiki/Shared_nothing_architecture).**  Any data that needs to persist must be stored in a stateful [backing service](./backing-services), typically a database.

The memory space or filesystem of the process can be used as a brief, single-transaction cache.  For example, downloading a large file, operating on it, and storing the results of the operation in the database.  The twelve-factor app never assumes that anything cached in memory or on disk will be available on a future request or job -- with many processes of each type running, chances are high that a future request will be served by a different process.  Even when running only one process, a restart (triggered by code deploy, config change, or the execution environment relocating the process to a different physical location) will usually wipe out all local (e.g., memory and filesystem) state.

Asset packagers like [django-assetpackager](http://code.google.com/p/django-assetpackager/) use the filesystem as a cache for compiled assets.  A twelve-factor app prefers to do this compiling during the [build stage](/build-release-run). Asset packagers such as [Jammit](http://documentcloud.github.com/jammit/) and the [Rails asset pipeline](http://ryanbigg.com/guides/asset_pipeline.html) can be configured to package assets during the build stage.

Some web systems rely on ["sticky sessions"](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29#Persistence) -- that is, caching user session data in memory of the app's process and expecting future requests from the same visitor to be routed to the same process.  Sticky sessions are a violation of twelve-factor and should never be used or relied upon.  Session state data is a good candidate for a datastore that offers time-expiration, such as [Memcached](http://memcached.org/) or [Redis](http://redis.io/).
