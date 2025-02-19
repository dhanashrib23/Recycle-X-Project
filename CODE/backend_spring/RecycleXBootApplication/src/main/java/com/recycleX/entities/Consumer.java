package com.recycleX.entities;

import java.sql.Timestamp;

public class Consumer {

    private Integer consumerId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String password;
    private String state;
    private String city;
    private String imageName;
    private String pincode;
    private String consumerType;
    private String consumerStatus;
    private Timestamp registeredAt;
    private Timestamp lastModifiedAt;

	public Consumer(Integer consumerId, String firstName, String lastName, String email, String mobileNumber,
			String password, String state, String city, String imageName, String pincode, String consumerType,
			String consumerStatus, Timestamp registeredAt, Timestamp lastModifiedAt) {
		this.consumerId = consumerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.password = password;
		this.state = state;
		this.city = city;
		this.imageName = imageName;
		this.pincode = pincode;
		this.consumerType = consumerType;
		this.consumerStatus = consumerStatus;
		this.registeredAt = registeredAt;
		this.lastModifiedAt = lastModifiedAt;
	}

	public Integer getConsumerId() {
		return consumerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
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

	public String getConsumerType() {
		return consumerType;
	}

	public String getConsumerStatus() {
		return consumerStatus;
	}

	public Timestamp getRegisteredAt() {
		return registeredAt;
	}

	public Timestamp getLastModifiedAt() {
		return lastModifiedAt;
	}

	public void setConsumerId(Integer consumerId) {
		this.consumerId = consumerId;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public void setConsumerType(String consumerType) {
		this.consumerType = consumerType;
	}

	public void setConsumerStatus(String consumerStatus) {
		this.consumerStatus = consumerStatus;
	}

	public void setRegisteredAt(Timestamp registeredAt) {
		this.registeredAt = registeredAt;
	}

	public void setLastModifiedAt(Timestamp lastModifiedAt) {
		this.lastModifiedAt = lastModifiedAt;
	}

	@Override
	public String toString() {
		return "Consumer [consumerId=" + consumerId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", mobileNumber=" + mobileNumber + ", password=" + password + ", state=" + state + ", city="
				+ city + ", imageName=" + imageName + ", pincode=" + pincode + ", consumerType=" + consumerType
				+ ", consumerStatus=" + consumerStatus + ", registeredAt=" + registeredAt + ", lastModifiedAt="
				+ lastModifiedAt + "]";
	}
        
}
