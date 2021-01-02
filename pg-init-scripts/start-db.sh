#!/bin/bash
set -e
set -u

SERVER="productiumdb";
DB="productium";

echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres