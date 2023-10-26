
source test_endpoint.sh

sample_data_path="../example-events/topic-closed.json"
forum_event_type="topic"
forum_event_case="topic_closed_status_updated" 

test_endpoint "$sample_data_path" "$forum_event_type" "$forum_event_case"