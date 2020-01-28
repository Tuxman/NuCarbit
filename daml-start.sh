daml sandbox --wall-clock-time --ledgerid o_beer ./.daml/dist/o_beer-1.0.0.dar & sleep 10s &&
daml json-api --ledger-host localhost --ledger-port 6865 \
    --http-port 7575 --max-inbound-message-size 4194304 --package-reload-interval 5s \
    --application-id HTTP-JSON-API-Gateway \
    --query-store-jdbc-config "driver=org.postgresql.Driver,url=jdbc:postgresql://localhost:5432/test?&ssl=true,user=postgres,password=password,createSchema=false"