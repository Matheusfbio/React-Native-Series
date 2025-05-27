import { Feather } from "@expo/vector-icons";

export const icon = {
  "(top-tabs)": (props: object) => <Feather name="home" size={40} {...props} />,
  orders: (props: object) => (
    <Feather name="plus-circle" size={40} {...props} />
  ),
  checkIn: (props: object) => <Feather name="check" size={40} {...props} />,
};
