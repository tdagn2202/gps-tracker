//npm install @mapbox/polyline --save
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const handleMarkerPress = ({ latitude, longitude }, address, title) => {
    setSelectedMarker({
      coordinate: { latitude, longitude },
      address,
      title,
    });
  };

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
              .map((point) => ({
                id: `${point.receivedAt}-${point.latitude}-${point.longitude}`,
                latitude: point.latitude,
                longitude: point.longitude,
                receivedAt: point.receivedAt,
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
            receivedAt: loc.timestamp,
          }));
        }

        const historyWithAddress = await Promise.all(
          history.map(async (point) => {
            let addr = "Không xác định";
            try {
              addr = await getAddressFromCoords(
                point.latitude,
                point.longitude
              );
            } catch (e) {
              console.error(
                `Lỗi getAddressFromCoords tại [${point.latitude}, ${point.longitude}]:`,
                e
              );
            }
            return {
              ...point,
              address: addr,
            };
          })
        );

        setHistoryLocations(historyWithAddress);

        const allPoints = [currentLoc, ...historyWithAddress];
        await fetchRoute(allPoints);
      } catch (error) {
        console.error("Lỗi khởi tạo bản đồ:", error);
        setError("Không thể tải bản đồ. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (selectedMarker) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [selectedMarker]);

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
        {/*có thể thêm nút reload nếu cần */}
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
        <Marker
          coordinate={currentLocation}
          title="Vị trí hiện tại"
          onPress={() =>
            handleMarkerPress(
              currentLocation,
              currentAddress,
              "Vị trí hiện tại"
            )
          }
        >
          <Image
            source={require("../../../assets/image/avatar.png")}
            style={styles.imageAvatar}
            resizeMode="contain"
          />
        </Marker>

        {historyLocations.map((loc, index) => {
          const coordinate = {
            latitude: loc.latitude,
            longitude: loc.longitude,
          };
          const address = loc.address;
          const isFirst = index === 0;
          const isLast = index === historyLocations.length - 1;
          const title = isFirst
            ? "Điểm bắt đầu"
            : isLast
            ? "Điểm kết thúc"
            : address;

          // Điểm bắt đầu & kết thúc
          if (isFirst || isLast) {
            return (
              <Marker
                key={loc.id}
                coordinate={coordinate}
                title={title}
                onPress={() => handleMarkerPress(coordinate, address, title)}
              />
            );
          }

          // Các điểm giữa
          return (
            <Marker
              key={loc.id}
              coordinate={coordinate}
              pinColor="#8E8E93"
              onPress={() => handleMarkerPress(coordinate, address, title)}
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
      <Modal
        visible={selectedMarker != null}
        transparent
        animationType="none" // bỏ slide mặc định, ta tự animate
        onRequestClose={() => setSelectedMarker(null)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.infoBox, { transform: [{ translateY: slideAnim }] }]}
          >
            <Text style={styles.infoTitle}>{selectedMarker?.title}</Text>
            <Text style={styles.infoText}>
              Địa chỉ: {selectedMarker?.address}
            </Text>
            <Text style={styles.infoText}>
              Tọa độ: {selectedMarker?.coordinate.latitude.toFixed(6)},{" "}
              {selectedMarker?.coordinate.longitude.toFixed(6)}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedMarker(null)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
  // Overlay mờ nền
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  // Hộp thông tin
  infoBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  // Hộp thông tin (container)
  infoBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // Đảm bảo full width
    width: "100%",
  },
  // Tiêu đề
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  // Text địa chỉ, tọa độ
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  // Nút đóng container
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  // Text nút đóng
  closeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
