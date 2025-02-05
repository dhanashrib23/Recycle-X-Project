package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.*;

public interface AdminDaoable {
	public Admin findAdminByEmail(String email);

	public int save(Admin admin);

	public int update(int adminId, Admin admin);
	
	public List<Admin> findAllAdmins();
	
	public int delete(int adminId);

	public int saveServiceZone(ServiceZone zone);

	public int removeServiceZone(int pincode);

	public int modifyService(int pincode, ServiceZone zone);

	public List<ServiceZone> findAllServiceZone();
}