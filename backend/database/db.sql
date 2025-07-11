CREATE TABLE rol (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO rol (id, name) VALUES (1, 'admin');
INSERT INTO rol (id, name) VALUES (2, 'user');


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL ,
    id_rol INTEGER NOT NULL,
    create_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ,
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES rol(id)

);

INSERT INTO  users (name, email, password, id_rol) VALUES ('admin', 'admin@gmail.com','1111','1');
INSERT INTO  users (name, email, password, id_rol) VALUES ('tavo', 'tavo@gmail.com','1234','2');
INSERT INTO  users (name, email, password, id_rol) VALUES ('test', 'test@gmail.com','2457','2');

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO categories (id,name) VALUES(1,'Electronico');
INSERT INTO categories (id,name) VALUES(2,'Hogar');
INSERT INTO categories (id,name) VALUES(3,'Ropa');
INSERT INTO categories (id,name) VALUES(4,'Deporte');
INSERT INTO categories (id,name) VALUES(5,'Accesorios');

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL ,
    image VARCHAR(155) NOT NULL ,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    id_categorie INTEGER NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (id_categorie) REFERENCES categories(id)

);

INSERT INTO products (name, image, description, price, id_categorie) VALUES ('TV Samsung 80"','imgnnnnn', 'lorem ipsum ....', 8000000,1);
INSERT INTO products (name, image, description, price, id_categorie) VALUES ('laptop lenovo','imgnnnnn2', 'lorem ipsum ....', 3000000,1);


CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    id_product INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES products(id),
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id)
);

INSERT INTO cart (id_product,id_user,quantity) VALUES (31,73,30000);