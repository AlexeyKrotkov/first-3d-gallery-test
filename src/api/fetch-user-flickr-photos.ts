import { fetchable } from './fetchable';
import { flickrApiKey, flickrRestUrl, flickrUserId } from './constants';

export const fetchUserFlickrPhotos = () =>
    fetchable.get(flickrRestUrl, {
        params: {
            method: 'flickr.photos.search',
            api_key: flickrApiKey,
            user_id: flickrUserId,
            per_page: 50,
            page: 1,
            format: 'json',
            nojsoncallback: 1
        },
    });

export const fetchPhotoSizedByPhotoId = (photoId: string) =>
    fetchable.get(flickrRestUrl, {
        params: {
            method: 'flickr.photos.getSizes',
            api_key: flickrApiKey,
            photo_id: photoId,
            format: 'json',
            nojsoncallback: 1
        },
    });
