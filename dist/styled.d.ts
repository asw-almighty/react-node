import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    width: any;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
