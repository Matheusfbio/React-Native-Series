import { Feather } from "@expo/vector-icons";

export const icon = {
  index: (props: object) => <Feather name="home" size={40} {...props} />,
  orders: (props: object) => (
    <Feather name="plus-circle" size={40} {...props} />
  ),
  checkIn: (props: object) => <Feather name="check" size={40} {...props} />,
  perfil: (props: object) => <Feather name="user" size={40} {...props} />,
};
