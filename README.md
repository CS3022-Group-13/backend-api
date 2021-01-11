# Introduction
Engage Industrial Management System\
Backend REST API\
`Version` `0.0.1`

# Environment Variables

## Template
```yaml
NODE_ENV=development
PORT=8000
VERSION=0.0.1

PG_HOST=
PG_PORT=5432
PG_DB=eims
PG_USER=eims_user
PG_PASS=eims_user

SALT_ROUNDS=10

JWT_SECRET_ACCESS=
JWT_SECRET_REFRESH=
JWT_EXP_TIME_ACCESS=
JWT_EXP_TIME_REFRESH=
```

## Notes
Use following data if you hope to connect shared postgres database,\
```yaml
HOST      : ec2-100-25-45-111.compute-1.amazonaws.com
PORT      : 5432
DATABASE  : eims
USERNAME  : eims_user
PASSWORD  : eims_user
```

# API end-points

`GET` `/api`

## User Module

`POST` `/api/user/login`
`POST` `/api/user/login`
`POST` `/api/user/regiser`

