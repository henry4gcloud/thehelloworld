
export enum DisplayMode {
    VIEW = 'VIEW',  EDIT = 'EDIT', DESIGN = 'DESIGN'
}

export function isValidDisplayMode(mode: DisplayMode | string): boolean{
    return (Object.values(DisplayMode) as Array<string>).includes(mode);
};
