--- Add price and quantity checks to the data_items and data_order_items tables
ALTER TABLE data_items
    ADD CONSTRAINT data_items_price_check CHECK (price > 0),
    ADD CONSTRAINT data_items_quantity_check CHECK (quantity >= 0);

ALTER TABLE data_order_items
    ADD CONSTRAINT data_order_items_quantity_check CHECK (quantity > 0),
    ADD CONSTRAINT data_order_items_price_check CHECK (price > 0);

ALTER TABLE data_orders
    ADD CONSTRAINT data_orders_total_price_check CHECK (total_price > 0);
