# Request Headers
Setting request headers is an important part of working with APIs.  Halchemy makes it easy to set the right headers for each request to your API.

The headers that are sent with your request come from:
1. The default headers that come out-of-the-box with halchemy
1. Headers specified in the `.halchemy` in your home directory
1. Headers specified in the `.halchemy` in your project's root directory
1. Headers passed to the constructor when creating an `Api` object
1. Headers set on the `Api` object after it is created
1. Headers set on the request itself

The headers are merged in the order listed above.  That is, if the same header is specified in more than one place, the value of the one lower down the list is used, otherwise it is added to the set of headers sent.  Numbers 1-5 set [default headers](/headers/default) and number 6 sets [per request headers](/headers/per_request).

::: info NOTE
The names of all headers managed by halchemy are case-insensitive.  That is, `Content-Type` is the same as `content-type`.  This is handled by halchemy, so you don't have to worry about the case of headers you specify.
:::
