
import { 
  Ionicons, 
  FontAwesome, 
  MaterialIcons, 
  Entypo, 
  AntDesign, 
  MaterialCommunityIcons,
  Feather,
  EvilIcons
 } from "@expo/vector-icons";


const ICON_SETS = {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  EvilIcons
};

const DynamicIcon = ({ type = "Ionicons", name, size = 24, color = "#000" }) => {
  const IconComponent = ICON_SETS[type];

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found.`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} />;
};

export default DynamicIcon;
