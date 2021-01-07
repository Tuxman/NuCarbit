## License
```
Copyright © 2020 Digital Asset (Switzerland) GmbH and/or its affiliates
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL 
DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## Contributions
We cannot accept external contributions to this repository (but can accept issues).
If you'd like to make changes to this project please create a fork of this repository.

## Prerequisites
- [Daml Connect](https://docs.daml.com/getting-started/installation.html)

## Building
1. `daml build`
1. `daml codegen js`
1. Refer to the [README.md in `/ui`](ui/README.md) to start the UI

## Running locally
1. `daml sandbox --wall-clock-time --ledgerid o_beer $(ls -t .daml/dist/* | head -n1)`
1. `daml json-api --ledger-host localhost --ledger-port 6865 \
    --http-port 7575 --max-inbound-message-size 4194304 --package-reload-interval 5s \
    --application-id HTTP-JSON-API-Gateway`