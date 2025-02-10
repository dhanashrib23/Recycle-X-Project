package com.recycleX.daos;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.recycleX.entities.*;
import com.recycleX.interfaces.ConsumerDaoable;
import com.recycleX.mapper.consumer.*;
import com.recycleX.models.consumer.*;
import com.recycleX.services.FileUploadUtils;

@Repository
public class ConsumerDaoImpl implements ConsumerDaoable {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ConsumerRowMapper mapper;

	@Autowired
	private ConsumerOrderRowMapper orderRowMapper;

	@Autowired
	private ConsumerOrderItemRowMapper itemRowMapper;
	
	@Autowired
	private ConsumerRecyclingSummaryRowMapper summaryRowMapper;
	@Override
	public List<Consumer> findAllConsumers() {
		String sql = "SELECT consumer_id, first_name, last_name, email, mobile_number, password, state, city, imageName, pincode, consumer_type, consumer_status, registered_at, last_modified_at FROM consumer WHERE consumer_status ='Active'";
		return jdbcTemplate.query(sql, mapper);
	}

	@Override
	public Consumer findConsumerById(int id) {
		String sql = "SELECT consumer_id, first_name, last_name, email, mobile_number, password, state, city, imageName, pincode, consumer_type, consumer_status, registered_at, last_modified_at "
				+ "FROM consumer WHERE consumer_id = ? AND consumer_status ='Active'";
		return jdbcTemplate.queryForObject(sql, mapper, id);
	}

	@Override
	public int delete(int id) {
		String sql = "UPDATE consumer SET consumer_status = 'InActive' WHERE consumer_id = ? ";
		return jdbcTemplate.update(sql, id);
	}

	@Override
	public List<ConsumerOrder> findAllOrders(int consumerId) {
		String sql = "SELECT * FROM consumerorders_v WHERE consumer_id = ?";
		return jdbcTemplate.query(sql, orderRowMapper, consumerId);
	}

	@Override
	public List<ConsumerOrderItem> findOrderItemsByOrderId(int orderId) {
		String sql = "SELECT coi.subcategory_id, ts.subcategory_name, coi.quantity_kg, ts.image_name "
				+ "FROM consumerorderitems_v coi "
				+ "JOIN trashsubcategories_v ts ON coi.subcategory_id = ts.subcategory_id " + "WHERE coi.order_id = ?";
		return jdbcTemplate.query(sql, itemRowMapper, orderId);
	}

	@Override
	public int modifyOrderStatus(int orderId, String status) {
		String sql = "UPDATE consumerorders_v SET order_status = ? WHERE order_id = ? AND order_status = 'pending'";
		return jdbcTemplate.update(sql, status, orderId);
	}

	@Override
	public int modifyPriceBySubcategoryId(int subcategoryId, double price) {
		String sql = "UPDATE recyclingsubcategories_v SET price_per_kg = ? WHERE subcategory_id = ?";
		return jdbcTemplate.update(sql, price, subcategoryId);
	}

	@Override
	public int saveRecyclingCategory(RecyclingCategory recyclingCategory) {
		try {
			String imageName = FileUploadUtils.saveImage(recyclingCategory.getCategoryImage(),
					"/src/main/resources/consumerImages/categories/");
			
			String sql = "INSERT INTO recyclingcategories_v (rp_category_name, category_description, rp_category_image) VALUES (?, ?, ?)";

			return jdbcTemplate.update(sql, recyclingCategory.getCategoryName(),
					recyclingCategory.getCategoryDescription(), imageName);
		} catch (IOException e) {
			e.printStackTrace();
			return -1;
		}

	}

