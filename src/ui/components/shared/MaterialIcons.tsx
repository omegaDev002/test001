import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  size?: number;
  name: string;
  color?: string;
}

export const MaterialIcons = ({name, size = 30, color = 'black'}: Props) => {
  return <Icon name={name} size={size} color={color} />;
};
