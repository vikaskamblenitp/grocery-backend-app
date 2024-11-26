DROP TRIGGER IF EXISTS update_data_users_updated_at ON data_users;

DROP TRIGGER IF EXISTS update_data_items_updated_at ON data_items;

DROP TRIGGER IF EXISTS update_data_orders_updated_at ON data_orders;

DROP TRIGGER IF EXISTS update_items_status_trigger ON data_items;

DROP FUNCTION IF EXISTS update_items_status;

DROP TRIGGER IF EXISTS data_items_status_history_trigger ON data_items;

DROP FUNCTION IF EXISTS data_items_status_history;