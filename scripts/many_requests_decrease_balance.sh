for i in {1..10000}; do
  curl -X POST http://localhost:8080/user/1/balance/decrease \
    -H "Content-Type: application/json" \
    -d '{"amount":2}' &
done
