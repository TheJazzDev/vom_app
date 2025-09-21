import React from 'react';
import { View, type DimensionValue } from 'react-native';

interface SpacerProps {
  width?: DimensionValue;
  height?: DimensionValue;
}

const Spacer: React.FC<SpacerProps> = ({ width = '100%', height = 40 }) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
