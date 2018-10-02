# Ranglin

## Testing
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"task": "sample/task1/get-version"}' \
  http://localhost:3000/request

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"task": "sample/task1/extended-data"}' \
  http://localhost:3000/request
  
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"task": "sample/task1/get-version"}' \
  http://localhost:3000/request

curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"taskPath": "sample/task1/"}' \
  http://localhost:3000/start-next-task

