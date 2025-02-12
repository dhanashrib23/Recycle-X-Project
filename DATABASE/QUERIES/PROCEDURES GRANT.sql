-- Stored Procedure for Granting Database Access
DELIMITER //

CREATE PROCEDURE GrantDBAccess(
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    -- Declare all variables first
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_view_name VARCHAR(255);
    
    -- Declare cursor
    DECLARE view_cursor CURSOR FOR 
        SELECT table_name 
        FROM information_schema.views 
        WHERE table_schema = 'recycle_x' 
        AND table_name LIKE '%_v';
    
    -- Declare continue handler
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Create new user if not exists
    SET @create_user = CONCAT(
        'CREATE USER IF NOT EXISTS ''', 
        p_username, 
        '''@''%'' IDENTIFIED BY ''',
        p_password,
        ''''
    );
    PREPARE stmt FROM @create_user;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    -- Open cursor
    OPEN view_cursor;
    
    -- Loop through all views
    grant_loop: LOOP
        FETCH view_cursor INTO v_view_name;
        
        IF done THEN
            LEAVE grant_loop;
        END IF;
        
        -- Prepare and execute GRANT statement
        SET @sql = CONCAT('GRANT ALL PRIVILEGES ON recycle_x.', 
                         v_view_name, 
                         ' TO ', 
                         p_username,
                         '@\'%\'');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;
    
    -- Close cursor
    CLOSE view_cursor;
    
    -- Flush privileges
    FLUSH PRIVILEGES;
    
END;
//

DELIMITER ;