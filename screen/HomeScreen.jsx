import { ScrollView } from "@react-navigation/native"
import HomeTracking from "../component/HomeTracking/HomeTracking"


const HomeScreen = () => {
  return (
    <ScrollView style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
            <HomeTracking/>

    </ScrollView>
  )
}

export default HomeScreen
