import type category from "@/app/(tabs)/category";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export const icon = {
  index: (props: object) => <Feather name="home" size={40} {...props} />,
  orders: (props: object) => (
    <MaterialCommunityIcons name="google-analytics" size={40} {...props} />
  ),
  category: (props: object) => <Feather name="layers" size={40} {...props} />,
  perfil: (props: object) => <Feather name="user" size={40} {...props} />,
};
