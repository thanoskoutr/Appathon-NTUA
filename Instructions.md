# Instructions

## MySQL Create Database
### Load SQL DDL file
Creates the database and the Movies table:
```
mysql -u root -p < ~/Documents/Internet-and-Applications_8th-semester/database/Movies.sql  
```

### Import CSV data and fix NULL fields (ignoring *Count* and *Type* field)
```
mysql -u root -p appathon < ~/Documents/Internet-and-Applications_8th-semester/database/ImportCSV.sql  
```

## Check Import
```
mysql -u root -p Movies
```

### See records
```
select * from Movies\G
```

### See records with limit
```
select * from Movies LIMIT 100\G
```

### Show warnings
```
show warnings\G
```

## MySQL Export Database
### Export database as mysqldump
cd in github project and create mysqldump of the database:
```
cd Appathon-NTUA
```
```
mysqldump -u root -p appathon > ./database/appathon_dump.sql
```

## MySQL Import Database
### Load SQL DDL file
cd in Github project:
```
cd Appathon-NTUA
```
Creates the database and the Movies table:
```
mysql -u root -p < ./database/Movies.sql
```
Enter root password

### Import database from mysqldump
```
mysql -u root -p appathon_03116073 < ./database/appathon_dump.sql
```
Enter root password
