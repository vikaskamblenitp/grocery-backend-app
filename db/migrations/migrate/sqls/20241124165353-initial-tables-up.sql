-- USERS

-- core table for roles
CREATE TABLE core_roles (
    id INT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    label VARCHAR(20) NOT NULL
);

-- seed core status
INSERT INTO core_roles (id, code, label) VALUES (1, 'ADMIN', 'Admin'), (2, 'USER', 'User');

-- create table for users
CREATE TABLE "data_users" (
    "id" UUID DEFAULT gen_random_uuid() NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" INT NOT NULL,
    "profile_url" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_users_pk" PRIMARY KEY ("id"),
    CONSTRAINT "data_users_email_unique_key" UNIQUE ("email"),
    CONSTRAINT "data_users_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "core_roles"("id")
);

-- create indexes for data_users table
CREATE INDEX "data_users_email_idx" ON "data_users"("email");

-- seed admin entry
INSERT INTO data_users (id, first_name, last_name, email, password, role_id)
    VALUES ('9f0cda5a-9f9b-47db-9b7d-d1421448deb5'::uuid, 'Vikas', 'Kamble', 'vikasmkamble007@gmail.com', '$2a$12$cc1WogFaQY.cPXCp4.7dPuZ7x1GwIROpnry0of5OhPw5pN0X/d7QK', 1);

--- GROCERY ITEMS

-- create item status enum
CREATE TYPE item_status AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED', 'OUT_OF_STOCK');

--  create grocery items table
CREATE TABLE data_items (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    status item_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT data_items_pk PRIMARY KEY (id)
);

-- create indexes for data_items
CREATE INDEX "data_items_name_idx" ON "data_items"("name");
CREATE INDEX "data_items_price_idx" ON "data_items"("price");

-- create table for grocery items status history
CREATE TABLE data_items_status_history (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    item_id UUID NOT NULL,
    status item_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT data_items_status_history_pk PRIMARY KEY (id),
    CONSTRAINT data_items_fk FOREIGN KEY (item_id) REFERENCES data_items(id)
);

-- ORDERS

-- create core order status table
CREATE TABLE core_order_status (
    id INT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    label VARCHAR(20) NOT NULL
);

INSERT INTO core_order_status (id, code, label) VALUES 
    (1, 'PENDING', 'Pending'), 
    (2, 'CONFIRMED', 'Confirmed'), 
    (3, 'DELIVERED', 'Delivered'), 
    (4, 'CANCELLED', 'Cancelled'), 
    (5, 'FAILED', 'Failed');

-- create orders table
CREATE TABLE data_orders (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    item_quantity INT NOT NULL,
    status INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT data_orders_pk PRIMARY KEY (id),
    CONSTRAINT data_orders_user_fk FOREIGN KEY (user_id) REFERENCES data_users(id),
    CONSTRAINT order_status_fk FOREIGN KEY (status) REFERENCES core_order_status(id)
);

-- create indexes for data_orders
CREATE INDEX "data_orders_user_id_idx" ON "data_orders"("user_id"); -- may be it is not that much required

CREATE TABLE data_order_items (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    order_id UUID NOT NULL,
    item_id UUID NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT data_order_items_pk PRIMARY KEY (id),
    CONSTRAINT data_order_fk FOREIGN KEY (order_id) REFERENCES data_orders(id),
    CONSTRAINT data_items_fk FOREIGN KEY (item_id) REFERENCES data_items(id)
);