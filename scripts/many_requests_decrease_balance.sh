#!/bin/bash

URL="http://localhost:8080/user/1/balance/decrease"
TOTAL=10000
PARALLEL=100  # сколько одновременно (батчами)

# Очистим временные файлы
rm -f results.txt

touch results.txt

# Запускаем запросы батчами
for ((i=1; i<=TOTAL; i++)); do
  (
    code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL" \
      -H "Content-Type: application/json" \
      -d '{"amount":2}')
    echo "$code" >> results.txt
  ) &

  # ограничим количество параллельных запросов
  if (( i % PARALLEL == 0 )); then
    wait
  fi
done

# Ждём завершения всех запросов
wait

# Подсчёт
echo "Статусы:"
grep -c "^2" results.txt | xargs -I{} echo "2xx: {}"
grep -c "^4" results.txt | xargs -I{} echo "4xx: {}"
grep -c "^5" results.txt | xargs -I{} echo "5xx: {}"

# Удаляем временный файл
rm -f results.txt
