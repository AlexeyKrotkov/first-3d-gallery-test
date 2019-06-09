declare module '*.module.scss' {
    interface ClassNames {
        [className: string]: string;
    }
    const classNames: ClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module 'react-three-renderer';
