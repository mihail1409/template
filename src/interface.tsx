
interface IImage {
    url: string;
    name: string;
  }
  
export interface IContent {
    id: string;
    name: string;
    description?: string;
    images: IImage[];
    artists: IImage[];
  }
  
export  interface ITrack{
    id: string;
    name: string;
    album: IContent;
    description?: string;
    artists: IImage[];
  }
  export  interface IArtist{
    id: string;
    name: string;
    images: IImage[];
    type: string
  }