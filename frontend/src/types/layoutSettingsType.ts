export interface TextSettings {
    fontFamily?: string;
    fontSize?: string;
    weight?: string;
    color?: string;
    textShadow?: string
    lineHeight?: string;
    letterSpacing?: string;
    textDecoration?: string;
    textTransform?: string;
    fontStyle?: string;
}

export interface EditorProps {
    objectPath: string;
    settings: any; 
    handleSettingChange: (field: string, value: any) => void;
    allow?: string[];
}
