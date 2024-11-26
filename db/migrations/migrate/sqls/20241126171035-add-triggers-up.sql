-- create trigger function to insert order status change into history table
CREATE OR REPLACE FUNCTION data_items_status_history() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO data_items_status_history (item_id, status) VALUES (NEW.id, NEW.status);
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER data_items_status_history_trigger
AFTER INSERT OR UPDATE OF status ON data_items
FOR EACH ROW
EXECUTE FUNCTION data_items_status_history();

-- TODO: Resolve SQL Error [54001]: ERROR: stack depth limit exceeded
-- make item out of stock if quantity is 0
CREATE OR REPLACE FUNCTION update_items_status() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity = 0 AND NEW.status != 'OUT_OF_STOCK'
    THEN NEW.status := 'OUT_OF_STOCK';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_items_status_trigger
AFTER UPDATE OF quantity ON data_items
FOR EACH ROW
EXECUTE FUNCTION update_items_status();

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';


-- Triggers for updating updated_at column
CREATE TRIGGER update_data_orders_updated_at
    BEFORE UPDATE
    ON
    data_orders
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_data_items_updated_at
    BEFORE UPDATE
    ON
    data_items
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_data_users_updated_at
    BEFORE UPDATE
    ON
    data_users
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

-- add delete and update fk rules
ALTER TABLE data_users DROP CONSTRAINT data_users_role_id_fk;
ALTER TABLE data_users ADD CONSTRAINT data_users_role_id_fk FOREIGN KEY (role_id) REFERENCES core_roles(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE data_items_status_history DROP CONSTRAINT data_items_fk;
ALTER TABLE data_items_status_history ADD CONSTRAINT data_items_fk FOREIGN KEY (item_id) REFERENCES data_items(id) ON DELETE CASCADE ON UPDATE RESTRICT;

ALTER TABLE data_orders DROP CONSTRAINT data_orders_user_fk; 
ALTER TABLE data_orders ADD CONSTRAINT data_orders_user_fk FOREIGN KEY (user_id) REFERENCES data_users(id) ON DELETE CASCADE ON UPDATE RESTRICT;

ALTER TABLE data_orders DROP CONSTRAINT order_status_fk;
ALTER TABLE data_orders ADD CONSTRAINT order_status_fk FOREIGN KEY (status) REFERENCES core_order_status(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE data_order_items DROP CONSTRAINT data_order_fk;
ALTER TABLE data_order_items ADD CONSTRAINT data_order_fk FOREIGN KEY (order_id) REFERENCES data_orders(id) ON DELETE CASCADE ON UPDATE RESTRICT;

ALTER TABLE data_order_items DROP CONSTRAINT data_items_fk; 
ALTER TABLE data_order_items ADD CONSTRAINT data_items_fk FOREIGN KEY (item_id) REFERENCES data_items(id) ON DELETE CASCADE ON UPDATE RESTRICT;