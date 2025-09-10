CREATE TABLE rol (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL ,
    id_rol INTEGER NOT NULL,
    create_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ,
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES rol(id) ON UPDATE CASCADE ON DELETE CASCADE,

);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL ,
    image VARCHAR(155) NOT NULL ,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    id_categorie INTEGER NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (id_categorie) REFERENCES categories(id)

);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    id_product INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO rol (id, name) VALUES (1, 'admin');
INSERT INTO rol (id, name) VALUES (2, 'user');

INSERT INTO  users (id, name, email, password, id_rol) VALUES ('1','admin', 'admin@gmail.com','1111','1');
INSERT INTO  users (id, name, email, password, id_rol) VALUES ('2','tavo', 'tavo@gmail.com','1234','2');
INSERT INTO  users (id, name, email, password, id_rol) VALUES ('3','test', 'test@gmail.com','2457','2');

INSERT INTO categories (id,name) VALUES(1,'Electronico');
INSERT INTO categories (id,name) VALUES(2,'Hogar');
INSERT INTO categories (id,name) VALUES(3,'Ropa');
INSERT INTO categories (id,name) VALUES(4,'Deporte');
INSERT INTO categories (id,name) VALUES(5,'Accesorios');

INSERT INTO products (id, name, image, description, price, id_categorie) VALUES ('1','TV Samsung 80"','imgnnnnn', 'lorem ipsum ....', 8000000,1);
INSERT INTO products (id, name, image, description, price, id_categorie) VALUES ('2','laptop lenovo','imgnnnnn2', 'lorem ipsum ....', 3000000,1);

INSERT INTO cart (id_product,id_user) VALUES (2,1);
