package com.recycleX.mapper.consumer;

import com.recycleX.models.consumer.ConsumerRecyclingSummary;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ConsumerRecyclingSummaryRowMapper implements RowMapper<ConsumerRecyclingSummary> {
	@Override
	public ConsumerRecyclingSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new ConsumerRecyclingSummary(rs.getInt("category_id"), rs.getString("category_name"),
				rs.getDouble("total_quantity_kg"), rs.getString("period"));
	}
}
