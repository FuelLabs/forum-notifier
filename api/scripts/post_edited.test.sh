#!/bin/bash
source test_endpoint.sh

sample_data_path="../example-events/post-edited.json"
forum_event_type="post"
forum_event_case="post_edited" 

test_endpoint "$sample_data_path" "$forum_event_type" "$forum_event_case"

