//npm install @mapbox/polyline --save
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import * as Location from "expo-location";
import fetchHistoryFromApi from "../../../api/fetchHistoryFromApi";
import PolylineDecoder from "@mapbox/polyline";
import getAddressFromCoords from "../../../utils/reverseGeocode";
import fonts from "../../../constants/fonts";
import locationData from "../../LocationHistory/LocationList/LocationHistoryData.jsx";

const DEFAULT_LOCATION = {
  latitude: 10.02994,
  longitude: 105.77074,
  address: "Đại học Cần Thơ, Xuân Khánh, Ninh Kiều, Cần Thơ",
};

const MapWithHistory = () => {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null); // Vị trí hiện tại
  const [historyLocations, setHistoryLocations] = useState([]); // Lịch sử vị trí
  const [routeCoords, setRouteCoords] = useState([]); // Tọa độ đường đi
  const [currentAddress, setCurrentAddress] = useState(""); // Địa chỉ hiện tại
  const [time, setTime] = useState(""); // Thời gian cập nhật
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let latitude, longitude;

      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        latitude = loc.coords.latitude;
        longitude = loc.coords.longitude;
      } else {
        latitude = DEFAULT_LOCATION.latitude;
        longitude = DEFAULT_LOCATION.longitude;
        setCurrentAddress(DEFAULT_LOCATION.address);
      }

      const finalLocation = { latitude, longitude };
      setCurrentLocation(finalLocation);
      if (!currentAddress) {
        const addr = await getAddressFromCoords(latitude, longitude);
        setCurrentAddress(addr);
      }
      const now = new Date();
      const formattedTime = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")} - ${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}`;
      setTime(formattedTime);

      return finalLocation;
    } catch (error) {
      console.error("Lỗi lấy vị trí hiện tại:", error);
      // Fallback to default location
      setCurrentAddress(DEFAULT_LOCATION.address);
      const defaultLoc = {
        latitude: DEFAULT_LOCATION.latitude,
        longitude: DEFAULT_LOCATION.longitude,
      };
      setCurrentLocation(defaultLoc);
      return defaultLoc;
    }
  };

  const fetchRoute = async (points) => {
    if (points.length < 2) return;

    const coordsStr = points
      .map((p) => `${p.longitude},${p.latitude}`)
      .join(";");

    const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=polyline`;
    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.routes && json.routes.length > 0) {
        const decoded = PolylineDecoder.decode(json.routes[0].geometry);
        const route = decoded.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(route);
      }
    } catch (err) {
      console.warn("OSRM fetch error", err);
    }
  };

  // useEffect chính để khởi tạo component
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const currentLoc = await getCurrentLocation();

        let history = [];
        try {
          const apiHistory = await fetchHistoryFromApi();

          if (Array.isArray(apiHistory) && apiHistory.length > 0) {
            history = apiHistory
              .filter(
                (point) => point.latitude != null && point.longitude != null
              )
              .map((point, index) => ({
                id: `${point.receivedAt}-${index}`,
                latitude: point.latitude,
                longitude: point.longitude,
              }));
          }
        } catch (err) {
          console.error("Lỗi khi fetch history từ API:", err);
        }
        if (history.length === 0) {
          console.warn(
            "Dùng sample history từ LocationHistoryData.jsx vì API không trả về data hợp lệ"
          );
          const sample =
            locationData.find((item) => item.sensorId === 1)?.locations || [];
          history = sample.map((loc) => ({
            id: loc.locationId.toString(),
            latitude: loc.latitude,
            longitude: loc.longitude,
          }));
        }
        setHistoryLocations(history);

        const allPoints = [currentLoc, ...historyLocations];
        await fetchRoute(allPoints);
      } catch (error) {
        console.error("Lỗi khởi tạo bản đồ:", error);
        setError("Không thể tải bản đồ. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    initializeMap();
  }, [historyLocations]);

  // Render loading state
  if (loading || !currentLocation) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang lấy vị trí và lịch sử...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        {/* Bạn có thể thêm nút reload nếu cần */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {/* Marker vị trí hiện tại */}
        <Marker coordinate={currentLocation} title="Vị trí hiện tại">
          <Image
            source={require("../../../assets/image/avatar.png")}
            style={styles.imageAvatar}
            resizeMode="contain"
          />
        </Marker>

        {historyLocations.map((loc, index) => {
          const isFirst = index === 0;
          const isLast = index === historyLocations.length - 1;

          // Điểm bắt đầu & kết thúc
          if (isFirst || isLast) {
            return (
              <Marker
                key={loc.id}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                title={isFirst ? "Điểm bắt đầu" : "Điểm kết thúc"}
              />
            );
          }

          // Các điểm giữa
          return (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
              pinColor="#8E8E93"
            />
          );
        })}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={4}
            strokeColor="#007AFF"
          />
        )}
      </MapView>
      <View style={styles.addressBox}>
        <View style={styles.rowText}>
          <Text style={styles.address}>📍 {currentAddress}</Text>
          <Text style={styles.time}>Lần cập nhật cuối: {time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MapWithHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.HelveticaNeueMedium,
  },
  addressBox: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#f8f5f0",
    padding: 15,
    borderRadius: 15,
  },
  rowText: {
    flexDirection: "column",
  },
  address: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: fonts.HelveticaNeueBold,
  },
  time: {
    fontSize: 12,
    color: "#7e7e7e",
    fontFamily: fonts.HelveticaNeueMedium,
  },
  imageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#007AFF",
    backgroundColor: "#eee",
  },
});