	@Override
	public int saveRecyclingSubCategory(RecyclingSubCategory recyclingSubcategory) {
        try {
            String imageName = FileUploadUtils.saveImage(
                    recyclingSubcategory.getSubcategoryImage(), 
                    "/src/main/resources/consumerImages/subcategories/"
            );

            String sql = "INSERT INTO recyclingsubcategories_v (rp_category_id, subcategory_name, price_per_kg, subcategory_image) VALUES (?, ?, ?, ?)";

            return jdbcTemplate.update(sql, 
                    recyclingSubcategory.getCategoryId(), 
                    recyclingSubcategory.getSubcategoryName(), 
                    recyclingSubcategory.getPricePerKg(), 
                    imageName);
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }
	}

	@Override
    public List<ConsumerRecyclingSummary> findMonthlyRecyclingSummary(int consumerId) {
        String sql = "SELECT rc.category_id, rc.category_name, SUM(coi.quantity_kg) AS total_quantity_kg, "
                + "DATE_FORMAT(co.order_date, '%Y-%m') AS period "
                + "FROM consumerorderitems_v coi "
                + "JOIN consumerorders_v co ON coi.order_id = co.order_id "
                + "JOIN recyclingsubcategories_v rs ON coi.subcategory_id = rs.subcategory_id "
                + "JOIN recyclingcategories_v rc ON rs.category_id = rc.category_id "
                + "WHERE co.consumer_id = ? AND co.order_status = 'completed' "
                + "GROUP BY rc.category_id, rc.category_name, period "
                + "ORDER BY period DESC";

        return jdbcTemplate.query(sql, summaryRowMapper, consumerId);
    }

    @Override
    public List<ConsumerRecyclingSummary> findYearlyRecyclingSummary(int consumerId) {
        String sql = "SELECT rc.category_id, rc.category_name, SUM(coi.quantity_kg) AS total_quantity_kg, "
                + "YEAR(co.order_date) AS period "
                + "FROM consumerorderitems_v coi "
                + "JOIN consumerorders_v co ON coi.order_id = co.order_id "
                + "JOIN recyclingsubcategories_v rs ON coi.subcategory_id = rs.subcategory_id "
                + "JOIN recyclingcategories_v rc ON rs.category_id = rc.category_id "
                + "WHERE co.consumer_id = ? AND co.order_status = 'completed' "
                + "GROUP BY rc.category_id, rc.category_name, period "
                + "ORDER BY period DESC";

        return jdbcTemplate.query(sql, summaryRowMapper, consumerId);
    }

    @Override
    public List<ConsumerRecyclingSummary> findMonthlyRecyclingSummaryForAll() {
        String sql = "SELECT rc.category_id, rc.category_name, SUM(coi.quantity_kg) AS total_quantity_kg, "
                + "DATE_FORMAT(co.order_date, '%Y-%m') AS period "
                + "FROM consumerorderitems_v coi "
                + "JOIN consumerorders_v co ON coi.order_id = co.order_id "
                + "JOIN recyclingsubcategories_v rs ON coi.subcategory_id = rs.subcategory_id "
                + "JOIN recyclingcategories_v rc ON rs.category_id = rc.category_id "
                + "WHERE co.order_status = 'completed' "
                + "GROUP BY rc.category_id, rc.category_name, period "
                + "ORDER BY period DESC";

        return jdbcTemplate.query(sql, summaryRowMapper);
    }

    @Override
    public List<ConsumerRecyclingSummary> findYearlyRecyclingSummaryForAll() {
        String sql = "SELECT rc.category_id, rc.category_name, SUM(coi.quantity_kg) AS total_quantity_kg, "
                + "YEAR(co.order_date) AS period "
                + "FROM consumerorderitems_v coi "
                + "JOIN consumerorders_v co ON coi.order_id = co.order_id "
                + "JOIN recyclingsubcategories_v rs ON coi.subcategory_id = rs.subcategory_id "
                + "JOIN recyclingcategories_v rc ON rs.category_id = rc.category_id "
                + "WHERE co.order_status = 'completed' "
                + "GROUP BY rc.category_id, rc.category_name, period "
                + "ORDER BY period DESC";

        return jdbcTemplate.query(sql, summaryRowMapper);
    }
	

}
