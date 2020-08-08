# Instructions

## MySQL

### Load SQL DDL file
```
mysql -u root -p appathon < ~/Documents/Internet-and-Applications_8th-semester/database/Movies.sql  
```

### Import CSV data and fix NULL fields (ignoring *Type* field)
```
mysql -u root -p appathon < ~/Documents/Internet-and-Applications_8th-semester/database/ImportCSV.sql  
```

### Open MySQL
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
