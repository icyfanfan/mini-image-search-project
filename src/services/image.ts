
import fetchJsonp from 'fetch-jsonp';

export const searchImageByText = async (text: string, page: number) : Promise<any[]> => {
    let data = [];
    try {
        data = await fetchJsonp(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&safe_search=1&text=${text}&page=${page}&per_page=20`,
            {
                jsonpCallbackFunction: 'jsonFlickrApi'
            }
        )
        data = await data.json();
        const { photos, stat, messages } = data;
        if (stat !== 'ok')
            // error message
            throw messages;
        data = photos?.photo.map(ele => {
            const { farm, server, id, secret } = ele;
            const url = `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`
            return {
                ...ele,
                url,
            }
        });
    } catch (error) {
        // TODO: notify user
    }
    return data;
}