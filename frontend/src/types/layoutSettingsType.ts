export interface TextSettings {
    fontFamily?: string;
    fontSize?: string | {
      mobile: string;
      desktop: string;
    };
    weight?: string;
    fontWeight?: string;
    color?: string;
    textShadow?: boolean;
    lineHeight?: string;
    letterSpacing?: string;
    textDecoration?: string;
    textTransform?: string;
    fontStyle?: string;
    padding?: PaddingValue;
    backgroundColor?: string;
    textAlign?: string;
    textMaxWidth?: ResponsiveValue;
}
  
export interface EditorProps {
    objectPath: string;
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
    allow?: string[];
    responsiveSize?: boolean;
    responsivePadding?: boolean;
    useTextarea?: boolean;
    useQuill?: boolean;
}

export interface ResponsiveValue {
  mobile: string;
  desktop: string;
}

interface PaddingValue {
  x?: string | ResponsiveValue;
  y?: string | ResponsiveValue;
}

export interface BackgroundSettings {
  color?: string;
  shadow?: boolean | string;
  height?: string | ResponsiveValue;
  width?: string| ResponsiveValue;
  margin?: string| ResponsiveValue;
  padding?: PaddingValue;
  opacity?: string;
  border?: {
    width?: string;
    style?: string;
    color?: string;
    radius?: string;
  };
}
