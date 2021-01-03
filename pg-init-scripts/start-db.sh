#!/bin/bash
set -e
set -u

db="productium";

function create_database() {
	local database=$1
	local role=$POSTGRES_USER
	echo "  Creating database '$database'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE DATABASE $database;
	    GRANT ALL PRIVILEGES ON DATABASE $database TO $role;
EOSQL
}

if psql -lqt | cut -d \| -f 1 | grep -qw $db; then
  echo "'$db' database exists"
else
  create_database $db
fi