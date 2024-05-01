import { Image, StyleSheet } from "react-native";

interface ImageProps {
  alt?: string;
  imageSrc: any;
  imageStyles?: any;
}

export const ImageComponent: React.FC<ImageProps> = ({
  alt,
  imageSrc,
  imageStyles,
}) => {
  return (
    <Image
      source={imageSrc}
      alt={alt}
      style={[styles.container, imageStyles]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
