ALTER TABLE data_items
    DROP CONSTRAINT IF EXISTS data_items_price_check,
    DROP CONSTRAINT IF EXISTS data_items_quantity_check;

ALTER TABLE data_order_items
    DROP CONSTRAINT IF EXISTS data_order_items_quantity_check,
    DROP CONSTRAINT IF EXISTS data_order_items_price_check;

ALTER TABLE data_orders
    DROP CONSTRAINT IF EXISTS data_orders_total_price_check;