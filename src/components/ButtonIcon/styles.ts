import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export type ButtonIconStyleProps = "PRIMARY" | "SECONDARY";

interface ButtonIconProps {
  type: ButtonIconStyleProps;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconProps>(
  ({ theme, type }) => {
    return {
      size: 24,
      color: type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
    };
  }
)``;

export const Form = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    flex-direction: row;
    justify-content: center;
    
    border-radius: 6px;
`
