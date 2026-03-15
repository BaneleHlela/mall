declare module 'qrcode' {
    export interface ToDataURLOptions {
        errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
        type?: string;
        quality?: number;
        margin?: number;
        scale?: number;
        width?: number;
        color?: {
            dark?: string;
            light?: string;
        };
    }

    export function toDataURL(text: string, options?: ToDataURLOptions): Promise<string>;
    export function toString(text: string, options?: ToDataURLOptions): Promise<string>;
}
