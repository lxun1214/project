package com.rt.log;

import java.util.HashMap;
import java.util.Map;

import com.dataeye.sdk.client.DCAgent;
import com.dataeye.sdk.client.domain.DCCoin;
import com.dataeye.sdk.client.domain.DCItem;
import com.dataeye.sdk.client.domain.DCLevelUp;
import com.dataeye.sdk.client.domain.DCTask;
import com.dataeye.sdk.client.domain.TaskType;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.AccountType;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCOnline;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCPay;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCRoleInfo;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.DCUserInfo;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.Gender;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.NetType;
import com.dataeye.sdk.proto.DCServerSync.DCMessage.PlatformType;

public class DCAgentTest {

	public final static void main(String[] args) {
		DCAgent.setBaseConf("测试服务器", "C:\\serversdk", 2, 3);
		DCAgent dcAgent = DCAgent.getInstance("88DA7A96325A40B919F8AD62DDCB7B4F");
		System.out.println("login start");
		dcAgent.act(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				(int) (System.currentTimeMillis() / 1000));
		dcAgent.reg(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				(int) (System.currentTimeMillis() / 1000));
		System.out.println("online start");
		dcAgent.online(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCOnline.newBuilder().setLoginTime((int) (System.currentTimeMillis() / 1000)).setOnlineTime(500)
						.setIsNewUser(false).build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		System.out.println("coinGain start");
		// DCAgent.coinGain(
		// DCUserInfo.newBuilder().setAccountId("test111")
		// .setPlatform(PlatformType.ADR)
		// .setAccountType(AccountType.QQ).setAge(25)
		// .setBrand("xiaomi").setChannel("渠道").setCountry("中国")
		// .setGameRegion("区服").setGender(Gender.FEMALE)
		// .setImei("imei").setIp("58.60.168.110")
		// .setLanguage("cn").setMac("mac")
		// .setNetType(NetType._2G).setOperators("电信")
		// .setOsVersion("4.1.1").setProvince("广东")
		// .setResolution("720*1080").build(),
		// DCCoin.newBuilder().coinNum(1000).coinType("coin")
		// .totalCoin(100000).type("coinGain").build(), DCRoleInfo
		// .newBuilder().setRoleId("roleId").setRoleClass("class")
		// .setRoleRace("race").setLevel(10).build());
		dcAgent.coinGain(DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR).build(),
				DCCoin.newBuilder().coinNum(1000).coinType("coin").totalCoin(100000).type("coinGain").build(),
				DCRoleInfo.newBuilder().setRoleId("").setRoleClass("").setRoleRace("").setLevel(10).build());
		System.out.println("coinLost start");
		dcAgent.coinLost(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCCoin.newBuilder().coinNum(10).coinType("coin").totalCoin(100).type("coinLost").build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		System.out.println("itemBuy start");
		dcAgent.itemBuy(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCItem.newBuilder().itemId("itemId").itemType("itemType").itemCnt(10).coinNum(1000).coinType("coin")
						.build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		System.out.println("itemGet start");
		dcAgent.itemGet(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCItem.newBuilder().itemId("itemId").itemType("itemType").itemCnt(10).reason("getreason").build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		System.out.println("itemUse start");
		dcAgent.itemUse(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCItem.newBuilder().itemId("itemId").itemType("itemType").itemCnt(10).reason("usereason").build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		Map<String, String> labelMap = new HashMap<String, String>();
		labelMap.put("key1", "value1");
		labelMap.put("key2", "value2");
		System.out.println("onEvent start");
		dcAgent.onEvent(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				"eventId", labelMap, 155, DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class")
						.setRoleRace("race").setLevel(10).build());
		System.out.println("pay start");
		dcAgent.pay(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCPay.newBuilder().setPayTime(1111111).setCurrencyAmountDouble(100.02).setCurrencyType("currencyType")
						.setIapid("iapid").setPayType("paytype").build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race")
						.setRoleName("RoleName").setLevel(10).build());
		System.out.println("taskComplete start");
		dcAgent.taskComplete(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCTask.newBuilder().taskId("taskId").duration(1111).taskType(TaskType.GuideLine).build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		System.out.println("taskFail start");
		dcAgent.taskFail(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCTask.newBuilder().taskId("taskId").duration(1111).taskType(TaskType.GuideLine)
						.failReason("failReason").build(),
				DCRoleInfo.newBuilder().setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(10)
						.build());
		System.out.println("levelUp start");
		dcAgent.levelUp(
				DCUserInfo.newBuilder().setAccountId("test111").setPlatform(PlatformType.ADR)
						.setAccountType(AccountType.QQ).setAge(25).setBrand("xiaomi").setChannel("渠道").setCountry("中国")
						.setGameRegion("区服").setGender(Gender.FEMALE).setImei("imei").setIp("58.60.168.110")
						.setLanguage("cn").setMac("mac").setNetType(NetType._2G).setOperators("电信")
						.setOsVersion("4.1.1").setProvince("广东").setResolution("720*1080").build(),
				DCLevelUp.newBuilder().startLevel(1).endLevel(2).spendTimeInLevel(600).build(), DCRoleInfo.newBuilder()
						.setRoleId("roleId").setRoleClass("class").setRoleRace("race").setLevel(2).build());

		try {
			Thread.sleep(60 * 1000L);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
