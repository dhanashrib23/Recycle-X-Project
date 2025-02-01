package com.recycleX.mapper.consumer;

import com.recycleX.models.consumer.ConsumerOrderItem;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ConsumerOrderItemRowMapper implements RowMapper<ConsumerOrderItem> {
	@Override
	public ConsumerOrderItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new ConsumerOrderItem(rs.getInt("subcategory_id"), rs.getString("subcategory_name"),
				rs.getInt("quantity_kg"), rs.getString("image_name"));
	}
}
