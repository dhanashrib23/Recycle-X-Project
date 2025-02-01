package com.recycleX.entities;

import java.sql.Timestamp;

public class Supplier {

	private Integer supplierId;
	private String firstName;
	private String lastName;
	private String mobileNumber;
	private String password;
	private String state;
	private String city;
	private String imageName;
	private String pincode;
	private String supplierType;
	private String supplierStatus;
	private Timestamp registeredAt;
	private Timestamp lastModifiedAt;

	public Supplier(Integer supplierId, String firstName, String lastName, String mobileNumber, String password,
			String state, String city, String imageName, String pincode, String supplierType, String supplierStatus,
			Timestamp registeredAt, Timestamp lastModifiedAt) {
		this.supplierId = supplierId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.password = password;
		this.state = state;
		this.city = city;
		this.imageName = imageName;
		this.pincode = pincode;
		this.supplierType = supplierType;
		this.supplierStatus = supplierStatus;
		this.registeredAt = registeredAt;
		this.lastModifiedAt = lastModifiedAt;
	}

	public Integer getSupplierId() {
		return supplierId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public String getPassword() {
		return password;
	}

	public String getState() {
		return state;
	}

	public String getCity() {
		return city;
	}

	public String getImageName() {
		return imageName;
	}

	public String getPincode() {
		return pincode;
	}

	public String getSupplierType() {
		return supplierType;
	}

	public String getSupplierStatus() {
		return supplierStatus;
	}

	public Timestamp getRegisteredAt() {
		return registeredAt;
	}

	public Timestamp getLastModifiedAt() {
		return lastModifiedAt;
	}

	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public void setSupplierType(String supplierType) {
		this.supplierType = supplierType;
	}

	public void setSupplierStatus(String supplierStatus) {
		this.supplierStatus = supplierStatus;
	}

	public void setRegisteredAt(Timestamp registeredAt) {
		this.registeredAt = registeredAt;
	}

	public void setLastModifiedAt(Timestamp lastModifiedAt) {
		this.lastModifiedAt = lastModifiedAt;
	}

	@Override
	public String toString() {
		return "Supplier [supplierId=" + supplierId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", mobileNumber=" + mobileNumber + ", password=" + password + ", state=" + state + ", city=" + city
				+ ", imageName=" + imageName + ", pincode=" + pincode + ", supplierType=" + supplierType
				+ ", supplierStatus=" + supplierStatus + ", registeredAt=" + registeredAt + ", lastModifiedAt="
				+ lastModifiedAt + "]";
	}

}
