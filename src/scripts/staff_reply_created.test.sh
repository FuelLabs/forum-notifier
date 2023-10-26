

#!/bin/bash
source test_endpoint.sh

sample_data_path="../example-events/staff-reply-created.json"
forum_event_type="post"
forum_event_case="post_created" 

test_endpoint "$sample_data_path" "$forum_event_type" "$forum_event_case"

