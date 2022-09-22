export interface NativeName {
    official: string;
    common:   string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface PaisSmall {
    name: Name;
    cca3: string;
}