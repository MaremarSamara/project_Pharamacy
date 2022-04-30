
create table pharmacy(idpharmacy serial primary key, slug varchar(150)unique not null, pharmacyName varchar(45)not null, pharmacyNum varchar(45)not null, pharmacyLocation varchar(45) not null);

create table drugs(idpharmaceutical serial primary key, slug varchar(150)unique not null, pharmaceuticalName varchar(45) unique not null, pharmaceuticalType varchar(45), pharmacyid bigint references pharmacy(idpharmacy)on delete set null, quantity int not null, price int not null);

