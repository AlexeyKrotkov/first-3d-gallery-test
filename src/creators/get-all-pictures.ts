import {
    fetchPhotoSizedByPhotoId,
    fetchUserFlickrPhotos,
} from '../api/fetch-user-flickr-photos';

export const getAllPictures = (): Promise<any> =>
    new Promise(resolve => {
        fetchUserFlickrPhotos().then((response: any) => {
            const {
                data: {
                    photos: { photo },
                },
            } = response;
            const photoIds = photo.map((ph: any) => ph.id);
            return Promise.all(
                photoIds.map((photoId: string) =>
                    fetchPhotoSizedByPhotoId(photoId),
                ),
            ).then(resp => {
                const allPhotosSizes = resp.map(
                    (res: any) => res.data.sizes.size,
                );
                const neededSizes = allPhotosSizes.map(photoSizes => {
                    const found = photoSizes.find(
                        (phS: any) => phS.label === 'Large',
                    );
                    return found;
                });
                resolve(neededSizes);
            });
        });
    });

