package com.recycleX.mapper.consumer;

import com.recycleX.models.consumer.ConsumerOrder;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ConsumerOrderRowMapper implements RowMapper<ConsumerOrder> {
	@Override
	public ConsumerOrder mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new ConsumerOrder(rs.getInt("order_id"), rs.getInt("consumer_id"), rs.getString("order_date"),
				rs.getString("order_time"), rs.getInt("delivery_id"), rs.getString("order_status"));
	}
}
