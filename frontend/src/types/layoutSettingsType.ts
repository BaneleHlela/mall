export interface TextSettings {
  input?: string;
  fontFamily?: string;
  fontSize?: string | {
    mobile: string;
    desktop: string;
  };
  animation?: string;
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
  placement?: {
    isAbsolute?: boolean;
    top?: ResponsiveValue;
    left?: ResponsiveValue;
    right?: ResponsiveValue;
    bottom?: ResponsiveValue;
    marginBottom?: ResponsiveValue;
    marginTop: ResponsiveValue;
  };
  underline?: {
    show: boolean;
    width: string;
    height: string;
    color: string;
    marginTop: string;
    position?:  'start' | 'center' | 'end',
    left?: ResponsiveValue;
  }
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
    scrollAnimationsOnly?: boolean;
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
  position?: 'start' | 'center' | 'end' | {
    horizontalPlacement?: 'start' | 'center' | 'end'
    isAbsolute?: boolean;
    top?: string | ResponsiveValue;
    left?: string | ResponsiveValue;
    right?: string | ResponsiveValue;
    bottom?: string | ResponsiveValue;
  };
  placement?: {
    position?: 'start' | 'center' | 'end'
    isAbsolute?: boolean;
    top?: ResponsiveValue;
    left?: ResponsiveValue;
    right?: ResponsiveValue;
    bottom?: ResponsiveValue;
  };
  backgroundImage?: {
    imageUrl: string[];
    blur?: 'small' | 'medium' | 'large';
    opacity?: string;
  };
  floatingImage?: {
    imageUrl: string[];
    opacity?: string;
    height: string | ResponsiveValue;
    width: string | ResponsiveValue;
    position?: {
      top?: ResponsiveValue;
      left?: ResponsiveValue;
      right?: ResponsiveValue;
      bottom?: ResponsiveValue;
    };
  }
}
