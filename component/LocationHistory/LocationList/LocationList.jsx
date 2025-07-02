import { ScrollView, View, Text } from "react-native";
import LocationItem from "./LocationItem";
import styles from "./LocationList.style";

const LocationList = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <ScrollView style={styles.locationList} showsVerticalScrollIndicator={false}>
      {safeData.length > 0 ? (
        safeData.map((item) => <LocationItem key={item.id} item={item} />)
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Không tìm thấy kết quả nào</Text>
          <Text style={styles.noResultsSubtext}>Thử tìm kiếm với từ khóa khác</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LocationList;
