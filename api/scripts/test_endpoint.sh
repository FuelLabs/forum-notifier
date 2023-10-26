#!/bin/bash

# Define the function test_endpoint
test_endpoint() {
  local data_path=$1
  local endpoint_url="http://localhost:3000/api/"
  local event_type=$2
  local event=$3

  echo -e "\n\n_____________________________\n\n"  
  echo "testing $event for $data_path"
  echo -e "\n\n_____________________________\n\n"  


  # Send POST request with headers and request body, and print the response
  local response=$(curl -X POST -H "Content-Type: application/json" -H "x-discourse-event-type: $event_type" -H "X-Discourse-Event: $event" --data @"$data_path" "$endpoint_url")
  sleep 4
  echo "Response:"
  echo -e "\n\n_____________________________\n\n"  
  echo "$response"
  echo -e "\n\n_____________________________\n\n"  
}
