CREATE TABLE data_orders_status_history (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    order_id UUID NOT NULL,
    status INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT data_orders_status_history_pk PRIMARY KEY (id),
    CONSTRAINT data_orders_status_history_fk FOREIGN KEY (order_id) REFERENCES data_orders(id) ON DELETE RESTRICT,
    CONSTRAINT data_orders_status_history_status_fk FOREIGN KEY (status) REFERENCES core_order_status(id) ON DELETE CASCADE
);

-- insert existing orders into history table
INSERT INTO data_orders_status_history (order_id, status, created_at)
SELECT id, status, created_at FROM data_orders;


-- create trigger function to insert order status change into history table
CREATE FUNCTION data_orders_status_history_trigger() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO data_orders_status_history (order_id, status) VALUES (NEW.id, NEW.status);
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER data_orders_status_history_trigger
AFTER INSERT OR UPDATE OF status ON data_orders
FOR EACH ROW
EXECUTE FUNCTION data_orders_status_history_trigger();